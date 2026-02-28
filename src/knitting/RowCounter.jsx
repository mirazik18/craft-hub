import { useState, useEffect, useCallback, useRef } from "react";

const OLIVE = "#9B9B3C";
const OLIVE_LIGHT = "#D4D4A0";
const OLIVE_PALE = "#F0F0E0";
const OLIVE_DARK = "#6B6B28";
const OLIVE_MID = "#B5B560";
const CREAM = "#FDF8F0";
const WARM = "#6B5E50";
const WARM_LIGHT = "#A89888";

/**
 * Persistent, draggable row counter widget.
 * Each project gets its own localStorage key: `rowCounter_${projectKey}`
 * Position is also persisted per project: `rowCounterPos_${projectKey}`
 */
export default function RowCounter({ projectKey, max = 999 }) {
  const storageKey = `rowCounter_${projectKey}`;
  const posKey = `rowCounterPos_${projectKey}`;

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

  const [pos, setPos] = useState(() => {
    try {
      const saved = localStorage.getItem(posKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === "number" && typeof parsed.y === "number") {
          return parsed;
        }
      }
    } catch {}
    return { x: window.innerWidth - 180, y: window.innerHeight - 300 };
  });

  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const containerRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, String(count));
    } catch {}
  }, [count, storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(posKey, JSON.stringify(pos));
    } catch {}
  }, [pos, posKey]);

  const clampPos = useCallback((x, y) => {
    const w = minimized ? 48 : 160;
    const h = minimized ? 48 : 240;
    return {
      x: Math.max(0, Math.min(x, window.innerWidth - w)),
      y: Math.max(0, Math.min(y, window.innerHeight - h)),
    };
  }, [minimized]);

  const handlePointerDown = useCallback((e) => {
    // don't drag from buttons
    if (e.target.closest("button")) return;
    dragging.current = true;
    hasMoved.current = false;
    const rect = containerRef.current.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!dragging.current) return;
    hasMoved.current = true;
    const x = e.clientX - dragOffset.current.x;
    const y = e.clientY - dragOffset.current.y;
    setPos(clampPos(x, y));
  }, [clampPos]);

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

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
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={() => {
          if (!hasMoved.current) setMinimized(false);
        }}
        style={{
          position: "fixed",
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          zIndex: 1000,
          background: OLIVE,
          color: "white",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "grab",
          boxShadow: "0 3px 12px rgba(0,0,0,0.2)",
          fontSize: "14px",
          fontWeight: 700,
          userSelect: "none",
          touchAction: "none",
          transition: dragging.current ? "none" : "box-shadow 0.2s",
        }}
        title="Open row counter"
      >
        {count}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        position: "fixed",
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        zIndex: 1000,
        background: "white",
        borderRadius: "18px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)",
        border: `1.5px solid ${OLIVE_LIGHT}`,
        width: "160px",
        overflow: "hidden",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      {/* Title bar — drag handle */}
      <div
        style={{
          background: `linear-gradient(135deg, ${OLIVE_PALE}, white)`,
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${OLIVE_PALE}`,
          cursor: "grab",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: OLIVE_DARK,
            letterSpacing: "0.3px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span style={{ color: WARM_LIGHT, fontSize: "10px", letterSpacing: "1px" }}>⠿</span>
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
