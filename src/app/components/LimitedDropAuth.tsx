import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Minus,
  Plus,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  ArrowLeft,
  Mail,
  RefreshCw,
} from "lucide-react";
const productImg = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY29kaW5nJTIwc2NyZWVufGVufDB8fHx8MTc3NzE0MDA3MXw&ixlib=rb-4.1.0&q=80&w=800";

const ACCENT = "#FF4500";

const BACKDROP_IMAGES = [
  "https://images.unsplash.com/photo-1599837565318-67429bde7162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwc29mdHdhcmUlMjBjb2RlJTIwZGV2ZWxvcGVyJTIwd29ya3NwYWNlJTIwbW9vZHl8ZW58MXx8fHwxNzc3MTQwMDcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1738463746698-7e89cdb4ac43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwdGVjaCUyMGFnZW5jeSUyMGFic3RyYWN0JTIwZGlnaXRhbCUyMG5lb258ZW58MXx8fHwxNzc3MTQwMDcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1639066648921-82d4500abf1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbWluaW1hbCUyMHNlcnZlciUyMGluZnJhc3RydWN0dXJlJTIwY2xvdWQlMjBjb21wdXRpbmd8ZW58MXx8fHwxNzc3MTQwMDcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
];

const CLIENT_SPOTS_REMAINING = 4;
const CLIENT_SPOTS_TOTAL = 10;

type Tab = "login" | "signup";
type View = "auth" | "forgot" | "sent";

// ── Breakpoint hook ───────────────────────────────────────────────────────────
function useBreakpoint() {
  const getWidth = () =>
    typeof window !== "undefined" ? window.innerWidth : 1200;
  const [width, setWidth] = useState(getWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return {
    isMobile: width < 640,
    isTablet: width >= 640 && width < 900,
    isDesktop: width >= 900,
    width,
  };
}

// ── Input field ───────────────────────────────────────────────────────────────
interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  autoComplete?: string;
}
function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 9,
          letterSpacing: "0.18em",
          color: focused ? "#B0B0A8" : "#7A7A72",
          textTransform: "uppercase",
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={{
          height: 44,
          padding: "0 14px",
          background: focused
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${
            focused ? "rgba(255,69,0,0.45)" : "rgba(255,255,255,0.08)"
          }`,
          borderRadius: 7,
          color: "#F0EFE8",
          fontFamily: "'Space Mono', monospace",
          fontSize: 12,
          outline: "none",
          transition: "all 0.2s ease",
          caretColor: ACCENT,
          letterSpacing: "0.02em",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

// ── Pulsing badge ─────────────────────────────────────────────────────────────
function Badge() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.75, 1] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "5px 13px",
        borderRadius: 100,
        background: "rgba(255,69,0,0.1)",
        border: "1px solid rgba(255,69,0,0.22)",
        fontFamily: "'Space Mono', monospace",
        fontSize: 8.5,
        letterSpacing: "0.18em",
        color: "#FF6B3A",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: ACCENT,
          display: "inline-block",
          flexShrink: 0,
          boxShadow: `0 0 6px ${ACCENT}`,
        }}
      />
      {String(CLIENT_SPOTS_REMAINING).padStart(2, "0")} / {CLIENT_SPOTS_TOTAL}{" "}
      CLIENT SPOTS
    </motion.span>
  );
}

// ── Brand mark ────────────────────────────────────────────────────────────────
function BrandMark({ version }: { version?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <div
        style={{
          width: 22,
          height: 22,
          background: ACCENT,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 2px 10px rgba(255,69,0,0.4)",
        }}
      >
        <div
          style={{ width: 9, height: 9, background: "#080806", borderRadius: 2 }}
        />
      </div>
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 9,
          letterSpacing: "0.28em",
          color: "#6E6E68",
          textTransform: "uppercase",
        }}
      >
        CubixByte
      </span>
      {version && (
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 8,
            letterSpacing: "0.14em",
            color: "#5E5E58",
            marginLeft: 6,
          }}
        >
          {version}
        </span>
      )}
    </div>
  );
}

// ── Forgot Password panel ─────────────────────────────────────────────────────
interface ForgotPanelProps {
  isMobile: boolean;
  isTablet: boolean;
  onBack: () => void;
  onSent: (email: string) => void;
}
function ForgotPanel({ isMobile, isTablet, onBack, onSent }: ForgotPanelProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const h1Size = isMobile ? 34 : isTablet ? 38 : 46;
  const rightPad = isMobile
    ? "28px 24px 28px"
    : isTablet
    ? "32px 28px 28px"
    : "40px 44px 36px";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onSent(email);
    }, 1200);
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: rightPad,
        background: "rgba(12,12,10,0.98)",
        minWidth: 0,
      }}
    >
      {/* Header row */}
      {!isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: isTablet ? 28 : 44,
          }}
        >
          <BrandMark />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 8,
              letterSpacing: "0.14em",
              color: "#5E5E58",
            }}
          >
            V2 / 2025
          </span>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          marginBottom: isMobile ? 22 : 32,
          color: "#6A6A64",
          fontFamily: "'Space Mono', monospace",
          fontSize: 8,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "#B0B0A8")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "#6A6A64")
        }
      >
        <ArrowLeft size={11} />
        Back to Login
      </button>

      {/* Heading */}
      <div style={{ marginBottom: isMobile ? 28 : 36 }}>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: h1Size,
            fontWeight: 300,
            color: "#EEEAE0",
            margin: 0,
            lineHeight: 1.08,
            letterSpacing: "-0.015em",
          }}
        >
          Reset your
          <br />
          <em style={{ fontStyle: "italic", color: "#C4C0B4", fontWeight: 300 }}>
            access.
          </em>
        </h1>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.18em",
            color: "#7A7A72",
            lineHeight: 1.7,
            margin: "14px 0 0",
          }}
        >
          ENTER YOUR EMAIL · WE'LL SEND A SECURE LINK
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.055)",
          marginBottom: isMobile ? 20 : 28,
        }}
      />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}
      >
        <InputField
          label="Work Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          autoComplete="email"
        />

        {/* Info note */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            padding: "12px 14px",
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 8,
            marginTop: 2,
          }}
        >
          <Mail
            size={12}
            style={{ color: "#6A6A64", flexShrink: 0, marginTop: 1 }}
          />
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 8,
              color: "#6A6A64",
              letterSpacing: "0.1em",
              lineHeight: 1.7,
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            A reset link will be sent to your registered email address. Link
            expires in 15 minutes.
          </p>
        </div>

        <div style={{ flex: 1, minHeight: 12 }} />

        {/* CTA */}
        <motion.button
          type="submit"
          whileHover={!submitting ? { scale: 1.012 } : {}}
          whileTap={!submitting ? { scale: 0.985 } : {}}
          disabled={submitting || !email}
          style={{
            width: "100%",
            height: 52,
            background:
              !email
                ? "rgba(255,69,0,0.35)"
                : submitting
                ? "rgba(255,69,0,0.7)"
                : ACCENT,
            border: "none",
            borderRadius: 9,
            color: "#fff",
            cursor: submitting || !email ? "not-allowed" : "pointer",
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            transition: "background 0.3s ease, box-shadow 0.3s ease",
            boxShadow:
              !email
                ? "none"
                : submitting
                ? "0 4px 20px rgba(255,69,0,0.25)"
                : "0 4px 28px rgba(255,69,0,0.38), 0 1px 4px rgba(0,0,0,0.4)",
            boxSizing: "border-box",
          }}
        >
          <AnimatePresence mode="wait">
            {submitting ? (
              <motion.span
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: "flex", alignItems: "center", gap: 9 }}
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{ display: "flex" }}
                >
                  <RefreshCw size={13} />
                </motion.span>
                Sending Link...
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                Send Reset Link
                <ArrowRight size={13} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>

      {/* Privacy footnote */}
      <div
        style={{
          marginTop: isMobile ? 18 : 24,
          paddingTop: 16,
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 7.5,
            color: "#585852",
            letterSpacing: "0.1em",
            lineHeight: 1.65,
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          By continuing you agree to our Service Agreement &amp; NDA Policy.
          <br />
          Your data is encrypted · SOC 2 compliant · Never shared.
        </p>
      </div>
    </div>
  );
}

// ── Reset Sent confirmation panel ─────────────────────────────────────────────
interface SentPanelProps {
  isMobile: boolean;
  isTablet: boolean;
  email: string;
  onBack: () => void;
  onResend: () => void;
}
function SentPanel({ isMobile, isTablet, email, onBack, onResend }: SentPanelProps) {
  const [resent, setResent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const h1Size = isMobile ? 34 : isTablet ? 38 : 46;
  const rightPad = isMobile
    ? "28px 24px 28px"
    : isTablet
    ? "32px 28px 28px"
    : "40px 44px 36px";

  const handleResend = () => {
    if (countdown > 0) return;
    onResend();
    setResent(true);
    setCountdown(30);
  };

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: rightPad,
        background: "rgba(12,12,10,0.98)",
        minWidth: 0,
      }}
    >
      {/* Header row */}
      {!isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: isTablet ? 28 : 44,
          }}
        >
          <BrandMark />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 8,
              letterSpacing: "0.14em",
              color: "#5E5E58",
            }}
          >
            V2 / 2025
          </span>
        </div>
      )}

      {/* Envelope icon with glow */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginBottom: isMobile ? 24 : 32,
        }}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "rgba(255,69,0,0.08)",
            border: "1px solid rgba(255,69,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            marginBottom: 4,
            boxShadow: "0 0 32px rgba(255,69,0,0.12)",
          }}
        >
          <Mail size={22} style={{ color: ACCENT }} />
          {/* Ping ring */}
          <motion.div
            animate={{ scale: [1, 1.55], opacity: [0.3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: -1,
              borderRadius: 14,
              border: `1px solid ${ACCENT}`,
              pointerEvents: "none",
            }}
          />
        </motion.div>

        {/* Check badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#1A3A1A",
            border: "1.5px solid rgba(60,180,60,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: -18,
            marginLeft: 38,
          }}
        >
          <Check size={10} style={{ color: "#5DD87A" }} />
        </motion.div>
      </div>

      {/* Heading */}
      <div style={{ marginBottom: isMobile ? 24 : 32 }}>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: h1Size,
            fontWeight: 300,
            color: "#EEEAE0",
            margin: 0,
            lineHeight: 1.08,
            letterSpacing: "-0.015em",
          }}
        >
          Check your
          <br />
          <em style={{ fontStyle: "italic", color: "#C4C0B4", fontWeight: 300 }}>
            inbox.
          </em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.4 }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.18em",
            color: "#7A7A72",
            lineHeight: 1.7,
            margin: "14px 0 0",
          }}
        >
          RESET LINK SENT · CHECK YOUR SPAM TOO
        </motion.p>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.055)",
          marginBottom: isMobile ? 20 : 26,
        }}
      />

      {/* Email confirmation card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.4 }}
        style={{
          padding: "16px 18px",
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 10,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 8,
            letterSpacing: "0.16em",
            color: "#6A6A64",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          Sent to
        </div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            color: "#EEEAE0",
            letterSpacing: "0.04em",
            wordBreak: "break-all",
          }}
        >
          {email}
        </div>
      </motion.div>

      {/* Steps */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.28, duration: 0.4 }}
        style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 4 }}
      >
        {[
          { num: "01", text: "Open the email from noreply@cubixbyte.io" },
          { num: "02", text: "Click the secure reset link inside" },
          { num: "03", text: "Create your new password — link expires in 15 min" },
        ].map((step) => (
          <div
            key={step.num}
            style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
          >
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 8,
                color: ACCENT,
                letterSpacing: "0.1em",
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              {step.num}
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 8,
                color: "#6A6A64",
                letterSpacing: "0.1em",
                lineHeight: 1.6,
                textTransform: "uppercase",
              }}
            >
              {step.text}
            </span>
          </div>
        ))}
      </motion.div>

      <div style={{ flex: 1, minHeight: 12 }} />

      {/* Resend + back row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 14,
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            color: "#6A6A64",
            fontFamily: "'Space Mono', monospace",
            fontSize: 8,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#B0B0A8")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6A6A64")}
        >
          <ArrowLeft size={10} />
          Back to Login
        </button>

        <button
          onClick={handleResend}
          disabled={countdown > 0}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: countdown > 0 ? "not-allowed" : "pointer",
            padding: 0,
            color: countdown > 0 ? "#4A4A42" : resent ? "#5DD87A" : "#FF6B3A",
            fontFamily: "'Space Mono', monospace",
            fontSize: 8,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            transition: "color 0.2s ease",
          }}
        >
          <RefreshCw size={9} />
          {countdown > 0
            ? `Resend in ${countdown}s`
            : resent
            ? "Sent Again ✓"
            : "Resend Link"}
        </button>
      </motion.div>

      {/* Privacy footnote */}
      <div
        style={{
          paddingTop: 16,
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 7.5,
            color: "#585852",
            letterSpacing: "0.1em",
            lineHeight: 1.65,
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          By continuing you agree to our Service Agreement &amp; NDA Policy.
          <br />
          Your data is encrypted · SOC 2 compliant · Never shared.
        </p>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function LimitedDropAuth({ onLogin }: { onLogin?: () => void }) {
  const { isMobile, isTablet } = useBreakpoint();

  const [view, setView] = useState<View>("auth");
  const [tab, setTab] = useState<Tab>("login");
  const [teamSize, setTeamSize] = useState(1);
  const [showPw, setShowPw] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fields, setFields] = useState({ name: "", email: "", password: "" });
  const [resetEmail, setResetEmail] = useState("");

  const handleField =
    (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setFields((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSuccess(true);
      setSubmitted(false);
      setTimeout(() => {
        setSuccess(false);
        onLogin?.();
      }, 900);
    }, 1100);
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    setShowPw(false);
    setSuccess(false);
    setSubmitted(false);
  };

  const goForgot = () => setView("forgot");
  const goBack = () => { setView("auth"); setResetEmail(""); };
  const handleSent = (email: string) => { setResetEmail(email); setView("sent"); };
  const handleResend = () => {}; // stub — wire to real API

  const leftPanelWidth = isTablet ? "36%" : "42%";
  const leftPad = isMobile
    ? "28px 24px"
    : isTablet
    ? "32px 24px 28px"
    : "40px 36px 36px";
  const rightPad = isMobile
    ? "28px 24px 28px"
    : isTablet
    ? "32px 28px 28px"
    : "40px 44px 36px";
  const h1Size = isMobile ? 34 : isTablet ? 38 : 46;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "center",
        padding: isMobile ? "16px 12px 32px" : "32px 16px",
        background: "#080806",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* ─── BACKDROP ─── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        {BACKDROP_IMAGES.map((src, i) => (
          <div key={i} style={{ overflow: "hidden", position: "relative" }}>
            <img
              src={src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "saturate(0.25) brightness(0.55)",
                transform: "scale(1.05)",
              }}
            />
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(28px) saturate(0.6)",
            WebkitBackdropFilter: "blur(28px) saturate(0.6)",
            background: "rgba(6,6,4,0.68)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 0%, rgba(3,3,2,0.92) 100%)",
          }}
        />
      </div>

      {/* ─── MODAL ─── */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
          maxWidth: isMobile ? 480 : 900,
          borderRadius: isMobile ? 14 : 18,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow:
            "0 2px 4px rgba(0,0,0,0.55), 0 12px 24px rgba(0,0,0,0.7), 0 45px 65px rgba(0,0,0,0.88)",
          background: "rgba(10,10,8,0.98)",
          marginTop: isMobile ? 16 : 0,
        }}
      >
        {/* ── MOBILE TOP BAR ── */}
        {isMobile && (
          <div
            style={{
              padding: "20px 24px 18px",
              background: "rgba(8,8,6,0.99)",
              borderBottom: "1px solid rgba(255,255,255,0.055)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <BrandMark />
            <Badge />
          </div>
        )}

        {/* ── LEFT PANEL (tablet + desktop) ── */}
        {!isMobile && (
          <div
            style={{
              width: leftPanelWidth,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              padding: leftPad,
              background: "rgba(8,8,6,0.99)",
              borderRight: "1px solid rgba(255,255,255,0.055)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top meta */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: isTablet ? 22 : 32,
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  color: "#6E6E68",
                  textTransform: "uppercase",
                }}
              >
                CB — V2.0
              </span>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 9,
                  letterSpacing: "0.15em",
                  color: "#6E6E68",
                }}
              >
                EST. 2021
              </span>
            </div>

            {/* Desktop: full portrait image */}
            {!isTablet && (
              <div style={{ position: "relative", marginBottom: 8 }}>
                <motion.div
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    aspectRatio: "4/5",
                    background: "#161612",
                    boxShadow:
                      "0 8px 28px rgba(0,0,0,0.75), 0 2px 6px rgba(0,0,0,0.55)",
                    transform: "rotate(1.5deg) translateY(-6px)",
                    transformOrigin: "center bottom",
                    position: "relative",
                  }}
                >
                  <img
                    src={productImg}
                    alt="CubixByte Studio"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to bottom, rgba(8,8,6,0.18) 0%, transparent 40%, rgba(8,8,6,0.35) 100%)",
                    }}
                  />
                </motion.div>
                <div
                  style={{
                    position: "absolute",
                    bottom: -16,
                    left: "20%",
                    right: "20%",
                    height: 38,
                    background: "rgba(255,69,0,0.18)",
                    filter: "blur(22px)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                  }}
                />
              </div>
            )}

            {/* Tablet: compact strip */}
            {isTablet && (
              <div
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                  height: 130,
                  background: "#161612",
                  boxShadow: "0 4px 18px rgba(0,0,0,0.7)",
                  marginBottom: 20,
                  position: "relative",
                  transform: "rotate(1deg)",
                  transformOrigin: "center bottom",
                }}
              >
                <img
                  src={productImg}
                  alt="CubixByte Studio"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, transparent 40%, rgba(8,8,6,0.6) 100%)",
                  }}
                />
              </div>
            )}

            {/* Agency info */}
            <div style={{ position: "relative", zIndex: 2, marginTop: isTablet ? 0 : 28 }}>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 8,
                  letterSpacing: "0.22em",
                  color: "#6E6E68",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Software Agency · 2025
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: isTablet ? 26 : 34,
                  fontWeight: 300,
                  color: "#EEEAE0",
                  lineHeight: 1.12,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                The Full Stack
                <br />
                <em
                  style={{ fontStyle: "italic", fontWeight: 300, color: "#C4C0B4" }}
                >
                  Studio.
                </em>
              </h2>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 8,
                  color: "#6A6A64",
                  marginTop: 12,
                  letterSpacing: "0.14em",
                  lineHeight: 1.7,
                }}
              >
                REACT / NODE.JS / CLOUD NATIVE
                <br />
                UI · BACKEND · DEVOPS · STRATEGY
              </div>
            </div>

            {/* Badge */}
            <div style={{ marginTop: isTablet ? 18 : 28 }}>
              <Badge />
            </div>

            {/* Rate */}
            <div
              style={{
                marginTop: isTablet ? 14 : 20,
                display: "flex",
                alignItems: "baseline",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: isTablet ? 22 : 26,
                  fontWeight: 400,
                  color: "#EEEAE0",
                  letterSpacing: "-0.02em",
                }}
              >
                $4,500
              </span>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 8,
                  color: "#6A6A64",
                  letterSpacing: "0.12em",
                }}
              >
                / MO
              </span>
            </div>

            {/* Corner accents */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 140,
                height: 140,
                background:
                  "radial-gradient(circle at bottom right, rgba(255,69,0,0.07) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 100,
                height: 100,
                background:
                  "radial-gradient(circle at top left, rgba(255,255,255,0.02) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
          </div>
        )}

        {/* ── RIGHT PANEL — animated view switcher ── */}
        <AnimatePresence mode="wait">
          {/* ─ FORGOT PASSWORD ─ */}
          {view === "forgot" && (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ flex: 1, display: "flex", minWidth: 0 }}
            >
              <ForgotPanel
                isMobile={isMobile}
                isTablet={isTablet}
                onBack={goBack}
                onSent={handleSent}
              />
            </motion.div>
          )}

          {/* ─ RESET SENT ─ */}
          {view === "sent" && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ flex: 1, display: "flex", minWidth: 0 }}
            >
              <SentPanel
                isMobile={isMobile}
                isTablet={isTablet}
                email={resetEmail}
                onBack={goBack}
                onResend={handleResend}
              />
            </motion.div>
          )}

          {/* ─ AUTH (login / signup) ─ */}
          {view === "auth" && (
            <motion.div
              key="auth"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: rightPad,
                background: "rgba(12,12,10,0.98)",
                minWidth: 0,
              }}
            >
              {/* Brand mark */}
              {!isMobile && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: isTablet ? 28 : 44,
                  }}
                >
                  <BrandMark />
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 8,
                      letterSpacing: "0.14em",
                      color: "#5E5E58",
                    }}
                  >
                    V2 / 2025
                  </span>
                </div>
              )}

              {/* Heading */}
              <div style={{ marginBottom: isMobile ? 20 : 30 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab + "-heading"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <h1
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: h1Size,
                        fontWeight: 300,
                        color: "#EEEAE0",
                        margin: 0,
                        lineHeight: 1.08,
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {tab === "login" ? (
                        <>
                          Welcome
                          <br />
                          <em
                            style={{
                              fontStyle: "italic",
                              color: "#C4C0B4",
                              fontWeight: 300,
                            }}
                          >
                            back.
                          </em>
                        </>
                      ) : (
                        <>
                          Start
                          <br />
                          <em
                            style={{
                              fontStyle: "italic",
                              color: "#C4C0B4",
                              fontWeight: 300,
                            }}
                          >
                            building.
                          </em>
                        </>
                      )}
                    </h1>
                    <p
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 9,
                        letterSpacing: "0.18em",
                        color: "#7A7A72",
                        lineHeight: 1.7,
                        margin: "12px 0 0",
                      }}
                    >
                      {tab === "login"
                        ? "ACCESS YOUR CLIENT WORKSPACE"
                        : "JOIN THE STUDIO · SHIP SOMETHING GREAT"}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Tab switcher */}
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid rgba(255,255,255,0.055)",
                  marginBottom: isMobile ? 20 : 28,
                }}
              >
                {(["login", "signup"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => switchTab(t)}
                    style={{
                      padding: "8px 0",
                      marginRight: 28,
                      marginBottom: -1,
                      background: "none",
                      border: "none",
                      borderBottom:
                        tab === t
                          ? `1.5px solid ${ACCENT}`
                          : "1.5px solid transparent",
                      cursor: "pointer",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 9,
                      letterSpacing: "0.22em",
                      color: tab === t ? "#EEEAE0" : "#6E6E68",
                      textTransform: "uppercase",
                      transition: "color 0.2s ease, border-color 0.2s ease",
                    }}
                  >
                    {t === "login" ? "Log In" : "Get Access"}
                  </button>
                ))}
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.form
                  key={tab}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.26, ease: [0.25, 0.1, 0.25, 1] }}
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: isMobile ? 12 : 14,
                    flex: 1,
                  }}
                >
                  {tab === "signup" && (
                    <InputField
                      label="Full Name"
                      type="text"
                      value={fields.name}
                      onChange={handleField("name")}
                      placeholder="Jane Smith"
                      autoComplete="name"
                    />
                  )}

                  <InputField
                    label="Work Email"
                    type="email"
                    value={fields.email}
                    onChange={handleField("email")}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />

                  {/* Password */}
                  <div style={{ position: "relative" }}>
                    <InputField
                      label="Password"
                      type={showPw ? "text" : "password"}
                      value={fields.password}
                      onChange={handleField("password")}
                      placeholder="••••••••••"
                      autoComplete={
                        tab === "login" ? "current-password" : "new-password"
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      style={{
                        position: "absolute",
                        right: 13,
                        bottom: 13,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#7A7A72",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        transition: "color 0.2s",
                      }}
                    >
                      {showPw ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>

                  {/* Team Size Stepper */}
                  {tab === "signup" && (
                    <div style={{ marginTop: 4 }}>
                      <div
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: 9,
                          letterSpacing: "0.18em",
                          color: "#7A7A72",
                          textTransform: "uppercase",
                          marginBottom: 10,
                        }}
                      >
                        Team Size
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            setTeamSize((q) => Math.max(1, q - 1))
                          }
                          disabled={teamSize <= 1}
                          style={{
                            width: 42,
                            height: 42,
                            background:
                              teamSize <= 1
                                ? "rgba(255,255,255,0.02)"
                                : "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRight: "none",
                            color: teamSize <= 1 ? "#5A5A54" : "#C4C0B4",
                            cursor: teamSize <= 1 ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "7px 0 0 7px",
                            transition: "background 0.15s, color 0.15s",
                            flexShrink: 0,
                          }}
                        >
                          <Minus size={11} />
                        </motion.button>

                        <div
                          style={{
                            width: 56,
                            height: 42,
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 14,
                            color: "#EEEAE0",
                            letterSpacing: "0.05em",
                            flexShrink: 0,
                          }}
                        >
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={teamSize}
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 6 }}
                              transition={{ duration: 0.14 }}
                            >
                              {String(teamSize).padStart(2, "0")}
                            </motion.span>
                          </AnimatePresence>
                        </div>

                        <motion.button
                          type="button"
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            setTeamSize((q) => Math.min(50, q + 1))
                          }
                          disabled={teamSize >= 50}
                          style={{
                            width: 42,
                            height: 42,
                            background:
                              teamSize >= 50
                                ? "rgba(255,255,255,0.02)"
                                : "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderLeft: "none",
                            color: teamSize >= 50 ? "#5A5A54" : "#C4C0B4",
                            cursor:
                              teamSize >= 50 ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "0 7px 7px 0",
                            transition: "background 0.15s, color 0.15s",
                            flexShrink: 0,
                          }}
                        >
                          <Plus size={11} />
                        </motion.button>

                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 8,
                            color: "#6A6A64",
                            marginLeft: 14,
                            letterSpacing: "0.12em",
                            lineHeight: 1.5,
                          }}
                        >
                          UP TO 50
                          <br />
                          MEMBERS
                        </span>
                      </div>
                    </div>
                  )}

                  <div
                    style={{
                      flex: 1,
                      minHeight: tab === "signup" ? 4 : isMobile ? 8 : 12,
                    }}
                  />

                  {/* CTA Button */}
                  <motion.button
                    type="submit"
                    whileHover={!submitted && !success ? { scale: 1.012 } : {}}
                    whileTap={!submitted && !success ? { scale: 0.985 } : {}}
                    style={{
                      width: "100%",
                      height: 52,
                      background: success
                        ? "rgba(255,255,255,0.06)"
                        : submitted
                        ? "rgba(255,69,0,0.7)"
                        : ACCENT,
                      border: success
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "none",
                      borderRadius: 9,
                      color: "#fff",
                      cursor: submitted ? "not-allowed" : "pointer",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      transition:
                        "background 0.3s ease, box-shadow 0.3s ease",
                      boxShadow: success
                        ? "none"
                        : submitted
                        ? "0 4px 20px rgba(255,69,0,0.25)"
                        : "0 4px 28px rgba(255,69,0,0.38), 0 1px 4px rgba(0,0,0,0.4)",
                      boxSizing: "border-box",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {success ? (
                        <motion.span
                          key="success"
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 9,
                          }}
                        >
                          <Check size={14} />
                          {tab === "login"
                            ? "Access Granted"
                            : "Request Received"}
                        </motion.span>
                      ) : submitted ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Authenticating...
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          {tab === "login"
                            ? "Enter Workspace"
                            : "Request Access"}
                          <ArrowRight size={13} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Footer links */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        tab === "login" ? "space-between" : "center",
                      marginTop: 4,
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    {tab === "login" && (
                      <button
                        type="button"
                        onClick={goForgot}
                        style={{
                          background: "none",
                          border: "none",
                          fontFamily: "'Space Mono', monospace",
                          fontSize: 8,
                          color: "#6A6A64",
                          cursor: "pointer",
                          letterSpacing: "0.14em",
                          padding: 0,
                          transition: "color 0.2s",
                          textTransform: "uppercase",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#FF6B3A")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#6A6A64")
                        }
                      >
                        FORGOT PASSWORD
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        switchTab(tab === "login" ? "signup" : "login")
                      }
                      style={{
                        background: "none",
                        border: "none",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 8,
                        color: "#6A6A64",
                        cursor: "pointer",
                        letterSpacing: "0.14em",
                        padding: 0,
                        transition: "color 0.2s",
                        textTransform: "uppercase",
                      }}
                    >
                      {tab === "login"
                        ? "NEW CLIENT? APPLY →"
                        : "← ALREADY A CLIENT?"}
                    </button>
                  </div>
                </motion.form>
              </AnimatePresence>

              {/* Privacy footnote */}
              <div
                style={{
                  marginTop: isMobile ? 18 : 24,
                  paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 7.5,
                    color: "#585852",
                    letterSpacing: "0.1em",
                    lineHeight: 1.65,
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  By continuing you agree to our Service Agreement &amp; NDA
                  Policy.
                  <br />
                  Your data is encrypted · SOC 2 compliant · Never shared.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Noise texture overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 5,
          pointerEvents: "none",
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}
