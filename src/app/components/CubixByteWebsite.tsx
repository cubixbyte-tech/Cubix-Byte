import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { RubiksCube3D } from "./RubiksCube3D";
import { Magnet } from "./Magnet";
import { ScrollVelocity } from "./ScrollVelocity";
import {
  Menu, X, ArrowRight, ArrowUpRight, ChevronRight,
  Code2, Smartphone, Cloud, Palette, Layers, Lightbulb,
  Github, Twitter, Linkedin, Instagram,
  Star, Check, ExternalLink, Mail, MapPin, Phone,
} from "lucide-react";

const ACCENT = "#FF4500";

// ── Design tokens ──────────────────────────────────────────────────────────────
const T = {
  bg: "#080806",
  surface: "rgba(255,255,255,0.025)",
  surfaceHover: "rgba(255,255,255,0.045)",
  border: "rgba(255,255,255,0.07)",
  borderLight: "rgba(255,255,255,0.04)",
  textPrimary: "#EEEAE0",
  textSecondary: "#C4C0B4",
  textMuted: "#7A7A72",
  textSubtle: "#5E5E58",
  mono: "'Space Mono', monospace",
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', system-ui, sans-serif",
};

// ── Scroll reveal wrapper ─────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  y = 24,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ── Label chip ────────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "5px 13px",
        borderRadius: 100,
        background: "rgba(255,69,0,0.08)",
        border: `1px solid rgba(255,69,0,0.2)`,
        fontFamily: T.mono,
        fontSize: 8.5,
        letterSpacing: "0.2em",
        color: "#FF6B3A",
        textTransform: "uppercase" as const,
      }}
    >
      <span
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: ACCENT,
          display: "inline-block",
          boxShadow: `0 0 5px ${ACCENT}`,
        }}
      />
      {children}
    </span>
  );
}

// ── Breakpoint ────────────────────────────────────────────────────────────────
export function useBreakpoint() {
  const getW = () => (typeof window !== "undefined" ? window.innerWidth : 1280);
  const [w, setW] = useState(getW);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, w };
}

// ─────────────────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Services", "Work", "Process", "About", "Contact"];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();
  const compact = isMobile || isTablet;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
          background: scrolled ? "rgba(8,8,6,0.92)" : "rgba(8,8,6,0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: 1600,
            margin: "0 auto",
            padding: compact ? "0 12px" : "0 24px",
            height: compact ? 60 : 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                background: ACCENT,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 12px rgba(255,69,0,0.4)",
                flexShrink: 0,
              }}
            >
              <div style={{ width: 11, height: 11, background: T.bg, borderRadius: 2.5 }} />
            </div>
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 11,
                letterSpacing: "0.24em",
                color: T.textPrimary,
                textTransform: "uppercase",
              }}
            >
              CubixByte
            </span>
          </button>

          {/* Desktop Nav */}
          {!compact && (
            <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
              {NAV_LINKS.map((link) => (
                <Magnet key={link} padding={60} magnetStrength={3}>
                  <button
                    onClick={() => scrollTo(link)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: T.mono,
                      fontSize: 9,
                      letterSpacing: "0.18em",
                      color: T.textMuted,
                      textTransform: "uppercase",
                      transition: "color 0.2s",
                      padding: "8px 12px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = T.textPrimary)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = T.textMuted)}
                  >
                    {link}
                  </button>
                </Magnet>
              ))}
            </nav>
          )}

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {!compact && (
              <Magnet padding={80} magnetStrength={2.5}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("Contact")}
                  style={{
                    height: 38,
                    padding: "0 20px",
                    background: ACCENT,
                    border: "none",
                    borderRadius: 7,
                    fontFamily: T.mono,
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    color: "#fff",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    boxShadow: "0 2px 16px rgba(255,69,0,0.35)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  Start a Project
                  <ArrowRight size={11} />
                </motion.button>
              </Magnet>
            )}
            {compact && (
              <button
                onClick={() => setMenuOpen((v) => !v)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 7,
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: T.textSecondary,
                }}
              >
                {menuOpen ? <X size={15} /> : <Menu size={15} />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            style={{
              position: "fixed",
              top: 60,
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(10,10,8,0.98)",
              borderBottom: `1px solid ${T.border}`,
              backdropFilter: "blur(20px)",
              padding: "20px 24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: T.mono,
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: T.textMuted,
                  textTransform: "uppercase",
                  padding: "12px 0",
                  textAlign: "left",
                  borderBottom: `1px solid ${T.borderLight}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "color 0.2s",
                }}
              >
                {link}
                <ChevronRight size={12} />
              </button>
            ))}
            <button
              onClick={() => scrollTo("Contact")}
              style={{
                marginTop: 16,
                height: 44,
                background: ACCENT,
                border: "none",
                borderRadius: 8,
                fontFamily: T.mono,
                fontSize: 9,
                letterSpacing: "0.2em",
                color: "#fff",
                cursor: "pointer",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              Start a Project <ArrowRight size={11} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
const TECH_PILLS = ["React", "Node.js", "TypeScript", "AWS", "Flutter", "PostgreSQL", "Docker", "Next.js"];

function Hero() {
  const { isMobile, isTablet } = useBreakpoint();
  const compact = isMobile || isTablet;

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: compact ? "100px 8px 32px" : "140px 16px 32px",
      }}
    >
      {/* Subtle grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />
      <div style={{ maxWidth: 1600, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        {/* ── Animated hero atmosphere ── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "45%",
            width: 1140,
            height: 1140,
            transform: "translateY(-50%)",
          }}
        >
          {/* 3D Rubik's Cube  canvas-rendered, GPU-friendly */}
          <RubiksCube3D />

          {/* Secondary offset orb  drifts */}
          <motion.div
            animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "20%",
              left: "15%",
              width: 340,
              height: 340,
              background: "radial-gradient(circle, rgba(255,100,0,0.07) 0%, transparent 65%)",
              borderRadius: "50%",
            }}
          />

          {/* Outer slow-spinning ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: "8%",
              borderRadius: "50%",
              border: "1px solid rgba(255,69,0,0.09)",
              borderTopColor: "rgba(255,69,0,0.35)",
              borderRightColor: "rgba(255,69,0,0.15)",
            }}
          />

          {/* Inner counter-spinning ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: "22%",
              borderRadius: "50%",
              border: "1px solid rgba(255,69,0,0.06)",
              borderBottomColor: "rgba(255,69,0,0.28)",
              borderLeftColor: "rgba(255,69,0,0.12)",
            }}
          />

          {/* Innermost fast ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              inset: "38%",
              borderRadius: "50%",
              border: "1px solid rgba(255,69,0,0.05)",
              borderTopColor: "rgba(255,120,0,0.4)",
            }}
          />

          {/* Orbiting dot 1 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", inset: "22%", borderRadius: "50%" }}
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "0%",
                left: "50%",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: ACCENT,
                transform: "translate(-50%, -50%)",
                boxShadow: `0 0 12px 3px rgba(255,69,0,0.5)`,
              }}
            />
          </motion.div>

          {/* Orbiting dot 2 */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute", inset: "8%", borderRadius: "50%" }}
          >
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{
                position: "absolute",
                bottom: "5%",
                right: "18%",
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "rgba(255,120,50,0.9)",
                boxShadow: `0 0 10px 2px rgba(255,69,0,0.4)`,
              }}
            />
          </motion.div>

          {/* Floating particles */}
          {[
            { top: "18%", left: "72%", size: 2.5, dur: 4, delay: 0 },
            { top: "65%", left: "80%", size: 2, dur: 5.5, delay: 1 },
            { top: "78%", left: "30%", size: 3, dur: 4.5, delay: 0.5 },
            { top: "12%", left: "38%", size: 2, dur: 6, delay: 2 },
            { top: "50%", left: "90%", size: 2.5, dur: 3.8, delay: 1.5 },
            { top: "88%", left: "55%", size: 2, dur: 5, delay: 0.8 },
          ].map((p, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -14, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
              style={{
                position: "absolute",
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: `rgba(255,${80 + i * 12},0,0.7)`,
                boxShadow: `0 0 6px 1px rgba(255,69,0,0.35)`,
              }}
            />
          ))}

          {/* Comet sweep */}
          <motion.div
            animate={{ x: [-60, 180], y: [40, -80], opacity: [0, 0.6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 6, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "30%",
              left: "10%",
              width: 90,
              height: 1.5,
              background: "linear-gradient(90deg, transparent, rgba(255,69,0,0.7), rgba(255,120,50,0.9))",
              borderRadius: 2,
              transform: "rotate(-28deg)",
              transformOrigin: "left center",
              filter: "blur(0.5px)",
            }}
          />

          {/* Dot cluster */}
          {[
            { top: "4%", left: "58%" },
            { top: "8%", left: "63%" },
            { top: "4%", left: "68%" },
          ].map((pos, i) => (
            <motion.div
              key={`dot-${i}`}
              animate={{ opacity: [0.2, 0.65, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: pos.top,
                left: pos.left,
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "rgba(255,69,0,0.6)",
              }}
            />
          ))}
        </div>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: 32 }}
        >
          <Label>Available for new projects  Q3 2025</Label>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: T.serif,
            fontSize: compact ? (isMobile ? 48 : 64) : 90,
            fontWeight: 300,
            color: T.textPrimary,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            margin: "0 0 24px",
            maxWidth: 820,
          }}
        >
          We engineer
          <br />
          <em style={{ fontStyle: "italic", color: T.textSecondary }}>digital products</em>
          <br />
          that{" "}
          <span
            style={{
              position: "relative",
              display: "inline-block",
              color: T.textPrimary,
            }}
          >
            scale.
            <span
              style={{
                position: "absolute",
                bottom: 4,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
                borderRadius: 2,
              }}
            />
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35 }}
          style={{
            fontFamily: T.sans,
            fontSize: compact ? 15 : 17,
            color: T.textMuted,
            lineHeight: 1.7,
            maxWidth: 520,
            margin: "0 0 44px",
            fontWeight: 300,
          }}
        >
          CubixByte is a full-stack software agency. We partner with startups
          and enterprises to design, build, and launch exceptional digital
          experiences  from MVP to production at scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.48 }}
          style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}
        >
          <Magnet padding={100} magnetStrength={2}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                height: 50,
                padding: "0 28px",
                background: ACCENT,
                border: "none",
                borderRadius: 9,
                fontFamily: T.mono,
                fontSize: 9.5,
                letterSpacing: "0.2em",
                color: "#fff",
                cursor: "pointer",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 4px 24px rgba(255,69,0,0.4)",
              }}
            >
              View Our Work <ArrowRight size={13} />
            </motion.button>
          </Magnet>
          <Magnet padding={100} magnetStrength={2}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                height: 50,
                padding: "0 28px",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${T.border}`,
                borderRadius: 9,
                fontFamily: T.mono,
                fontSize: 9.5,
                letterSpacing: "0.2em",
                color: T.textSecondary,
                cursor: "pointer",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              Start a Project
            </motion.button>
          </Magnet>
        </motion.div>

        {/* Tech Stack ScrollVelocity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          style={{
            marginTop: 64,
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 8,
              letterSpacing: "0.18em",
              color: T.textSubtle,
              textTransform: "uppercase",
              display: "block",
              marginBottom: 16,
            }}
          >
            Tech Stack
          </span>
          <ScrollVelocity
            texts={[
              <span style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {TECH_PILLS.map((pill) => (
                  <span
                    key={pill}
                    style={{
                      padding: "6px 16px",
                      borderRadius: 100,
                      background: T.surface,
                      border: `1px solid ${T.border}`,
                      fontFamily: T.mono,
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      color: T.textMuted,
                      textTransform: "uppercase",
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </span>,
            ]}
            velocity={80}
            numCopies={4}
            scrollerStyle={{
              gap: 24,
            }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontFamily: T.mono, fontSize: 7, letterSpacing: "0.2em", color: T.textSubtle, textTransform: "uppercase" }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, ${T.textSubtle}, transparent)` }} />
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: Code2,
    num: "01",
    title: "Web Development",
    desc: "Scalable, performant web applications built with React, Next.js, and Node.js. From SaaS dashboards to consumer apps.",
    detail: "We build for the long term  clean architecture, comprehensive testing, and documentation your team will actually use.",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
  },
  {
    icon: Smartphone,
    num: "02",
    title: "Mobile Apps",
    desc: "Cross-platform mobile experiences with Flutter and React Native. Native performance, one codebase.",
    detail: "Shipped to 50K+ users across iOS and Android. Offline-first, push-ready, and optimised for the App Store.",
    tags: ["Flutter", "React Native", "iOS", "Android"],
  },
  {
    icon: Cloud,
    num: "03",
    title: "Cloud & DevOps",
    desc: "Infrastructure that scales. CI/CD pipelines, containerization, and cloud architecture on AWS, GCP, or Azure.",
    detail: "Zero-downtime deployments, automated rollbacks, and monitoring that alerts before your users notice.",
    tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
  {
    icon: Palette,
    num: "04",
    title: "UI/UX Design",
    desc: "Design systems and interfaces that feel inevitable. Figma prototypes, design tokens, and pixel-perfect implementation.",
    detail: "We ship design and code together  no handoff friction, no lost fidelity.",
    tags: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    icon: Layers,
    num: "05",
    title: "API & Backend",
    desc: "Robust REST and GraphQL APIs, microservices, real-time systems, and database architecture built for reliability.",
    detail: "Sub-100ms response times at scale. Designed for growth from day one.",
    tags: ["GraphQL", "PostgreSQL", "Redis", "gRPC"],
  },
  {
    icon: Lightbulb,
    num: "06",
    title: "Product Strategy",
    desc: "From idea to roadmap. We help you define what to build, for whom, and in what order  before writing a single line of code.",
    detail: "Our discovery sprints have saved clients an average of 3 months of wasted development time.",
    tags: ["Discovery", "Roadmapping", "OKRs", "Research"],
  },
];

function Services() {
  const { isMobile } = useBreakpoint();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="services" style={{ padding: isMobile ? "80px 16px" : "120px 24px" }}>
      <div style={{ maxWidth: 1600, margin: "0 auto" }}>
        {/* Header */}
        <Reveal>
          <div
            style={{
              display: "flex",
              alignItems: isMobile ? "flex-start" : "flex-end",
              justifyContent: "space-between",
              flexDirection: isMobile ? "column" : "row",
              gap: 32,
              marginBottom: 72,
            }}
          >
            <div>
              <Label>What We Do</Label>
              <h2
                style={{
                  fontFamily: T.serif,
                  fontSize: isMobile ? 40 : 60,
                  fontWeight: 300,
                  color: T.textPrimary,
                  lineHeight: 1.06,
                  letterSpacing: "-0.015em",
                  margin: "20px 0 0",
                }}
              >
                Full-spectrum
                <br />
                <em style={{ fontStyle: "italic", color: T.textSecondary }}>product engineering.</em>
              </h2>
            </div>
            <p
              style={{
                fontFamily: T.sans,
                fontSize: 15,
                color: T.textMuted,
                maxWidth: 340,
                lineHeight: 1.75,
                margin: 0,
                fontWeight: 300,
                flexShrink: 0,
              }}
            >
              Strategy, design, development, and deployment  end to end, under one roof. We stay until it ships.
            </p>
          </div>
        </Reveal>

        {/* Services accordion list */}
        <div style={{ borderTop: `1px solid ${T.border}` }}>
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.num} delay={i * 0.05}>
              <ServiceRow
                svc={svc}
                index={i}
                isActive={activeIndex === i}
                onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
                isMobile={isMobile}
              />
            </Reveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.3}>
          <div style={{ marginTop: 56, display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ flex: 1, height: 1, background: T.borderLight }} />
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "none",
                border: `1px solid ${T.border}`,
                borderRadius: 100,
                padding: "10px 22px",
                fontFamily: T.mono,
                fontSize: 8.5,
                letterSpacing: "0.18em",
                color: T.textMuted,
                cursor: "pointer",
                textTransform: "uppercase",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = ACCENT;
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,69,0,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = T.textMuted;
                (e.currentTarget as HTMLButtonElement).style.borderColor = T.border;
              }}
            >
              Discuss your project <ArrowRight size={11} />
            </button>
            <div style={{ flex: 1, height: 1, background: T.borderLight }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceRow({
  svc,
  index: _index,
  isActive,
  onToggle,
  isMobile,
}: {
  svc: typeof SERVICES[0];
  index: number;
  isActive: boolean;
  onToggle: () => void;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = svc.icon;
  const highlighted = hovered || isActive;

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onToggle}
      style={{
        borderBottom: `1px solid ${T.border}`,
        cursor: "pointer",
        transition: "background 0.22s",
        background: isActive ? "rgba(255,69,0,0.025)" : "transparent",
      }}
    >
      {/* Main row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr auto" : "80px 1fr auto",
          alignItems: "center",
          gap: isMobile ? 12 : 0,
          padding: isMobile ? "24px 0" : "30px 0",
        }}
      >
        {/* Number — hidden on mobile, shown on desktop */}
        {!isMobile && (
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              letterSpacing: "0.22em",
              color: highlighted ? ACCENT : T.textSubtle,
              transition: "color 0.22s",
            }}
          >
            {svc.num}
          </span>
        )}

        {/* Icon + Title + Tags */}
        <div
          style={{
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? 12 : 32,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 230 }}>
            <motion.div
              animate={{
                background: highlighted ? "rgba(255,69,0,0.12)" : "rgba(255,255,255,0.04)",
                borderColor: highlighted ? "rgba(255,69,0,0.28)" : "rgba(255,255,255,0.06)",
              }}
              transition={{ duration: 0.22 }}
              style={{
                width: 38,
                height: 38,
                borderRadius: 9,
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={15} color={highlighted ? ACCENT : T.textMuted} />
            </motion.div>
            <h3
              style={{
                fontFamily: T.serif,
                fontSize: isMobile ? 24 : 28,
                fontWeight: 400,
                color: highlighted ? T.textPrimary : T.textSecondary,
                margin: 0,
                letterSpacing: "-0.01em",
                transition: "color 0.22s",
              }}
            >
              {svc.title}
            </h3>
          </div>

          {/* Tags inline — desktop only */}
          {!isMobile && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {svc.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "3px 10px",
                    borderRadius: 100,
                    background: highlighted ? "rgba(255,69,0,0.05)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${highlighted ? "rgba(255,69,0,0.14)" : "rgba(255,255,255,0.06)"}`,
                    fontFamily: T.mono,
                    fontSize: 7,
                    letterSpacing: "0.1em",
                    color: highlighted ? "#FF6B3A" : T.textSubtle,
                    transition: "all 0.22s",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isActive ? 90 : 0, opacity: highlighted ? 1 : 0.35 }}
          transition={{ duration: 0.22 }}
          style={{ color: T.textMuted, display: "flex", alignItems: "center" }}
        >
          <ChevronRight size={16} />
        </motion.div>
      </div>

      {/* Expanded detail panel */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                paddingBottom: 36,
                paddingLeft: isMobile ? 0 : 40,
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 32,
              }}
            >
              <p
                style={{
                  fontFamily: T.sans,
                  fontSize: 14,
                  color: T.textMuted,
                  lineHeight: 1.8,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                {svc.desc}
              </p>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div
                  style={{
                    width: 2,
                    flexShrink: 0,
                    alignSelf: "stretch",
                    background: `linear-gradient(to bottom, ${ACCENT}, transparent)`,
                    borderRadius: 2,
                    minHeight: 52,
                  }}
                />
                <p
                  style={{
                    fontFamily: T.sans,
                    fontSize: 13.5,
                    color: T.textSubtle,
                    lineHeight: 1.75,
                    margin: 0,
                    fontWeight: 300,
                    fontStyle: "italic",
                  }}
                >
                  {svc.detail}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS
// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "120+", label: "Projects Delivered" },
  { value: "48", label: "Happy Clients" },
  { value: "4 Yrs", label: "In Operation" },
  { value: "12", label: "Team Members" },
];

function Stats() {
  const { isMobile } = useBreakpoint();
  return (
    <section style={{ padding: isMobile ? "60px 16px" : "80px 24px" }}>
      <div
        style={{
          maxWidth: 1600,
          margin: "0 auto",
          padding: isMobile ? "40px 16px" : "52px 32px",
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 18,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: isMobile ? 36 : 0,
        }}
      >
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div
              style={{
                textAlign: "center",
                borderRight: !isMobile && i < 3 ? `1px solid ${T.borderLight}` : "none",
                padding: isMobile ? 0 : "0 16px",
              }}
            >
              <div
                style={{
                  fontFamily: T.serif,
                  fontSize: isMobile ? 44 : 56,
                  fontWeight: 300,
                  color: T.textPrimary,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: T.mono,
                  fontSize: 8.5,
                  letterSpacing: "0.18em",
                  color: T.textSubtle,
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WORK / PORTFOLIO
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "NovaPay",
    category: "Fintech · Web App",
    desc: "A real-time payment infrastructure dashboard for a Series-B fintech startup. 300% faster transaction visibility.",
    image: "https://images.unsplash.com/photo-1720135885007-454165745e21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwZGFzaGJvYXJkJTIwZGFyayUyMFVJJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3NzE0Njg1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React", "Node.js", "PostgreSQL"],
    year: "2024",
    metric: "300%",
    metricLabel: "Faster visibility",
    featured: true,
  },
  {
    title: "Orbita",
    category: "SaaS · Dashboard",
    desc: "End-to-end analytics platform for logistics companies tracking 2M+ shipments in real time across 40 countries.",
    image: "https://images.unsplash.com/photo-1770012977129-19f856a1f935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhcmslMjBzY3JlZW58ZW58MXx8fHwxNzc3MTQ2ODUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Next.js", "GraphQL", "Redis"],
    year: "2024",
    metric: "2M+",
    metricLabel: "Shipments tracked",
    featured: false,
  },
  {
    title: "FlowMobile",
    category: "Mobile · Cross-Platform",
    desc: "Consumer mobile app with 50K+ downloads in 3 months. Offline-first architecture for field service teams.",
    image: "https://images.unsplash.com/photo-1622212993957-6d4631a0ba8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBwcm9kdWN0JTIwZGFyayUyMG1pbmltYWx8ZW58MXx8fHwxNzc3MTQ2ODUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Flutter", "Firebase", "AWS"],
    year: "2023",
    metric: "50K+",
    metricLabel: "Downloads / 3 mo.",
    featured: false,
  },
  {
    title: "Lexis UI",
    category: "Design System · SaaS",
    desc: "A 400-component enterprise design system used across 12 internal products at a Fortune 500 legal tech firm.",
    image: "https://images.unsplash.com/photo-1669023414162-8b0573b9c6b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRlc2lnbiUyMHN5c3RlbSUyMHdlYiUyMGNvbXBvbmVudHMlMjBkYXJrfGVufDF8fHx8MTc3NzE0Njg1NHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Figma", "React", "Storybook"],
    year: "2023",
    metric: "400",
    metricLabel: "Components shipped",
    featured: false,
  },
];

function Work() {
  const { isMobile, isTablet } = useBreakpoint();
  const isDesktop = !isMobile && !isTablet;

  return (
    <section id="work" style={{ padding: isMobile ? "80px 16px" : "120px 24px" }}>
      <div style={{ maxWidth: 1600, margin: "0 auto" }}>
        {/* Header */}
        <Reveal>
          <div
            style={{
              display: "flex",
              alignItems: isMobile ? "flex-start" : "flex-end",
              justifyContent: "space-between",
              flexDirection: isMobile ? "column" : "row",
              gap: 24,
              marginBottom: 64,
            }}
          >
            <div>
              <Label>Selected Work</Label>
              <h2
                style={{
                  fontFamily: T.serif,
                  fontSize: isMobile ? 40 : 60,
                  fontWeight: 300,
                  color: T.textPrimary,
                  lineHeight: 1.06,
                  letterSpacing: "-0.015em",
                  margin: "20px 0 0",
                }}
              >
                Work that
                <br />
                <em style={{ fontStyle: "italic", color: T.textSecondary }}>speaks for itself.</em>
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "flex-start" : "flex-end", gap: 20 }}>
              <p
                style={{
                  fontFamily: T.sans,
                  fontSize: 14,
                  color: T.textMuted,
                  maxWidth: 300,
                  lineHeight: 1.75,
                  margin: 0,
                  fontWeight: 300,
                  textAlign: isMobile ? "left" : "right",
                }}
              >
                Client projects that shipped on time, under budget, and exceeded expectations.
              </p>
              <div style={{ display: "flex", gap: 24 }}>
                {[{ n: "120+", l: "Projects" }, { n: "48", l: "Clients" }, { n: "100%", l: "On-time" }].map((s) => (
                  <div key={s.l} style={{ textAlign: isMobile ? "left" : "right" }}>
                    <div style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 300, color: T.textPrimary, lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.15em", color: T.textSubtle, textTransform: "uppercase", marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bento grid */}
        {isDesktop ? (
          <div style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gridTemplateRows: "auto auto", gap: 14 }}>
            {/* Featured large card */}
            <Reveal delay={0}>
              <ProjectCard project={PROJECTS[0]} variant="featured" />
            </Reveal>
            {/* Right column stacked */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Reveal delay={0.08}>
                <ProjectCard project={PROJECTS[1]} variant="tall" />
              </Reveal>
              <Reveal delay={0.14}>
                <ProjectCard project={PROJECTS[2]} variant="compact" />
              </Reveal>
            </div>
            {/* Bottom full-width card */}
            <Reveal delay={0.18} style={{ gridColumn: "1 / -1" }}>
              <ProjectCard project={PROJECTS[3]} variant="wide" />
            </Reveal>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <ProjectCard project={p} variant="featured" />
              </Reveal>
            ))}
          </div>
        )}

        {/* View all CTA */}
        <Reveal delay={0.25}>
          <div style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                padding: "14px 28px",
                fontFamily: T.mono,
                fontSize: 8.5,
                letterSpacing: "0.18em",
                color: T.textMuted,
                cursor: "pointer",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,69,0,0.3)";
                (e.currentTarget as HTMLButtonElement).style.color = ACCENT;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = T.border;
                (e.currentTarget as HTMLButtonElement).style.color = T.textMuted;
              }}
            >
              View all case studies <ArrowUpRight size={12} />
            </motion.button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  variant,
  style: extraStyle,
}: {
  project: typeof PROJECTS[0];
  variant: "featured" | "tall" | "compact" | "wide";
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);

  const imgHeight =
    variant === "featured" ? 360 :
    variant === "tall"     ? 220 :
    variant === "compact"  ? 160 :
    /* wide */               240;

  const isWide = variant === "wide";

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(255,69,0,0.22)" : T.border}`,
        background: hovered ? "rgba(255,255,255,0.032)" : T.surface,
        cursor: "pointer",
        transition: "border-color 0.28s, background 0.28s",
        position: "relative",
        display: isWide ? "grid" : "block",
        gridTemplateColumns: isWide ? "1fr 1fr" : undefined,
        ...extraStyle,
      }}
    >
      {/* Image area */}
      <div style={{ overflow: "hidden", height: isWide ? "100%" : imgHeight, minHeight: isWide ? 220 : undefined, position: "relative" }}>
        <motion.img
          src={project.image}
          alt={project.title}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: hovered ? "brightness(0.82) saturate(0.85)" : "brightness(0.65) saturate(0.75)",
            transition: "filter 0.4s",
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isWide
              ? "linear-gradient(to right, transparent 60%, rgba(8,8,6,0.6) 100%)"
              : "linear-gradient(to bottom, transparent 30%, rgba(8,8,6,0.9) 100%)",
          }}
        />

        {/* Year + category top-left */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 7.5,
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.55)",
              background: "rgba(8,8,6,0.65)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 100,
              padding: "3px 10px",
              backdropFilter: "blur(8px)",
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Metric badge  bottom-left of image */}
        {!isWide && (
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 16,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontFamily: T.serif,
                fontSize: variant === "featured" ? 40 : 30,
                fontWeight: 300,
                color: "#fff",
                lineHeight: 1,
                textShadow: "0 2px 16px rgba(0,0,0,0.5)",
              }}
            >
              {project.metric}
            </span>
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 7,
                letterSpacing: "0.16em",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                marginTop: 3,
              }}
            >
              {project.metricLabel}
            </span>
          </div>
        )}

        {/* Hover arrow  top right */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 6, y: hovered ? 0 : -6 }}
          transition={{ duration: 0.22 }}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: ACCENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(255,69,0,0.4)",
          }}
        >
          <ArrowUpRight size={14} color="#fff" />
        </motion.div>
      </div>

      {/* Text content */}
      <div style={{ padding: isWide ? "28px 32px" : "20px 22px 24px" }}>
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 7.5,
            letterSpacing: "0.2em",
            color: ACCENT,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          {project.category}
        </div>
        <h3
          style={{
            fontFamily: T.serif,
            fontSize: isWide || variant === "featured" ? 30 : 22,
            fontWeight: 400,
            color: T.textPrimary,
            margin: "0 0 10px",
            letterSpacing: "-0.01em",
            transition: "color 0.22s",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: T.sans,
            fontSize: 13.5,
            color: T.textMuted,
            lineHeight: 1.7,
            margin: "0 0 20px",
            fontWeight: 300,
            maxWidth: isWide ? 420 : 380,
          }}
        >
          {project.desc}
        </p>

        {/* Metric  wide variant shows it here */}
        {isWide && (
          <div style={{ marginBottom: 20, display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: T.serif, fontSize: 36, fontWeight: 300, color: T.textPrimary, lineHeight: 1 }}>
              {project.metric}
            </span>
            <span style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.15em", color: T.textSubtle, textTransform: "uppercase" }}>
              {project.metricLabel}
            </span>
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "3px 10px",
                  borderRadius: 100,
                  background: hovered ? "rgba(255,69,0,0.05)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${hovered ? "rgba(255,69,0,0.14)" : "rgba(255,255,255,0.06)"}`,
                  fontFamily: T.mono,
                  fontSize: 7,
                  letterSpacing: "0.1em",
                  color: hovered ? "#FF6B3A" : T.textSubtle,
                  transition: "all 0.22s",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <motion.div
            animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.22 }}
            style={{ color: T.textSubtle }}
          >
            <ArrowUpRight size={14} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCESS
// ─────────────────────────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "We deep-dive into your business, users, and goals. Competitive analysis, technical audit, and a clear problem definition.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Wireframes, prototypes, and a complete design system. User flows and interfaces refined through iterative feedback.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Agile sprints with weekly demos. Clean, test-covered code shipped continuously to staging for your review.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "Zero-downtime deployment, monitoring setup, and a 30-day post-launch support window. You own everything.",
  },
];

function Process() {
  const { isMobile } = useBreakpoint();

  return (
    <section id="process" style={{ padding: isMobile ? "80px 16px" : "120px 24px", background: "rgba(255,255,255,0.01)" }}>
      <div style={{ maxWidth: 1600, margin: "0 auto" }}>
        <Reveal>
          <div style={{ marginBottom: 64 }}>
            <Label>How We Work</Label>
            <h2
              style={{
                fontFamily: T.serif,
                fontSize: isMobile ? 40 : 58,
                fontWeight: 300,
                color: T.textPrimary,
                lineHeight: 1.08,
                letterSpacing: "-0.015em",
                margin: "20px 0 0",
              }}
            >
              A process built
              <br />
              <em style={{ fontStyle: "italic", color: T.textSecondary }}>for clarity.</em>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {PROCESS_STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1}>
              <ProcessStep step={step} last={i === PROCESS_STEPS.length - 1} isMobile={isMobile} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  last,
  isMobile,
}: {
  step: typeof PROCESS_STEPS[0];
  last: boolean;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: isMobile ? 20 : 40,
        padding: isMobile ? "28px 0" : "36px 0",
        borderBottom: last ? "none" : `1px solid ${T.borderLight}`,
        cursor: "default",
      }}
    >
      {/* Number + connector */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <motion.div
          animate={{
            background: hovered ? ACCENT : "rgba(255,255,255,0.05)",
            borderColor: hovered ? ACCENT : "rgba(255,255,255,0.1)",
          }}
          transition={{ duration: 0.25 }}
          style={{
            width: isMobile ? 44 : 52,
            height: isMobile ? 44 : 52,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: T.mono,
            fontSize: isMobile ? 11 : 13,
            color: hovered ? "#fff" : ACCENT,
            letterSpacing: "0.05em",
            transition: "color 0.25s",
          }}
        >
          {step.num}
        </motion.div>
        {!last && (
          <div
            style={{
              width: 1,
              flex: 1,
              minHeight: 20,
              background: `linear-gradient(to bottom, rgba(255,69,0,0.3), transparent)`,
              marginTop: 8,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingTop: isMobile ? 10 : 14 }}>
        <h3
          style={{
            fontFamily: T.serif,
            fontSize: isMobile ? 28 : 36,
            fontWeight: 300,
            color: T.textPrimary,
            margin: "0 0 12px",
            letterSpacing: "-0.01em",
          }}
        >
          {step.title}
        </h3>
        <p style={{ fontFamily: T.sans, fontSize: 15, color: T.textMuted, lineHeight: 1.7, margin: 0, maxWidth: 600, fontWeight: 300 }}>
          {step.desc}
        </p>
      </div>

      {/* Arrow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
        transition={{ duration: 0.2 }}
        style={{ paddingTop: isMobile ? 10 : 16, flexShrink: 0 }}
      >
        <ArrowRight size={18} color={ACCENT} />
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "CubixByte took our chaotic backlog and turned it into a product our users love. The team's communication and technical depth is unmatched.",
    name: "Marcus Osei",
    role: "CTO, NovaPay",
    avatar: "https://images.unsplash.com/photo-1764545973653-94c40d993495?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwZm91bmRlciUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzc3MTQzMzMwfDA&ixlib=rb-4.1.0&q=80&w=200",
    stars: 5,
  },
  {
    quote: "We hired CubixByte for a 3-month contract and extended to 18 months. They think like founders, not contractors. Genuinely rare.",
    name: "Priya Mehta",
    role: "VP Product, Orbita",
    avatar: "https://images.unsplash.com/photo-1573166475912-1ed8b4f093d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMENFTyUyMHRlY2glMjBleGVjdXRpdmUlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzcxNDMzMzF8MA&ixlib=rb-4.1.0&q=80&w=200",
    stars: 5,
  },
  {
    quote: "Shipped our MVP in 8 weeks, zero production bugs at launch. Their design instincts elevated the product beyond what we imagined.",
    name: "James Wolfe",
    role: "Founder, FlowMobile",
    avatar: "https://images.unsplash.com/photo-1753715613373-90b1ea010731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbSUyMGRhcmslMjBvZmZpY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzc3MTQzMzIzfDA&ixlib=rb-4.1.0&q=80&w=200",
    stars: 5,
  },
];

function Testimonials() {
  const { isMobile, isTablet } = useBreakpoint();
  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <section id="about" style={{ padding: isMobile ? "80px 16px" : "120px 24px" }}>
      <div style={{ maxWidth: 1600, margin: "0 auto" }}>
        <Reveal>
          <div style={{ marginBottom: 56 }}>
            <Label>Client Love</Label>
            <h2
              style={{
                fontFamily: T.serif,
                fontSize: isMobile ? 40 : 58,
                fontWeight: 300,
                color: T.textPrimary,
                lineHeight: 1.08,
                letterSpacing: "-0.015em",
                margin: "20px 0 0",
              }}
            >
              Trusted by teams
              <br />
              <em style={{ fontStyle: "italic", color: T.textSecondary }}>that ship.</em>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div
                style={{
                  padding: "28px 28px 24px",
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: 3 }}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={12} fill={ACCENT} color={ACCENT} />
                  ))}
                </div>
                {/* Quote */}
                <p
                  style={{
                    fontFamily: T.serif,
                    fontSize: 19,
                    fontWeight: 300,
                    color: T.textSecondary,
                    lineHeight: 1.55,
                    margin: 0,
                    fontStyle: "italic",
                    flex: 1,
                  }}
                >
                  "{t.quote}"
                </p>
                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 4, borderTop: `1px solid ${T.borderLight}` }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", filter: "grayscale(30%)" }}
                  />
                  <div>
                    <div style={{ fontFamily: T.sans, fontSize: 13, color: T.textPrimary, fontWeight: 500, marginBottom: 2 }}>
                      {t.name}
                    </div>
                    <div style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.12em", color: T.textSubtle, textTransform: "uppercase" }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT / CTA
// ─────────────────────────────────────────────────────────────────────────────
function Contact() {
  const { isMobile } = useBreakpoint();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1400);
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    height: field === "message" ? "auto" : 46,
    minHeight: field === "message" ? 120 : "auto",
    padding: field === "message" ? "14px" : "0 14px",
    background: focused === field ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)",
    border: `1px solid ${focused === field ? "rgba(255,69,0,0.4)" : T.border}`,
    borderRadius: 8,
    color: T.textPrimary,
    fontFamily: T.sans,
    fontSize: 14,
    outline: "none",
    transition: "all 0.2s",
    caretColor: ACCENT,
    resize: "vertical" as const,
    lineHeight: 1.6,
    boxSizing: "border-box" as const,
    fontWeight: 300,
  });

  return (
    <section id="contact" style={{ padding: isMobile ? "80px 16px 60px" : "120px 24px 80px" }}>
      <div style={{ maxWidth: 1600, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 48 : 80,
            alignItems: "flex-start",
          }}
        >
          {/* Left */}
          <Reveal>
            <div>
              <Label>Get in Touch</Label>
              <h2
                style={{
                  fontFamily: T.serif,
                  fontSize: isMobile ? 40 : 58,
                  fontWeight: 300,
                  color: T.textPrimary,
                  lineHeight: 1.08,
                  letterSpacing: "-0.015em",
                  margin: "20px 0 20px",
                }}
              >
                Ready to
                <br />
                <em style={{ fontStyle: "italic", color: T.textSecondary }}>build together?</em>
              </h2>
              <p style={{ fontFamily: T.sans, fontSize: 15, color: T.textMuted, lineHeight: 1.7, margin: "0 0 40px", fontWeight: 300, maxWidth: 400 }}>
                We take on a limited number of projects each quarter. Tell us about what you're building  we'll get back within 24 hours.
              </p>

              {/* Contact details */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: Mail, label: "hello@cubixbyte.io" },
                  { icon: Phone, label: "+1 (415) 000-0000" },
                  { icon: MapPin, label: "San Francisco, CA  Remote Globally" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: "rgba(255,69,0,0.07)",
                        border: "1px solid rgba(255,69,0,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={14} color={ACCENT} />
                    </div>
                    <span style={{ fontFamily: T.sans, fontSize: 14, color: T.textMuted, fontWeight: 300 }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Availability badge */}
              <div
                style={{
                  marginTop: 36,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  background: "rgba(60,180,60,0.06)",
                  border: "1px solid rgba(60,180,60,0.18)",
                  borderRadius: 100,
                }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "#5DD87A", display: "inline-block" }}
                />
                <span style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.16em", color: "#5DD87A", textTransform: "uppercase" }}>
                  Accepting projects · Q3 2025
                </span>
              </div>
            </div>
          </Reveal>

          {/* Right  form */}
          <Reveal delay={0.15}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    padding: "48px 36px",
                    background: T.surface,
                    border: `1px solid ${T.border}`,
                    borderRadius: 16,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "rgba(93,216,122,0.1)",
                      border: "1px solid rgba(93,216,122,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Check size={24} color="#5DD87A" />
                  </div>
                  <h3 style={{ fontFamily: T.serif, fontSize: 32, fontWeight: 300, color: T.textPrimary, margin: 0 }}>
                    Message sent!
                  </h3>
                  <p style={{ fontFamily: T.sans, fontSize: 14, color: T.textMuted, margin: 0, lineHeight: 1.7, fontWeight: 300, maxWidth: 280 }}>
                    We'll review your project and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    style={{
                      marginTop: 8,
                      background: "none",
                      border: `1px solid ${T.border}`,
                      borderRadius: 7,
                      padding: "10px 20px",
                      fontFamily: T.mono,
                      fontSize: 8,
                      letterSpacing: "0.18em",
                      color: T.textMuted,
                      cursor: "pointer",
                      textTransform: "uppercase",
                    }}
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  style={{
                    padding: isMobile ? "28px 16px" : "36px 24px",
                    background: T.surface,
                    border: `1px solid ${T.border}`,
                    borderRadius: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 18,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.18em", color: T.textMuted, textTransform: "uppercase" }}>Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("name")}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.18em", color: T.textMuted, textTransform: "uppercase" }}>Work Email</label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("email")}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.18em", color: T.textMuted, textTransform: "uppercase" }}>Tell us about your project</label>
                    <textarea
                      placeholder="What are you building? What's the timeline? What's the budget range?"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("message")}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.012 }}
                    whileTap={{ scale: 0.985 }}
                    style={{
                      height: 50,
                      background: sending ? "rgba(255,69,0,0.7)" : ACCENT,
                      border: "none",
                      borderRadius: 8,
                      fontFamily: T.mono,
                      fontSize: 9.5,
                      letterSpacing: "0.22em",
                      color: "#fff",
                      cursor: sending ? "not-allowed" : "pointer",
                      textTransform: "uppercase",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      boxShadow: sending ? "none" : "0 4px 24px rgba(255,69,0,0.35)",
                      transition: "background 0.25s, box-shadow 0.25s",
                    }}
                  >
                    {sending ? "Sending..." : (
                      <>Send Message <ArrowRight size={13} /></>
                    )}
                  </motion.button>

                  <p style={{ fontFamily: T.mono, fontSize: 7.5, color: T.textSubtle, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0, textAlign: "center", lineHeight: 1.6 }}>
                    No spam · NDA available upon request · Response within 24h
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  Services: ["Web Development", "Mobile Apps", "Cloud & DevOps", "UI/UX Design", "API & Backend"],
  Company: ["About", "Work", "Process", "Careers", "Blog"],
  Legal: ["Privacy Policy", "Terms of Service", "NDA Template", "Cookie Policy"],
};

type Page = "home" | "privacy" | "terms" | "nda" | "cookies";

function Footer({ onNavigate }: { onNavigate?: (page: Page) => void }) {
  const { isMobile, isTablet } = useBreakpoint();

  return (
    <footer
      style={{
        borderTop: `1px solid ${T.border}`,
        padding: isMobile ? "60px 16px 32px" : "80px 24px 40px",
      }}
    >
      <div style={{ maxWidth: 1600, margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
            gap: isMobile ? 40 : 48,
            marginBottom: 64,
          }}
        >
          {/* Brand col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              
              <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.24em", color: T.textPrimary, textTransform: "uppercase" }}>
                CubixByte
              </span>
            </div>
            <p style={{ fontFamily: T.sans, fontSize: 14, color: T.textMuted, lineHeight: 1.7, margin: "0 0 24px", maxWidth: 280, fontWeight: 300 }}>
              A full-stack software agency engineering digital products that scale. EST. 2021.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Instagram, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: T.surface,
                    border: `1px solid ${T.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: T.textSubtle,
                    textDecoration: "none",
                    transition: "color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = T.textSecondary;
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = T.textSubtle;
                    (e.currentTarget as HTMLAnchorElement).style.background = T.surface;
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => {
            const isLegal = heading === "Legal";
            return (
              <div key={heading}>
                <div style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.2em", color: T.textSubtle, textTransform: "uppercase", marginBottom: 18 }}>
                  {heading}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        const pageMap: Record<string, Page> = {
                          "Privacy Policy": "privacy",
                          "Terms of Service": "terms",
                          "NDA Template": "nda",
                          "Cookie Policy": "cookies",
                        };
                        const sectionMap: Record<string, string> = {
                          "Web Development": "services",
                          "Mobile Apps": "services",
                          "Cloud & DevOps": "services",
                          "UI/UX Design": "services",
                          "API & Backend": "services",
                          "About": "about",
                          "Work": "work",
                          "Process": "process",
                          "Careers": "contact",
                          "Blog": "contact",
                        };

                        if (isLegal && onNavigate) {
                          onNavigate(pageMap[link] || "home");
                        } else if (sectionMap[link]) {
                          document.getElementById(sectionMap[link])?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      style={{
                        fontFamily: T.sans,
                        fontSize: 13.5,
                        color: T.textMuted,
                        textDecoration: "none",
                        transition: "color 0.2s",
                        fontWeight: 300,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = T.textSecondary)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = T.textMuted)}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: 28,
            borderTop: `1px solid ${T.borderLight}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.14em", color: T.textSubtle, textTransform: "uppercase" }}>
            © 2025 CubixByte. All rights reserved.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.14em", color: T.textSubtle, textTransform: "uppercase" }}>
              SOC 2 Compliant · SSL Secured
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN WEBSITE ASSEMBLY
// ─────────────────────────────────────────────────────────────────────────────
type CubixByteWebsiteProps = {
  onNavigate?: (page: Page) => void;
};

export function CubixByteWebsite({ onNavigate }: CubixByteWebsiteProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ background: T.bg, minHeight: "100vh", color: T.textPrimary }}
    >
      <Header />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Work />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer onNavigate={onNavigate} />
    </motion.div>
  );
}
