import { useRef, useEffect } from "react";

const FACE_RGB: Record<string, [number, number, number]> = {
  front:  [255, 69,  0  ],
  back:   [245, 197, 24 ],
  right:  [46,  125, 50 ],
  left:   [21,  101, 192],
  top:    [240, 236, 224],
  bottom: [198, 40,  40 ],
};

type Vec3 = [number, number, number];

interface Tile {
  corners: Vec3[];
  normal:  Vec3;
  rgb:     [number, number, number];
}

function rotVec(x: number, y: number, z: number, ry: number, rx: number): Vec3 {
  const x1 =  x * Math.cos(ry) + z * Math.sin(ry);
  const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
  const y2 =  y * Math.cos(rx) - z1 * Math.sin(rx);
  const z2 =  y * Math.sin(rx) + z1 * Math.cos(rx);
  return [x1, y2, z2];
}

function project(x: number, y: number, z: number, size: number): [number, number] {
  const d = 3.4;
  const s = size * 0.72;
  const f = s / (d - z);
  return [size / 2 + x * f, size / 2 - y * f];
}

function buildTiles(): Tile[] {
  const T = 0.28, h = T / 2, C = 0.335;
  const offs = [-C, 0, C];
  const tiles: Tile[] = [];

  function addFace(key: string, normal: Vec3, cornersOf: (u: number, v: number) => Vec3[]) {
    const rgb = FACE_RGB[key];
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++)
        tiles.push({ corners: cornersOf(offs[c], offs[r]), normal, rgb });
  }

  addFace("front",  [0, 0, 1],  (u, v) => [
    [u-h, -v-h,  0.5], [u+h, -v-h,  0.5], [u+h, -v+h,  0.5], [u-h, -v+h,  0.5],
  ]);
  addFace("back",   [0, 0, -1], (u, v) => [
    [-u-h, -v-h, -0.5], [-u+h, -v-h, -0.5], [-u+h, -v+h, -0.5], [-u-h, -v+h, -0.5],
  ]);
  addFace("right",  [1, 0, 0],  (u, v) => [
    [0.5, -v-h, -u-h], [0.5, -v-h, -u+h], [0.5, -v+h, -u+h], [0.5, -v+h, -u-h],
  ]);
  addFace("left",   [-1, 0, 0], (u, v) => [
    [-0.5, -v-h, u-h], [-0.5, -v-h, u+h], [-0.5, -v+h, u+h], [-0.5, -v+h, u-h],
  ]);
  addFace("top",    [0, 1, 0],  (u, v) => [
    [u-h, 0.5, v-h], [u+h, 0.5, v-h], [u+h, 0.5, v+h], [u-h, 0.5, v+h],
  ]);
  addFace("bottom", [0, -1, 0], (u, v) => [
    [u-h, -0.5, -v-h], [u+h, -0.5, -v-h], [u+h, -0.5, -v+h], [u-h, -0.5, -v+h],
  ]);

  return tiles;
}

const TILES = buildTiles();
const SIZE  = 1140;
const LX = 0.408, LY = 0.816, LZ = 0.408;

export function RubiksCube3D() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const drawingCtx = ctx;

    const DPR = Math.min(window.devicePixelRatio ?? 1, 2);
    canvas.width  = SIZE * DPR;
    canvas.height = SIZE * DPR;
    drawingCtx.scale(DPR, DPR);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let autoRotY    = 0.5;
    let autoRotX    = 0.38;
    let targetRotY  = autoRotY;
    let targetRotX  = autoRotX;
    let currentRotY = autoRotY;
    let currentRotX = autoRotX;
    let isHovered   = false;
    let hoverBaseY  = autoRotY;
    let hoverBaseX  = autoRotX;
    let lastT       = 0;
    let rafId       = 0;

    const MAX_Y = Math.PI * 0.75;
    const MAX_X = Math.PI * 0.40;

    // ── Event handlers on the OVERLAY (transparent, covers full area, on top) ──
    function onMouseEnter() {
      isHovered  = true;
      hoverBaseY = currentRotY;
      hoverBaseX = currentRotX;
    }

    function onMouseMove(e: MouseEvent) {
      if (!isHovered) return;
      const rect = overlay!.getBoundingClientRect();
      // Normalise to -0.5 … +0.5 across the full overlay rect
      const nx = (e.clientX - rect.left)  / rect.width  - 0.5;
      const ny = (e.clientY - rect.top)   / rect.height - 0.5;
      targetRotY = hoverBaseY + nx * MAX_Y * 2;
      targetRotX = hoverBaseX + ny * MAX_X * 2;
    }

    function onMouseLeave() {
      isHovered = false;
      // Resume auto-spin from current angle (no jump)
      autoRotY  = currentRotY;
    }

    // Attach to OVERLAY — guaranteed no child intercepts these events
    overlay!.addEventListener("mouseenter", onMouseEnter);
    overlay!.addEventListener("mousemove",  onMouseMove);
    overlay!.addEventListener("mouseleave", onMouseLeave);

    function frame(time: number) {
      const dt = Math.min((time - lastT) / 1000, 0.05);
      lastT = time;

      if (!reduced) {
        if (!isHovered) {
          autoRotY += dt * 0.62;
          autoRotX  = 0.36 + Math.sin(time * 0.00042) * 0.1;
          targetRotY = autoRotY;
          targetRotX = autoRotX;
        }
        const speed = isHovered ? 10 : 6;
        currentRotY += (targetRotY - currentRotY) * Math.min(1, dt * speed);
        currentRotX += (targetRotX - currentRotX) * Math.min(1, dt * speed);
      }

      drawingCtx.clearRect(0, 0, SIZE, SIZE);

      const rendered: {
        proj: [number, number][];
        avgZ: number;
        rgb:  [number, number, number];
        diff: number;
        spec: number;
      }[] = [];

      for (const { corners, normal, rgb } of TILES) {
        const [fnx, fny, fnz] = rotVec(normal[0], normal[1], normal[2], currentRotY, currentRotX);
        if (fnz <= 0) continue;

        const diff = Math.max(0.22, fnx * LX + fny * LY + fnz * LZ);
        const spec = Math.max(0, fnz - 0.72) * 0.58;

        const rCorners = corners.map(([x, y, z]) => rotVec(x, y, z, currentRotY, currentRotX));
        const avgZ = (rCorners[0][2] + rCorners[1][2] + rCorners[2][2] + rCorners[3][2]) * 0.25;
        const proj = rCorners.map(([x, y, z]) => project(x, y, z, SIZE)) as [number, number][];

        rendered.push({ proj, avgZ, rgb, diff, spec });
      }

      rendered.sort((a, b) => a.avgZ - b.avgZ);

      for (const { proj, rgb, diff, spec } of rendered) {
        const r = Math.min(255, Math.round(rgb[0] * diff));
        const g = Math.min(255, Math.round(rgb[1] * diff));
        const b = Math.min(255, Math.round(rgb[2] * diff));

        drawingCtx.beginPath();
        drawingCtx.moveTo(proj[0][0], proj[0][1]);
        drawingCtx.lineTo(proj[1][0], proj[1][1]);
        drawingCtx.lineTo(proj[2][0], proj[2][1]);
        drawingCtx.lineTo(proj[3][0], proj[3][1]);
        drawingCtx.closePath();

        drawingCtx.fillStyle = `rgb(${r},${g},${b})`;
        drawingCtx.fill();

        if (spec > 0.015) {
          drawingCtx.fillStyle = `rgba(255,255,255,${spec.toFixed(2)})`;
          drawingCtx.fill();
        }

        drawingCtx.strokeStyle = "rgba(0,0,0,0.85)";
        drawingCtx.lineWidth   = 1.6;
        drawingCtx.lineJoin    = "round";
        drawingCtx.stroke();
      }

      if (!reduced) rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame((t) => { lastT = t; rafId = requestAnimationFrame(frame); });

    return () => {
      cancelAnimationFrame(rafId);
      overlay!.removeEventListener("mouseenter", onMouseEnter);
      overlay!.removeEventListener("mousemove",  onMouseMove);
      overlay!.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Ambient glow — purely visual, no pointer events */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          background:
            "radial-gradient(circle, rgba(255,69,0,0.06) 0%, rgba(255,69,0,0.02) 52%, transparent 72%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* Canvas — pointer-events OFF so it never intercepts the overlay */}
      <canvas
        ref={canvasRef}
        style={{
          width: SIZE,
          height: SIZE,
          display: "block",
          pointerEvents: "none",   // ← key: canvas never steals events
          willChange: "contents",
        }}
      />

      {/*
        Transparent overlay — sits above everything, covers the FULL inset:0 area.
        All mouse events land here reliably; nothing underneath can intercept them.
      */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          cursor: "default",
          zIndex: 10,
          background: "transparent",
        }}
      />
    </div>
  );
}