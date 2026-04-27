import { motion } from "motion/react";
import { ArrowLeft, FileText, CheckCircle, AlertCircle, Scale } from "lucide-react";
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

export function TermsOfService({ onBack }: { onBack: () => void }) {
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
            <Scale size={12} style={{ color: ACCENT }} />
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 9,
                letterSpacing: "0.2em",
                color: "#FF6B3A",
                textTransform: "uppercase",
              }}
            >
              Legal Agreement
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
            Terms of Service
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
            Effective Date: January 1, 2025
          </p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <Section
            icon={<FileText size={18} />}
            title="Acceptance of Terms"
            content="By accessing or using CubixByte's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all clients, visitors, and users of our website and services."
          />

          <Section
            icon={<CheckCircle size={18} />}
            title="Our Services"
            content="CubixByte provides software development, design, and consulting services. All projects are governed by individual Statements of Work (SOW) that define specific deliverables, timelines, and payment terms. We reserve the right to modify or discontinue services at any time."
          />

          <Section
            title="Client Obligations"
            content="Clients agree to provide accurate information, timely feedback, and necessary resources for project completion. Delays in client-provided materials may result in adjusted timelines. Clients are responsible for ensuring they have proper rights to any materials they provide to us."
          />

          <Section
            title="Intellectual Property"
            content="Upon full payment, clients receive ownership of custom code and designs specifically created for their project. We retain rights to pre-existing IP, general methodologies, and the right to showcase the work in our portfolio unless otherwise agreed in writing."
          />

          <Section
            title="Payment Terms"
            content="Payment terms are specified in individual SOWs. Generally, we require an upfront deposit before work begins, with subsequent payments tied to milestones. Late payments may result in work suspension. All fees are non-refundable once work has commenced."
          />

          <Section
            icon={<AlertCircle size={18} />}
            title="Limitation of Liability"
            content="CubixByte's liability is limited to the amount paid for services in the 12 months preceding any claim. We are not liable for indirect, incidental, or consequential damages. We do not warrant that our services will be uninterrupted or error-free."
          />

          <Section
            title="Confidentiality"
            content="Both parties agree to protect confidential information shared during the engagement. We maintain strict confidentiality of client data and business information. Clients agree not to disclose our proprietary methodologies and pricing."
          />

          <Section
            title="Termination"
            content="Either party may terminate the agreement with 30 days written notice. Upon termination, client is responsible for payment for all work completed up to that point. We will deliver all completed work and transfer any applicable rights upon final payment."
          />

          <Section
            title="Governing Law"
            content="These terms are governed by the laws of [Jurisdiction]. Any disputes will be resolved through binding arbitration in accordance with local arbitration rules."
          />

          <Section
            title="Changes to Terms"
            content="We may modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services after changes constitutes acceptance of the new terms."
          />

          <Section
            title="Contact"
            content="For questions about these terms, please contact legal@cubixbyte.io."
          />
        </div>

        <div
          style={{
            marginTop: 60,
            padding: 24,
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 12,
            fontFamily: T.mono,
            fontSize: 10,
            color: T.textSubtle,
            letterSpacing: "0.08em",
            lineHeight: 1.8,
          }}
        >
          By using CubixByte's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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
