import { motion } from "motion/react";
import { ArrowLeft, Shield, Lock, Eye, Server, Globe } from "lucide-react";
import { useBreakpoint } from "../components/CubixByteWebsite";

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

const ACCENT = "#FF4500";

export function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  const { isMobile } = useBreakpoint();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: "100vh",
        background: T.bg,
        color: T.textPrimary,
        fontFamily: T.sans,
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(8,8,6,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: isMobile ? "16px 20px" : "20px 32px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <button
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              color: T.textMuted,
              cursor: "pointer",
              fontFamily: T.mono,
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              transition: "color 0.2s",
              padding: "8px 12px",
              borderRadius: 6,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = T.textPrimary;
              e.currentTarget.style.background = T.surface;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = T.textMuted;
              e.currentTarget.style.background = "transparent";
            }}
          >
            <ArrowLeft size={14} />
            Back to Site
          </button>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 24,
                height: 24,
                background: ACCENT,
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: 10, height: 10, background: T.bg, borderRadius: 2 }} />
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
          </div>
        </div>
      </header>

      {/* Content */}
      <main
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: isMobile ? "40px 20px 80px" : "60px 32px 100px",
        }}
      >
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 100,
              background: "rgba(255,69,0,0.08)",
              border: `1px solid rgba(255,69,0,0.2)`,
              marginBottom: 24,
            }}
          >
            <Shield size={12} style={{ color: ACCENT }} />
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 9,
                letterSpacing: "0.2em",
                color: "#FF6B3A",
                textTransform: "uppercase",
              }}
            >
              Legal Document
            </span>
          </div>

          <h1
            style={{
              fontFamily: T.serif,
              fontSize: isMobile ? 36 : 48,
              fontWeight: 300,
              color: T.textPrimary,
              lineHeight: 1.1,
              margin: "0 0 16px",
              letterSpacing: "-0.02em",
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              fontFamily: T.sans,
              fontSize: 16,
              color: T.textMuted,
              lineHeight: 1.7,
              margin: 0,
              fontWeight: 300,
            }}
          >
            Last updated: January 2025
          </p>
        </motion.div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <Section
            icon={<Eye size={18} />}
            title="Information We Collect"
            content="We collect information that you provide directly to us, including name, email address, phone number, and project details when you contact us or request our services. We also collect technical data such as IP address, browser type, and usage patterns through cookies and analytics tools."
          />

          <Section
            icon={<Lock size={18} />}
            title="How We Use Your Information"
            content="We use your information to provide and improve our services, communicate with you about projects, send relevant updates, process transactions, and ensure the security of our platform. We never sell your personal data to third parties."
          />

          <Section
            icon={<Server size={18} />}
            title="Data Storage & Security"
            content="Your data is stored on secure servers with industry-standard encryption. We implement appropriate technical and organizational measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information."
          />

          <Section
            icon={<Globe size={18} />}
            title="Third-Party Services"
            content="We may use trusted third-party services for hosting, analytics, and payment processing. These providers have access to your information only to perform specific tasks on our behalf and are obligated to protect your data."
          />

          <Section
            title="Your Rights"
            content="You have the right to access, correct, or delete your personal information. You may also object to processing, request data portability, or withdraw consent at any time. Contact us to exercise these rights."
          />

          <Section
            title="Cookies"
            content="We use cookies to enhance your experience, analyze site traffic, and understand user behavior. You can control cookie preferences through your browser settings."
          />

          <Section
            title="Contact Us"
            content="For privacy-related questions or concerns, please contact us at privacy@cubixbyte.io or through the contact form on our website."
          />
        </div>

        {/* Footer note */}
        <div
          style={{
            marginTop: 60,
            paddingTop: 32,
            borderTop: `1px solid ${T.border}`,
            fontFamily: T.mono,
            fontSize: 10,
            color: T.textSubtle,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            lineHeight: 1.8,
          }}
        >
          This privacy policy is effective as of January 1, 2025 and applies to all services offered by CubixByte. By using our services, you agree to the collection and use of information in accordance with this policy.
        </div>
      </main>
    </motion.div>
  );
}

function Section({
  icon,
  title,
  content,
}: {
  icon?: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h2
        style={{
          fontFamily: T.serif,
          fontSize: 22,
          fontWeight: 400,
          color: T.textPrimary,
          margin: "0 0 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {icon && <span style={{ color: ACCENT }}>{icon}</span>}
        {title}
      </h2>
      <p
        style={{
          fontFamily: T.sans,
          fontSize: 15,
          color: T.textSecondary,
          lineHeight: 1.8,
          margin: 0,
          fontWeight: 300,
        }}
      >
        {content}
      </p>
    </motion.section>
  );
}
