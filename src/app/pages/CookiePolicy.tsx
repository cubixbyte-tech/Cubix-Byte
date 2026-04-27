import { motion } from "motion/react";
import { ArrowLeft, Cookie, Settings, Info, Check } from "lucide-react";
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

const COOKIE_TYPES = [
  {
    name: "Essential Cookies",
    required: true,
    description: "Necessary for the website to function properly. These cannot be disabled.",
    examples: ["Session cookies", "Security cookies", "Load balancing"],
  },
  {
    name: "Analytics Cookies",
    required: false,
    description: "Help us understand how visitors interact with our website.",
    examples: ["Google Analytics", "Page view tracking", "Referrer data"],
  },
  {
    name: "Functional Cookies",
    required: false,
    description: "Enable enhanced functionality and personalization.",
    examples: ["Language preferences", "Form auto-fill", "Theme settings"],
  },
  {
    name: "Marketing Cookies",
    required: false,
    description: "Used to deliver relevant advertisements and track campaign performance.",
    examples: ["Ad conversion tracking", "Retargeting", "Social media pixels"],
  },
];

export function CookiePolicy({ onBack }: { onBack: () => void }) {
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
              transition: "color 0.2s, background 0.2s",
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
            <Cookie size={12} style={{ color: ACCENT }} />
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 9,
                letterSpacing: "0.2em",
                color: "#FF6B3A",
                textTransform: "uppercase",
              }}
            >
              Cookie Settings
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
            Cookie Policy
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

        {/* Overview */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 48 }}
        >
          <div
            style={{
              padding: 24,
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            <div style={{ color: ACCENT, flexShrink: 0, marginTop: 2 }}>
              <Info size={20} />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: T.serif,
                  fontSize: 20,
                  fontWeight: 400,
                  color: T.textPrimary,
                  margin: "0 0 10px",
                }}
              >
                What Are Cookies?
              </h2>
              <p
                style={{
                  fontFamily: T.sans,
                  fontSize: 14,
                  color: T.textSecondary,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Cookies are small text files stored on your device when you visit a website. 
                They help us provide you with a better experience by remembering your preferences, 
                understanding how you use our site, and enabling certain functionality.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Cookie Types */}
        <div style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: T.serif,
              fontSize: 28,
              fontWeight: 300,
              color: T.textPrimary,
              margin: "0 0 32px",
              letterSpacing: "-0.01em",
            }}
          >
            Types of Cookies We Use
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {COOKIE_TYPES.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{
                  padding: 24,
                  background: "rgba(12,12,10,0.98)",
                  border: `1px solid ${T.border}`,
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: T.serif,
                      fontSize: 18,
                      fontWeight: 400,
                      color: T.textPrimary,
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Settings size={16} style={{ color: ACCENT }} />
                    {type.name}
                  </h3>
                  {type.required ? (
                    <span
                      style={{
                        padding: "4px 10px",
                        background: "rgba(255,69,0,0.15)",
                        border: `1px solid rgba(255,69,0,0.3)`,
                        borderRadius: 100,
                        fontFamily: T.mono,
                        fontSize: 8,
                        letterSpacing: "0.15em",
                        color: ACCENT,
                        textTransform: "uppercase",
                      }}
                    >
                      Required
                    </span>
                  ) : (
                    <span
                      style={{
                        padding: "4px 10px",
                        background: T.surface,
                        border: `1px solid ${T.border}`,
                        borderRadius: 100,
                        fontFamily: T.mono,
                        fontSize: 8,
                        letterSpacing: "0.15em",
                        color: T.textMuted,
                        textTransform: "uppercase",
                      }}
                    >
                      Optional
                    </span>
                  )}
                </div>

                <p
                  style={{
                    fontFamily: T.sans,
                    fontSize: 14,
                    color: T.textSecondary,
                    lineHeight: 1.7,
                    margin: "0 0 16px",
                  }}
                >
                  {type.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {type.examples.map((example) => (
                    <span
                      key={example}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "5px 10px",
                        background: T.surface,
                        border: `1px solid ${T.borderLight}`,
                        borderRadius: 4,
                        fontFamily: T.mono,
                        fontSize: 9,
                        letterSpacing: "0.1em",
                        color: T.textMuted,
                      }}
                    >
                      <Check size={10} />
                      {example}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Managing Cookies */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: 48 }}
        >
          <h2
            style={{
              fontFamily: T.serif,
              fontSize: 28,
              fontWeight: 300,
              color: T.textPrimary,
              margin: "0 0 24px",
              letterSpacing: "-0.01em",
            }}
          >
            Managing Your Cookie Preferences
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p
              style={{
                fontFamily: T.sans,
                fontSize: 15,
                color: T.textSecondary,
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              You can control and manage cookies in various ways. Please note that removing or blocking 
              cookies may impact your user experience and some functionality may no longer be available.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 16,
              }}
            >
              <div
                style={{
                  padding: 20,
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                }}
              >
                <h4
                  style={{
                    fontFamily: T.mono,
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    color: T.textPrimary,
                    textTransform: "uppercase",
                    margin: "0 0 12px",
                  }}
                >
                  Browser Settings
                </h4>
                <p
                  style={{
                    fontFamily: T.sans,
                    fontSize: 13,
                    color: T.textMuted,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Most browsers allow you to view, manage, delete, and block cookies for specific websites.
                </p>
              </div>

              <div
                style={{
                  padding: 20,
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                }}
              >
                <h4
                  style={{
                    fontFamily: T.mono,
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    color: T.textPrimary,
                    textTransform: "uppercase",
                    margin: "0 0 12px",
                  }}
                >
                  Third-Party Tools
                </h4>
                <p
                  style={{
                    fontFamily: T.sans,
                    fontSize: 13,
                    color: T.textMuted,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  Various browser extensions and privacy tools can help manage cookies across websites.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Updates */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: 40,
            padding: 24,
            background: "rgba(255,69,0,0.05)",
            border: `1px solid rgba(255,69,0,0.15)`,
            borderRadius: 10,
          }}
        >
          <h4
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              letterSpacing: "0.15em",
              color: ACCENT,
              textTransform: "uppercase",
              margin: "0 0 12px",
            }}
          >
            Policy Updates
          </h4>
          <p
            style={{
              fontFamily: T.sans,
              fontSize: 13,
              color: T.textSecondary,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            We may update this Cookie Policy from time to time to reflect changes in technology, 
            regulation, or our business practices. Any changes will be posted on this page with 
            an updated revision date.
          </p>
        </motion.div>

        {/* Contact */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: `1px solid ${T.border}`,
            fontFamily: T.mono,
            fontSize: 11,
            color: T.textSubtle,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            lineHeight: 1.8,
          }}
        >
          Questions about cookies? Contact us at privacy@cubixbyte.io
        </div>
      </main>
    </motion.div>
  );
}
