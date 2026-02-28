import { Link } from "react-router-dom";

const sites = [
  {
    path: "/knitting",
    title: "Knitting Patterns",
    emoji: "🧶",
    description: "Step-by-step knitting guides with interactive progress tracking",
    color: "#9B9B3C",
    bg: "#F0F0E0",
  },
  // Add more sites here as you build them:
  // {
  //   path: "/crochet",
  //   title: "Crochet Patterns",
  //   emoji: "🪝",
  //   description: "...",
  //   color: "#7B5EA7",
  //   bg: "#F0E8F5",
  // },
];

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #faf9f6 0%, #f0ede8 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 20px",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: 700,
          color: "#3a3530",
          marginBottom: "8px",
          letterSpacing: "-0.5px",
        }}
      >
        Craft Hub
      </h1>
      <p
        style={{
          fontSize: "15px",
          color: "#8a8078",
          marginBottom: "48px",
        }}
      >
        Pick a craft to explore
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {sites.map((site) => (
          <Link
            key={site.path}
            to={site.path}
            style={{
              textDecoration: "none",
              background: "white",
              borderRadius: "16px",
              padding: "28px 24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              border: `2px solid ${site.bg}`,
              transition: "all 0.2s ease",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
              e.currentTarget.style.borderColor = site.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
              e.currentTarget.style.borderColor = site.bg;
            }}
          >
            <span style={{ fontSize: "36px" }}>{site.emoji}</span>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: site.color,
              }}
            >
              {site.title}
            </span>
            <span style={{ fontSize: "13px", color: "#8a8078", lineHeight: 1.5 }}>
              {site.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
