import { motion } from "motion/react";
import { ArrowLeft, FileSignature, Download, Shield, Lock, EyeOff } from "lucide-react";
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

export function NDATemplate({ onBack }: { onBack: () => void }) {
  const { isMobile } = useBreakpoint();

  const handleDownload = () => {
    const ndaContent = generateNDAContent();
    const blob = new Blob([ndaContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "CubixByte_NDA_Template.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
            <EyeOff size={12} style={{ color: ACCENT }} />
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 9,
                letterSpacing: "0.2em",
                color: "#FF6B3A",
                textTransform: "uppercase",
              }}
            >
              Confidentiality Agreement
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
            NDA Template
          </h1>
          <p
            style={{
              fontFamily: T.sans,
              fontSize: 16,
              color: T.textMuted,
              lineHeight: 1.7,
              margin: "0 0 32px",
              fontWeight: 300,
            }}
          >
            Use this template for mutual non-disclosure agreements. Download and customize for your needs.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 24px",
              background: ACCENT,
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontFamily: T.mono,
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(255,69,0,0.35)",
            }}
          >
            <Download size={16} />
            Download Template
          </motion.button>
        </motion.div>

        {/* Info Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 20,
            marginBottom: 48,
          }}
        >
          <InfoCard
            icon={<Shield size={20} />}
            title="Mutual Protection"
            description="This NDA protects both parties' confidential information shared during discussions or project engagement."
          />
          <InfoCard
            icon={<Lock size={20} />}
            title="Standard Terms"
            description="Includes standard confidentiality terms, return of materials, and survival clauses."
          />
          <InfoCard
            icon={<FileSignature size={20} />}
            title="Ready to Sign"
            description="Template is ready for review by your legal team and can be executed digitally or in print."
          />
          <InfoCard
            icon={<EyeOff size={20} />}
            title="2-Year Term"
            description="Confidentiality obligations remain in effect for 2 years from the date of disclosure."
          />
        </div>

        {/* NDA Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: "rgba(12,12,10,0.98)",
            border: `1px solid ${T.border}`,
            borderRadius: 12,
            padding: isMobile ? "24px 20px" : "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
              paddingBottom: 20,
              borderBottom: `1px solid ${T.border}`,
            }}
          >
            <FileSignature size={20} style={{ color: ACCENT }} />
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 11,
                letterSpacing: "0.15em",
                color: T.textPrimary,
                textTransform: "uppercase",
              }}
            >
              Template Preview
            </span>
          </div>

          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 12,
              lineHeight: 1.8,
              color: T.textSecondary,
              whiteSpace: "pre-wrap",
              overflow: "auto",
              maxHeight: 400,
              paddingRight: 16,
            }}
          >
            {generateNDAContent()}
          </div>
        </motion.div>

        <div
          style={{
            marginTop: 40,
            padding: 20,
            background: "rgba(255,69,0,0.05)",
            border: `1px solid rgba(255,69,0,0.15)`,
            borderRadius: 10,
            fontFamily: T.sans,
            fontSize: 13,
            color: T.textMuted,
            lineHeight: 1.7,
          }}
        >
          <strong style={{ color: ACCENT }}>Disclaimer:</strong> This template is provided for convenience and does not constitute legal advice. We recommend having this reviewed by your legal counsel before execution.
        </div>
      </main>
    </motion.div>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      style={{
        padding: 24,
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 10,
      }}
    >
      <div style={{ color: ACCENT, marginBottom: 12 }}>{icon}</div>
      <h3
        style={{
          fontFamily: T.serif,
          fontSize: 18,
          fontWeight: 400,
          color: T.textPrimary,
          margin: "0 0 8px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: T.sans,
          fontSize: 13,
          color: T.textMuted,
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}

function generateNDAContent(): string {
  return `MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement (the "Agreement") is entered into as of ___________ (the "Effective Date") by and between:

CubixByte ("Disclosing Party")
and
_____________ ("Receiving Party")
(collectively, the "Parties")


1. PURPOSE

The Parties wish to explore a potential business relationship (the "Purpose"). In connection with this Purpose, each Party may disclose certain confidential and proprietary information to the other Party.


2. DEFINITION OF CONFIDENTIAL INFORMATION

"Confidential Information" means any and all non-public, confidential, or proprietary information disclosed by either Party, whether in oral, written, electronic, or other form, including but not limited to:
- Technical information (software code, algorithms, architectures)
- Business information (strategies, financial data, customer lists)
- Product information (designs, specifications, roadmaps)
- Any information marked as "Confidential" or "Proprietary"


3. OBLIGATIONS OF RECEIVING PARTY

The Receiving Party agrees to:
(a) Maintain all Confidential Information in strict confidence
(b) Not disclose Confidential Information to any third parties
(c) Use Confidential Information solely for the Purpose
(d) Protect Confidential Information with the same degree of care used for its own confidential information
(e) Limit access to employees and contractors with a need to know


4. EXCLUSIONS

Confidential Information does not include information that:
(a) Is or becomes publicly available through no breach of this Agreement
(b) Was rightfully known prior to disclosure
(c) Is rightfully received from a third party without restriction
(d) Is independently developed without use of the Confidential Information
(e) Is required to be disclosed by law or court order (with prompt notice)


5. TERM

This Agreement shall remain in effect for a period of 2 years from the Effective Date. The obligations of confidentiality shall survive termination for a period of 2 years.


6. RETURN OF MATERIALS

Upon request, the Receiving Party shall promptly return or destroy all materials containing Confidential Information.


7. NO LICENSE

Nothing in this Agreement grants any license to patents, copyrights, trademarks, or other intellectual property rights.


8. GENERAL

This Agreement constitutes the entire understanding between the Parties. It may not be modified except in writing signed by both Parties. This Agreement shall be governed by the laws of [Jurisdiction].


IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.


CUBIXBYTE                          RECEIVING PARTY


Signature: _____________________    Signature: _____________________

Name: __________________________    Name: __________________________

Title: __________________________    Title: __________________________

Date: __________________________    Date: __________________________
`;
}
