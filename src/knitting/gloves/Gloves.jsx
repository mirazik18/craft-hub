import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RowCounter from "../RowCounter.jsx";

const OLIVE = "#9B9B3C";
const OLIVE_LIGHT = "#D4D4A0";
const OLIVE_PALE = "#F0F0E0";
const OLIVE_DARK = "#6B6B28";
const OLIVE_MID = "#B5B560";
const CREAM = "#FDF8F0";
const WARM = "#6B5E50";
const WARM_LIGHT = "#A89888";
const WOOD = "#C4A882";

const YarnBall = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60">
    <circle cx="30" cy="30" r="26" fill={OLIVE} opacity="0.2" />
    <circle cx="30" cy="30" r="20" fill={OLIVE} opacity="0.35" />
    <circle cx="30" cy="30" r="14" fill={OLIVE} opacity="0.55" />
    <path d="M16 30 Q22 20 30 22 Q38 24 36 32 Q34 40 26 38 Q18 36 20 28" stroke={OLIVE_DARK} fill="none" strokeWidth="1.5" />
    <path d="M24 18 Q30 14 36 20" stroke={OLIVE_DARK} fill="none" strokeWidth="1.5" />
    <path d="M38 26 Q44 32 38 38" stroke={OLIVE_DARK} fill="none" strokeWidth="1.5" />
    <path d="M36 12 Q42 8 48 14" stroke={OLIVE} fill="none" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Needle = ({ size = 40 }) => (
  <svg width={size} height={size * 2.5} viewBox="0 0 20 50">
    <line x1="10" y1="5" x2="10" y2="45" stroke={WARM_LIGHT} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="10" cy="5" r="3" fill={OLIVE} />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <circle cx="9" cy="9" r="8" fill={OLIVE} />
    <path d="M5 9 L8 12 L13 6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <circle cx="9" cy="9" r="8" fill="none" stroke={OLIVE_MID} strokeWidth="1.5" />
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path d="M6 3 L12 9 L6 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path d="M12 3 L6 9 L12 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StitchDiagram = ({ type }) => {
  if (type === "caston") return (
    <svg width="200" height="80" viewBox="0 0 200 80">
      {Array.from({ length: 10 }).map((_, i) => (
        <g key={i}>
          <line x1={20 + i * 18} y1="20" x2={20 + i * 18} y2="60" stroke={WARM_LIGHT} strokeWidth="2" />
          <path d={`M${12 + i * 18} 50 Q${20 + i * 18} 35 ${28 + i * 18} 50`} stroke={OLIVE} fill="none" strokeWidth="2.5" />
        </g>
      ))}
      <text x="100" y="75" textAnchor="middle" fontSize="10" fill={WARM_LIGHT}>45 cast on · 44 after join</text>
    </svg>
  );
  if (type === "ribbing") return (
    <svg width="220" height="100" viewBox="0 0 220 100">
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i}>
          <rect x={18 + i * 24} y="10" width="10" height="65" rx="2" fill={i % 2 === 0 ? OLIVE : OLIVE_LIGHT} opacity="0.8" />
          <text x={23 + i * 24} y="85" textAnchor="middle" fontSize="8" fill={WARM}>{i % 2 === 0 ? "K" : "P"}</text>
        </g>
      ))}
      <text x="110" y="98" textAnchor="middle" fontSize="10" fill={WARM_LIGHT}>k1, p1 repeat · 25 rounds</text>
    </svg>
  );
  if (type === "stockinette") return (
    <svg width="200" height="90" viewBox="0 0 200 90">
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => (
          <path key={`${row}-${col}`} d={`M${10 + col * 24} ${15 + row * 15} Q${16 + col * 24} ${8 + row * 15} ${22 + col * 24} ${15 + row * 15} Q${16 + col * 24} ${22 + row * 15} ${10 + col * 24} ${15 + row * 15}`} stroke={OLIVE} fill={OLIVE_PALE} strokeWidth="1" opacity="0.8" />
        ))
      )}
      <text x="100" y="88" textAnchor="middle" fontSize="10" fill={WARM_LIGHT}>knit every round</text>
    </svg>
  );
  if (type === "gusset") return (
    <svg width="220" height="120" viewBox="0 0 220 120">
      <rect x="20" y="10" width="180" height="100" rx="6" fill={OLIVE_PALE} />
      <line x1="20" y1="60" x2="80" y2="60" stroke={OLIVE_MID} strokeWidth="2" />
      <line x1="140" y1="60" x2="200" y2="60" stroke={OLIVE_MID} strokeWidth="2" />
      <path d="M80 60 L90 30 L130 30 L140 60 L130 90 L90 90 Z" fill={OLIVE} opacity="0.25" stroke={OLIVE_DARK} strokeWidth="1.5" />
      <text x="110" y="55" textAnchor="middle" fontSize="9" fill={OLIVE_DARK}>thumb</text>
      <text x="110" y="67" textAnchor="middle" fontSize="9" fill={OLIVE_DARK}>gusset</text>
      <text x="75" y="35" textAnchor="middle" fontSize="8" fill={WARM}>M1L</text>
      <text x="145" y="35" textAnchor="middle" fontSize="8" fill={WARM}>M1R</text>
    </svg>
  );
  if (type === "thumbsep") return (
    <svg width="220" height="120" viewBox="0 0 220 120">
      <rect x="20" y="30" width="70" height="60" rx="6" fill={OLIVE_LIGHT} />
      <rect x="130" y="30" width="70" height="60" rx="6" fill={OLIVE_LIGHT} />
      <rect x="95" y="10" width="30" height="100" rx="6" fill={OLIVE} opacity="0.3" stroke={OLIVE_DARK} strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="55" y="65" textAnchor="middle" fontSize="9" fill={OLIVE_DARK}>22 sts</text>
      <text x="165" y="65" textAnchor="middle" fontSize="9" fill={OLIVE_DARK}>22 sts</text>
      <text x="110" y="55" textAnchor="middle" fontSize="8" fill={WARM}>13 sts</text>
      <text x="110" y="67" textAnchor="middle" fontSize="8" fill={WARM}>on hold</text>
      <path d="M110 95 L110 115" stroke={OLIVE_DARK} strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="110" y="118" textAnchor="middle" fontSize="7" fill={WARM_LIGHT}>knit later</text>
    </svg>
  );
  if (type === "thumb") return (
    <svg width="200" height="130" viewBox="0 0 200 130">
      <rect x="50" y="10" width="100" height="105" rx="50" fill={OLIVE_PALE} />
      <rect x="70" y="20" width="60" height="80" rx="30" fill={OLIVE} opacity="0.25" stroke={OLIVE_DARK} strokeWidth="1.5" />
      <text x="100" y="55" textAnchor="middle" fontSize="9" fill={OLIVE_DARK}>15-16 sts</text>
      <text x="100" y="68" textAnchor="middle" fontSize="9" fill={OLIVE_DARK}>in the round</text>
      <path d="M100 100 L100 118" stroke={OLIVE_DARK} strokeWidth="1.5" />
      <text x="100" y="126" textAnchor="middle" fontSize="8" fill={WARM}>knit longer · try on as you go</text>
    </svg>
  );
  if (type === "finish") return (
    <svg width="160" height="130" viewBox="0 0 160 130">
      <rect x="30" y="50" width="100" height="70" rx="4" fill={OLIVE_LIGHT} />
      <rect x="30" y="35" width="100" height="25" rx="4" fill={OLIVE} opacity="0.4" />
      <rect x="75" y="10" width="30" height="60" rx="4" fill={OLIVE_LIGHT} stroke={OLIVE} strokeWidth="1" />
      <text x="80" y="8" textAnchor="middle" fontSize="8" fill={WARM}>thumb</text>
      <text x="80" y="90" textAnchor="middle" fontSize="9" fill={OLIVE_DARK}>weave in ends</text>
      <circle cx="45" cy="108" r="2" fill={OLIVE_DARK} />
      <circle cx="55" cy="103" r="2" fill={OLIVE_DARK} />
      <circle cx="105" cy="110" r="2" fill={OLIVE_DARK} />
    </svg>
  );
  return null;
};

const GloveProgress = ({ step }) => {
  const h = 260, w = 120;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {/* Long ribbed cuff */}
      <rect x="25" y="155" width="70" height="95" rx="4" fill={step >= 1 ? OLIVE_LIGHT : "#eee"} stroke={step === 1 ? OLIVE_DARK : step >= 1 ? OLIVE_MID : "#ddd"} strokeWidth={step === 1 ? 2.5 : 1.5} />
      {step >= 1 && <>
        {Array.from({length: 12}).map((_, i) => (
          <line key={i} x1="30" y1={160 + i * 7} x2="90" y2={160 + i * 7} stroke={OLIVE} opacity="0.2" strokeWidth="0.5" />
        ))}
        <text x="60" y="207" textAnchor="middle" fontSize="8" fill={OLIVE_DARK}>ribbing</text>
      </>}
      {/* Body */}
      <rect x="20" y="75" width="80" height="82" rx="4" fill={step >= 3 ? OLIVE_LIGHT : step >= 2 ? OLIVE_PALE : "#eee"} stroke={step === 2 || step === 3 ? OLIVE_DARK : step >= 2 ? OLIVE_MID : "#ddd"} strokeWidth={step === 2 || step === 3 ? 2.5 : 1.5} />
      {step >= 2 && <text x="60" y="120" textAnchor="middle" fontSize="8" fill={OLIVE_DARK}>body</text>}
      {/* Longer thumb */}
      <rect x="85" y="35" width="28" height="65" rx="4" fill={step >= 5 ? OLIVE : step >= 4 ? OLIVE_PALE : "#eee"} stroke={step === 4 || step === 5 ? OLIVE_DARK : step >= 4 ? OLIVE_MID : "#ddd"} strokeWidth={step === 4 || step === 5 ? 2.5 : 1.5} />
      {step >= 4 && <text x="99" y="72" textAnchor="middle" fontSize="7" fill={step >= 5 ? "white" : OLIVE_DARK}>thumb</text>}
      {/* Fingers edge */}
      {step >= 6 && <>
        <path d="M20 75 L20 68 Q20 62 26 62 L38 62 Q42 62 42 68 L42 75" fill={OLIVE_LIGHT} stroke={OLIVE_MID} strokeWidth="1" />
        <path d="M42 75 L42 58 Q42 52 48 52 L58 52 Q62 52 62 58 L62 75" fill={OLIVE_LIGHT} stroke={OLIVE_MID} strokeWidth="1" />
        <path d="M62 75 L62 60 Q62 54 68 54 L78 54 Q82 54 82 60 L82 75" fill={OLIVE_LIGHT} stroke={OLIVE_MID} strokeWidth="1" />
      </>}
      {step >= 6 && <>
        <circle cx="50" cy="45" r="3" fill={OLIVE_DARK} opacity="0.2" />
        <text x="60" y="28" textAnchor="middle" fontSize="7" fill={OLIVE_DARK}>done!</text>
      </>}
    </svg>
  );
};

const steps = [
  {
    id: 0,
    title: "Materials",
    icon: "\u{1F9F6}",
    diagram: null,
    content: [
      { label: "Needles", value: "US 4 (3.5mm) \u2014 magic loop" },
      { label: "Yarn", value: "Sport weight, olive green, ~30g/pair" },
      { label: "Notions", value: "3 stitch markers, tapestry needle, scrap yarn" },
      { label: "Stitches", value: "45 cast on \u00b7 44 after join \u00b7 22 per needle" },
    ],
    instructions: null,
    note: "3 markers: 1 for start of round, 2 for thumb gusset. Keep scrap yarn handy for holding thumb stitches later."
  },
  {
    id: 1,
    title: "Cast On & Long Cuff",
    icon: "\u2728",
    diagram: "ribbing",
    content: null,
    instructions: [
      "Cast on 45 stitches.",
      "Join in the round \u2014 don\u2019t twist!",
      "Decrease 1 stitch as you join (k2tog) \u2014 now 44 stitches.",
      "Place start-of-round marker.",
      "Work 1x1 rib: *k1, p1* around.",
      "Repeat for 25 rounds of ribbing.",
    ],
    note: "Cast on 45, then decrease 1 when joining to get an even 44. This avoids a gap at the join. 25 rounds of ribbing gives a nice snug cuff!"
  },
  {
    id: 2,
    title: "Body Start",
    icon: "\u{1F33F}",
    diagram: "stockinette",
    content: null,
    instructions: [
      "Knit 2 plain rounds (all knit stitches).",
      "That\u2019s it \u2014 just 2 easy rounds before the gusset.",
    ],
    note: "Stockinette in the round = knit every round. No purling needed!"
  },
  {
    id: 3,
    title: "Thumb Gusset",
    icon: "\u{1F446}",
    diagram: "gusset",
    content: null,
    instructions: null,
    gussetRounds: true,
    note: "M1L = pick up the bar from front to back, knit through the back loop (leans left). M1R = pick up the bar from back to front, knit through the front loop (leans right). This creates neat, mirrored increases. Check off each round as you go!"
  },
  {
    id: 4,
    title: "Separate Thumb",
    icon: "\u2702\uFE0F",
    diagram: "thumbsep",
    content: null,
    instructions: [
      "Knit to first thumb marker. Remove it.",
      "Slip 13 thumb stitches onto scrap yarn.",
      "Remove second thumb marker.",
      "Cast on 1\u20132 stitches over the gap.",
      "Knit to end of round.",
      "You now have ~44 stitches for the hand.",
    ],
    note: "Pull yarn snug when casting on over the gap \u2014 this prevents a hole at the thumb join."
  },
  {
    id: 5,
    title: "Knit the Thumb",
    icon: "\u{1FAF0}",
    diagram: "thumb",
    content: null,
    instructions: [
      "Put 13 held stitches back on needle.",
      "Pick up 2\u20133 stitches from cast-on edge above gap.",
      "Join in the round (15\u201316 sts total).",
      "Knit around until thumb reaches desired length.",
      "Keep going \u2014 your thumb should be longer than usual!",
      "Finish with 4\u20136 rounds of 1x1 rib to match the cuff.",
      "Bind off loosely in rib pattern.",
    ],
    note: "Try the glove on! Your thumb should cover most of the thumb \u2014 knit it tall and finish with a ribbed edge for a polished look."
  },
  {
    id: 6,
    title: "Hand & Finish",
    icon: "\u{1F389}",
    diagram: "finish",
    content: null,
    instructions: [
      "Knit the hand in the round above the thumb.",
      "Continue until desired length (just past the knuckles).",
      "Bind off loosely.",
      "Close any small gaps at thumb corners.",
      "Weave in all ends neatly.",
      "Make the second glove \u2014 same way!",
    ],
    note: "Block gently for a polished finish. You made them! \u{1F33F}"
  },
];

const gussetRounds = [
  { rnd: 1, inst: "K22. Place marker. M1L, K1, M1R. Place marker. Knit to end.", between: 3, total: 46 },
  { rnd: 2, inst: "Knit all stitches (slip markers).", between: 3, total: 46 },
  { rnd: 3, inst: "Knit to marker, slip, M1L, knit to marker, M1R, slip, knit to end.", between: 5, total: 48 },
  { rnd: 4, inst: "Knit all stitches.", between: 5, total: 48 },
  { rnd: 5, inst: "Knit to marker, slip, M1L, knit to marker, M1R, slip, knit to end.", between: 7, total: 50 },
  { rnd: 6, inst: "Knit all stitches.", between: 7, total: 50 },
  { rnd: 7, inst: "Knit to marker, slip, M1L, knit to marker, M1R, slip, knit to end.", between: 9, total: 52 },
  { rnd: 8, inst: "Knit all stitches.", between: 9, total: 52 },
  { rnd: 9, inst: "Knit to marker, slip, M1L, knit to marker, M1R, slip, knit to end.", between: 11, total: 54 },
  { rnd: 10, inst: "Knit all stitches.", between: 11, total: 54 },
  { rnd: 11, inst: "Knit to marker, slip, M1L, knit to marker, M1R, slip, knit to end.", between: 13, total: 56 },
  { rnd: 12, inst: "Knit all stitches.", between: 13, total: 56 },
];

const loadJson = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch { return fallback; }
};

const saveJson = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

export default function Gloves() {
  const [currentStep, setCurrentStep] = useState(() => loadJson("gloves_currentStep", 0));
  const [checkedInstr, setCheckedInstr] = useState(() => loadJson("gloves_checkedInstr", {}));
  const [checkedGusset, setCheckedGusset] = useState(() => loadJson("gloves_checkedGusset", {}));
  const step = steps[currentStep];

  useEffect(() => { saveJson("gloves_currentStep", currentStep); }, [currentStep]);
  useEffect(() => { saveJson("gloves_checkedInstr", checkedInstr); }, [checkedInstr]);
  useEffect(() => { saveJson("gloves_checkedGusset", checkedGusset); }, [checkedGusset]);

  const toggleInstr = (stepId, idx) => {
    const key = `${stepId}-${idx}`;
    setCheckedInstr(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleGusset = (idx) => {
    setCheckedGusset(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const resetStep = () => {
    if (step.gussetRounds) {
      setCheckedGusset({});
    } else {
      const nc = { ...checkedInstr };
      (step.instructions || []).forEach((_, i) => { delete nc[`${step.id}-${i}`]; });
      setCheckedInstr(nc);
    }
  };

  const allStepsDone = () => {
    if (step.gussetRounds) return gussetRounds.every((_, i) => checkedGusset[i]);
    if (step.instructions) return step.instructions.every((_, i) => checkedInstr[`${step.id}-${i}`]);
    return false;
  };

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "auto", background: CREAM, fontFamily: "'Segoe UI', system-ui, sans-serif", color: WARM }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${OLIVE_LIGHT}88, ${OLIVE_PALE})`, padding: "24px 20px 16px", textAlign: "center", borderBottom: `2px solid ${OLIVE_MID}` }}>
        <Link to="/knitting" style={{ fontSize: "12px", color: WARM_LIGHT, textDecoration: "none", display: "inline-block", marginBottom: "8px" }}>
          ← Back to Knitting Patterns
        </Link>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <YarnBall size={34} />
          <h1 style={{ margin: 0, fontSize: "20px", color: OLIVE_DARK, fontWeight: 600, letterSpacing: "0.5px" }}>Gentle Fingerless Gloves</h1>
          <YarnBall size={34} />
        </div>
        <p style={{ margin: 0, fontSize: "12px", color: WARM_LIGHT }}>in the round · magic loop · 45 cast on · 44 sts · 25 rounds ribbing</p>
      </div>

      {/* Step Navigation Pills */}
      <div style={{ display: "flex", gap: "6px", padding: "12px 16px", overflowX: "auto", background: "white", borderBottom: `1px solid ${OLIVE_PALE}` }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setCurrentStep(i)} style={{
            flex: "0 0 auto", padding: "6px 14px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: i === currentStep ? 600 : 400,
            background: i === currentStep ? OLIVE : "transparent",
            color: i === currentStep ? "white" : WARM_LIGHT,
            transition: "all 0.2s"
          }}>
            {s.icon} {s.title}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", maxWidth: "820px", margin: "0 auto", padding: "20px 16px", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {/* Glove Progress */}
        <div style={{ flex: "0 0 auto", background: "white", borderRadius: "16px", padding: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", textAlign: "center" }}>
          <p style={{ margin: "0 0 4px", fontSize: "11px", color: WARM_LIGHT, textTransform: "uppercase", letterSpacing: "1px" }}>Progress</p>
          <GloveProgress step={currentStep} />
        </div>

        {/* Main Content */}
        <div style={{ flex: "1 1 340px", minWidth: "280px" }}>
          {/* Step Header */}
          <div style={{ background: "white", borderRadius: "16px", padding: "20px", marginBottom: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ margin: 0, fontSize: "22px", color: OLIVE_DARK }}>
                {step.icon} {step.title}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {allStepsDone() && <span style={{ fontSize: "11px", color: OLIVE, background: OLIVE_PALE, padding: "2px 8px", borderRadius: "8px", fontWeight: 600 }}>✓ complete</span>}
                <span style={{ fontSize: "12px", color: WARM_LIGHT, background: OLIVE_PALE, padding: "2px 10px", borderRadius: "12px" }}>
                  {currentStep + 1}/{steps.length}
                </span>
              </div>
            </div>
          </div>

          {/* Diagram */}
          {step.diagram && (
            <div style={{ background: "white", borderRadius: "16px", padding: "16px", marginBottom: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", display: "flex", justifyContent: "center" }}>
              <StitchDiagram type={step.diagram} />
            </div>
          )}

          {/* Materials list */}
          {step.content && (
            <div style={{ background: "white", borderRadius: "16px", padding: "16px", marginBottom: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              {step.content.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < step.content.length - 1 ? `1px solid ${OLIVE_PALE}` : "none" }}>
                  <span style={{ fontWeight: 600, fontSize: "13px", color: OLIVE_DARK }}>{item.label}</span>
                  <span style={{ fontSize: "13px", color: WARM, textAlign: "right", maxWidth: "60%" }}>{item.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Instructions checklist */}
          {step.instructions && (
            <div style={{ background: "white", borderRadius: "16px", padding: "16px", marginBottom: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              {step.instructions.map((inst, i) => {
                const checked = checkedInstr[`${step.id}-${i}`];
                return (
                  <div key={i} onClick={() => toggleInstr(step.id, i)} style={{
                    display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 8px", cursor: "pointer", borderRadius: "8px",
                    background: checked ? OLIVE_PALE : "transparent", transition: "background 0.2s", marginBottom: "4px"
                  }}>
                    <div style={{ flex: "0 0 auto", marginTop: "1px" }}>
                      {checked ? <CheckIcon /> : <CircleIcon />}
                    </div>
                    <span style={{ fontSize: "14px", lineHeight: 1.5, color: checked ? WARM_LIGHT : WARM, textDecoration: checked ? "line-through" : "none", transition: "all 0.2s" }}>
                      {inst}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Gusset rounds */}
          {step.gussetRounds && (
            <div style={{ background: "white", borderRadius: "16px", padding: "16px", marginBottom: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "12px", color: WARM_LIGHT, textTransform: "uppercase", letterSpacing: "1px" }}>Round-by-round</span>
                <span style={{ fontSize: "11px", color: OLIVE, background: OLIVE_PALE, padding: "2px 8px", borderRadius: "8px" }}>
                  {Object.values(checkedGusset).filter(Boolean).length}/{gussetRounds.length} done
                </span>
              </div>
              {gussetRounds.map((g, i) => {
                const checked = checkedGusset[i];
                const isIncrease = g.rnd % 2 === 1;
                return (
                  <div key={i} onClick={() => toggleGusset(i)} style={{
                    display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 8px", cursor: "pointer", borderRadius: "10px",
                    background: checked ? OLIVE_PALE : isIncrease ? `${OLIVE_PALE}88` : "transparent",
                    transition: "background 0.2s", marginBottom: "4px",
                    borderLeft: isIncrease ? `3px solid ${OLIVE}` : "3px solid transparent"
                  }}>
                    <div style={{ flex: "0 0 auto", marginTop: "1px" }}>
                      {checked ? <CheckIcon /> : <CircleIcon />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "4px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 600, color: isIncrease ? OLIVE_DARK : WARM_LIGHT }}>
                          Rnd {g.rnd} {isIncrease ? "· increase" : "· plain"}
                        </span>
                        <span style={{ fontSize: "10px", color: WARM_LIGHT, background: CREAM, padding: "1px 6px", borderRadius: "6px" }}>
                          {g.between} thumb · {g.total} total
                        </span>
                      </div>
                      <span style={{ fontSize: "13px", lineHeight: 1.5, color: checked ? WARM_LIGHT : WARM, textDecoration: checked ? "line-through" : "none" }}>
                        {g.inst}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Note */}
          {step.note && (
            <div style={{ background: `linear-gradient(135deg, ${OLIVE_PALE}, white)`, borderRadius: "12px", padding: "14px 16px", marginBottom: "12px", borderLeft: `3px solid ${OLIVE}`, fontSize: "13px", color: OLIVE_DARK, lineHeight: 1.5 }}>
              💡 {step.note}
            </div>
          )}

          {/* Reset */}
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <button onClick={resetStep} style={{ background: "none", border: "none", color: WARM_LIGHT, fontSize: "12px", cursor: "pointer", padding: "4px 12px" }}>
              ↺ reset checkmarks
            </button>
          </div>

          {/* Nav buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
            <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} style={{
              flex: 1, padding: "14px", borderRadius: "12px", border: `1.5px solid ${OLIVE_LIGHT}`, background: "white", color: currentStep === 0 ? "#ddd" : OLIVE_DARK,
              fontSize: "14px", fontWeight: 500, cursor: currentStep === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"
            }}>
              <ArrowLeft /> Back
            </button>
            <button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} disabled={currentStep === steps.length - 1} style={{
              flex: 1, padding: "14px", borderRadius: "12px", border: "none", background: currentStep === steps.length - 1 ? OLIVE_LIGHT : OLIVE, color: "white",
              fontSize: "14px", fontWeight: 600, cursor: currentStep === steps.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"
            }}>
              Next <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Row Counter */}
      <RowCounter projectKey="gloves" max={999} />

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "20px", fontSize: "11px", color: WARM_LIGHT }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "4px" }}>
          <Needle size={16} /><Needle size={16} />
        </div>
        Pattern adapted from Wooliwood Tricot · Modified for magic loop
      </div>
    </div>
  );
}
