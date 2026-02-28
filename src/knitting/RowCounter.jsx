import { useState, useEffect, useCallback } from "react";

const OLIVE = "#9B9B3C";
const OLIVE_LIGHT = "#D4D4A0";
const OLIVE_PALE = "#F0F0E0";
const OLIVE_DARK = "#6B6B28";
const OLIVE_MID = "#B5B560";
const CREAM = "#FDF8F0";
const WARM = "#6B5E50";
const WARM_LIGHT = "#A89888";

/**
 * Persistent row counter widget.
 * Each project gets its own localStorage key: `rowCounter_${projectKey}`
 *
 * @param {string} projectKey - unique key like "gloves", "beanie", etc.
 * @param {number} max - maximum row count (default 999)
 */
export default function RowCounter({ projectKey, max = 999 }) {
  const storageKey = `rowCounter_${projectKey}`;

  const [count, setCount] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      const parsed = saved !== null ? parseInt(saved, 10) : 0;
      return isNaN(parsed) ? 0 : Math.min(Math.max(parsed, 0), max);
    } catch {
      return 0;
    }
  });

  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, String(count));
    } catch {
      // storage full or unavailable — no-op
    }
  }, [count, storageKey]);

  const increment = useCallback(() => {
    setCount((c) => Math.min(c + 1, max));
  }, [max]);

  const decrement = useCallback(() => {
    setCount((c) => Math.max(c - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  if (minimized) {
    return (
      <div
        onClick={() => setMinimized(false)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          background: OLIVE,
          color: "white",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 3px 12px rgba(0,0,0,0.2)",
          fontSize: "14px",
          fontWeight: 700,
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        title="Open row counter"
      >
        {count}
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        background: "white",
        borderRadius: "18px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)",
        border: `1.5px solid ${OLIVE_LIGHT}`,
        width: "160px",
        overflow: "hidden",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: `linear-gradient(135deg, ${OLIVE_PALE}, white)`,
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${OLIVE_PALE}`,
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: OLIVE_DARK,
            letterSpacing: "0.3px",
          }}
        >
          🧶 Row Counter
        </span>
        <button
          onClick={() => setMinimized(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            color: WARM_LIGHT,
            padding: "0 2px",
            lineHeight: 1,
          }}
          title="Minimize"
        >
          −
        </button>
      </div>

      {/* Counter display */}
      <div style={{ padding: "14px 12px 10px", textAlign: "center" }}>
        <div
          style={{
            fontSize: "42px",
            fontWeight: 700,
            color: OLIVE_DARK,
            lineHeight: 1,
            marginBottom: "4px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {count}
        </div>
        <div
          style={{
            fontSize: "10px",
            color: WARM_LIGHT,
            marginBottom: "12px",
          }}
        >
          of {max} max
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            justifyContent: "center",
            marginBottom: "8px",
          }}
        >
          <button
            onClick={decrement}
            disabled={count === 0}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              border: `1.5px solid ${OLIVE_LIGHT}`,
              background: "white",
              color: count === 0 ? "#ddd" : OLIVE_DARK,
              fontSize: "20px",
              fontWeight: 600,
              cursor: count === 0 ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
            }}
          >
            −
          </button>
          <button
            onClick={increment}
            disabled={count >= max}
            style={{
              width: "64px",
              height: "40px",
              borderRadius: "12px",
              border: "none",
              background: count >= max ? OLIVE_LIGHT : OLIVE,
              color: "white",
              fontSize: "20px",
              fontWeight: 600,
              cursor: count >= max ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
            }}
          >
            +
          </button>
        </div>

        {/* Reset */}
        <button
          onClick={reset}
          style={{
            background: "none",
            border: "none",
            color: WARM_LIGHT,
            fontSize: "10px",
            cursor: "pointer",
            padding: "2px 8px",
          }}
        >
          ↺ reset
        </button>
      </div>
    </div>
  );
}
