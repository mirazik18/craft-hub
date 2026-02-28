import { Link } from "react-router-dom";

const OLIVE = "#9B9B3C";
const OLIVE_DARK = "#6B6B28";
const OLIVE_PALE = "#F0F0E0";
const CREAM = "#FDF8F0";
const WARM_LIGHT = "#A89888";

const patterns = [
  {
    path: "/knitting/gloves",
    title: "Gentle Fingerless Gloves",
    emoji: "🧤",
    description:
      "In the round · magic loop · 45 cast on · 44 sts · 25 rounds ribbing",
    difficulty: "Beginner+",
  },
  // Add more knitting patterns here:
  // {
  //   path: "/knitting/beanie",
  //   title: "Cozy Ribbed Beanie",
  //   emoji: "🧢",
  //   description: "...",
  //   difficulty: "Beginner",
  // },
];

export default function KnittingHome() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: CREAM,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${OLIVE_PALE}, white)`,
          padding: "32px 20px 24px",
          textAlign: "center",
          borderBottom: `2px solid ${OLIVE_PALE}`,
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: "12px",
            color: WARM_LIGHT,
            textDecoration: "none",
            display: "inline-block",
            marginBottom: "12px",
          }}
        >
          ← Back to Craft Hub
        </Link>
        <h1
          style={{
            margin: 0,
            fontSize: "26px",
            color: OLIVE_DARK,
            fontWeight: 700,
          }}
        >
          🧶 Knitting Patterns
        </h1>
        <p
          style={{
            margin: "6px 0 0",
            fontSize: "14px",
            color: WARM_LIGHT,
          }}
        >
          Interactive step-by-step guides
        </p>
      </div>

      {/* Pattern grid */}
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "28px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {patterns.map((p) => (
          <Link
            key={p.path}
            to={p.path}
            style={{
              textDecoration: "none",
              background: "white",
              borderRadius: "14px",
              padding: "22px 20px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              border: `1.5px solid ${OLIVE_PALE}`,
              display: "flex",
              alignItems: "center",
              gap: "16px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = OLIVE;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = OLIVE_PALE;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.06)";
            }}
          >
            <span style={{ fontSize: "36px" }}>{p.emoji}</span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: OLIVE_DARK,
                  }}
                >
                  {p.title}
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    color: OLIVE,
                    background: OLIVE_PALE,
                    padding: "2px 8px",
                    borderRadius: "8px",
                    fontWeight: 600,
                  }}
                >
                  {p.difficulty}
                </span>
              </div>
              <span
                style={{ fontSize: "13px", color: WARM_LIGHT, lineHeight: 1.4 }}
              >
                {p.description}
              </span>
            </div>
            <span style={{ color: OLIVE, fontSize: "20px" }}>→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
