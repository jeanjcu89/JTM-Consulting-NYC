/* global React */
// =============================================================
// JTM Consulting NYC — Logo direction explorations
// All marks render as inline SVG so they scale crisply.
// Palette: #0a0a0a background, lime #c2ff3d accent, off-white #f5f5f4
// =============================================================

const LIME = "#c2ff3d";
const INK = "#0a0a0a";
const FOG = "#f5f5f4";
const DIM = "#6b6b68";

// -------------------------------------------------------------
// 01 — TERMINAL BLOCK
// Monogram = lime square with cursor-styled "J". Pure system feel.
// -------------------------------------------------------------
function MarkTerminal({ size = 96 }) {
  // Geist Mono J: visual bounds left=-4, right=24 → visual width 20.
  // Center [J(20) + gap(4) + bar(18)] = 42 in 96 viewBox → startX = 27.
  // text x must be startX + 4 (J's actualBoundingBoxLeft) = 23.
  // bar x = startX + jVisualW + gap = 27 + 20 + 4 = 51.
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="92" height="92" rx="14" fill={LIME} />
      <text x="23" y="62"
        fontFamily="Geist Mono, ui-monospace, monospace"
        fontSize="52" fontWeight="700" fill={INK} letterSpacing="-0.02em">J</text>
      <rect x="51" y="58" width="18" height="6" fill={INK}>
        <animate attributeName="opacity" values="1;1;0;0" dur="1.1s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

function WordmarkTerminal() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <MarkTerminal size={56} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 22, fontWeight: 700, color: FOG, letterSpacing: "-0.01em" }}>
          JTM<span style={{ color: LIME }}>_</span>
        </div>
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, fontWeight: 500, color: DIM, letterSpacing: "0.18em" }}>
          CONSULTING / NYC
        </div>
      </div>
    </div>
  );
}

function LockupTerminal() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <MarkTerminal size={88} />
      <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 22, fontWeight: 700, color: FOG, letterSpacing: "-0.01em" }}>
        JTM<span style={{ color: LIME }}>_</span>CONSULTING
      </div>
      <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, fontWeight: 500, color: DIM, letterSpacing: "0.24em" }}>
        ONE TEAM &nbsp;·&nbsp; ONE INVOICE &nbsp;·&nbsp; NYC
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 02 — BRACKET (CODE BLOCK)
// {JTM} mark — hint at code, configurable, technical.
// -------------------------------------------------------------
function MarkBracket({ size = 96 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="94" height="94" rx="14" fill={INK} stroke={LIME} strokeWidth="2" />
      <text x="14" y="60" fontFamily="Geist Mono, ui-monospace, monospace"
        fontSize="42" fontWeight="500" fill={LIME}>{"{"}</text>
      <text x="48" y="60" textAnchor="middle"
        fontFamily="Geist Mono, ui-monospace, monospace"
        fontSize="26" fontWeight="700" fill={FOG} letterSpacing="0.02em">JTM</text>
      <text x="82" y="60" textAnchor="end" fontFamily="Geist Mono, ui-monospace, monospace"
        fontSize="42" fontWeight="500" fill={LIME}>{"}"}</text>
    </svg>
  );
}

function WordmarkBracket() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Geist Mono, monospace" }}>
      <span style={{ fontSize: 28, fontWeight: 500, color: LIME }}>{"{"}</span>
      <span style={{ fontSize: 22, fontWeight: 700, color: FOG, letterSpacing: "0.01em" }}>JTM CONSULTING NYC</span>
      <span style={{ fontSize: 28, fontWeight: 500, color: LIME }}>{"}"}</span>
    </div>
  );
}

function LockupBracket() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <MarkBracket size={88} />
      <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 18, fontWeight: 700, color: FOG, letterSpacing: "0.02em" }}>
        JTM CONSULTING NYC
      </div>
      <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, fontWeight: 500, color: DIM, letterSpacing: "0.24em" }}>
        ONE TEAM. ONE INVOICE.
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 03 — NETWORK NODE
// Geometric: three nodes connected by lines forming a triangle —
// the "T" sits at the center as the connection.
// -------------------------------------------------------------
function MarkNode({ size = 96 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="94" height="94" rx="14" fill={INK} stroke="#1f1f1f" strokeWidth="1" />
      {/* triangle of nodes */}
      <line x1="24" y1="28" x2="72" y2="28" stroke={LIME} strokeWidth="1.5" opacity="0.5" />
      <line x1="24" y1="28" x2="48" y2="72" stroke={LIME} strokeWidth="1.5" opacity="0.5" />
      <line x1="72" y1="28" x2="48" y2="72" stroke={LIME} strokeWidth="1.5" opacity="0.5" />
      {/* nodes */}
      <circle cx="24" cy="28" r="6" fill={INK} stroke={LIME} strokeWidth="2" />
      <circle cx="72" cy="28" r="6" fill={INK} stroke={LIME} strokeWidth="2" />
      <circle cx="48" cy="72" r="8" fill={LIME} />
      {/* J T M letters at each */}
      <text x="24" y="20" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill={FOG} letterSpacing="0.05em">J</text>
      <text x="72" y="20" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill={FOG} letterSpacing="0.05em">T</text>
      <text x="48" y="89" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill={FOG} letterSpacing="0.05em">M</text>
    </svg>
  );
}

function WordmarkNode() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <MarkNode size={48} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "Geist, sans-serif", fontSize: 22, fontWeight: 600, color: FOG, letterSpacing: "-0.02em", lineHeight: 1 }}>
          JTM Consulting
        </div>
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, fontWeight: 500, color: LIME, letterSpacing: "0.24em", marginTop: 4 }}>
          NYC
        </div>
      </div>
    </div>
  );
}

function LockupNode() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <MarkNode size={96} />
      <div style={{ fontFamily: "Geist, sans-serif", fontSize: 22, fontWeight: 600, color: FOG, letterSpacing: "-0.02em" }}>
        JTM Consulting NYC
      </div>
      <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, fontWeight: 500, color: DIM, letterSpacing: "0.24em" }}>
        WEB · BRAND · IT · NETWORKS · CLOUD
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 04 — STENCIL TOKEN
// NYC infrastructure feel — chunky stencil monogram in a circle.
// Subway-token nod without copying any transit mark.
// -------------------------------------------------------------
function MarkStencil({ size = 96 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="48" cy="48" r="46" fill={LIME} />
      <circle cx="48" cy="48" r="46" fill="none" stroke={INK} strokeWidth="2" opacity="0.15" />
      {/* JTM stencil with bridges */}
      <text x="48" y="62"
        textAnchor="middle"
        fontFamily="Geist, sans-serif"
        fontSize="32" fontWeight="700" fill={INK}
        letterSpacing="-0.04em"
      >JTM</text>
      {/* tick marks at 4 cardinals */}
      <rect x="46.5" y="3" width="3" height="6" fill={INK} />
      <rect x="46.5" y="87" width="3" height="6" fill={INK} />
      <rect x="3" y="46.5" width="6" height="3" fill={INK} />
      <rect x="87" y="46.5" width="6" height="3" fill={INK} />
    </svg>
  );
}

function WordmarkStencil() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <MarkStencil size={52} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontFamily: "Geist, sans-serif", fontSize: 24, fontWeight: 700, color: FOG, letterSpacing: "-0.03em", lineHeight: 1 }}>
          JTM CONSULTING
        </div>
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, fontWeight: 600, color: LIME, letterSpacing: "0.3em" }}>
          NEW YORK CITY
        </div>
      </div>
    </div>
  );
}

function LockupStencil() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <MarkStencil size={96} />
      <div style={{ fontFamily: "Geist, sans-serif", fontSize: 22, fontWeight: 700, color: FOG, letterSpacing: "-0.03em" }}>
        JTM CONSULTING
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "Geist Mono, monospace", fontSize: 10, fontWeight: 500, color: DIM, letterSpacing: "0.24em" }}>
        <span>EST. BROOKLYN</span>
        <span style={{ width: 4, height: 4, borderRadius: "50%", background: LIME }} />
        <span>ONE TEAM · ONE INVOICE</span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 05 — GRID GLYPH
// Custom geometric monogram — J/T/M built from a 5x5 grid.
// Constructed, mathematical, very technical.
// -------------------------------------------------------------
function MarkGrid({ size = 96 }) {
  // 5×5 grid, cells of 14px with 4px spacing. We draw J|T|M as one unified glyph.
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="94" height="94" rx="14" fill={INK} stroke="#1f1f1f" strokeWidth="1" />
      {/* J – top horizontal + vertical down + curl */}
      <g fill={LIME}>
        {/* J */}
        <rect x="14" y="22" width="22" height="6" />
        <rect x="22" y="22" width="6" height="42" />
        <rect x="14" y="58" width="14" height="6" />
        <rect x="14" y="50" width="6" height="14" />
        {/* T */}
        <rect x="40" y="22" width="22" height="6" />
        <rect x="48" y="22" width="6" height="52" />
        {/* M */}
        <rect x="66" y="22" width="6" height="52" />
        <rect x="80" y="22" width="6" height="52" />
        <rect x="72" y="32" width="6" height="6" />
        <rect x="72" y="38" width="6" height="6" opacity="0.6" />
      </g>
      {/* corner ticks */}
      <rect x="6" y="6" width="6" height="2" fill={LIME} />
      <rect x="6" y="6" width="2" height="6" fill={LIME} />
      <rect x="84" y="6" width="6" height="2" fill={LIME} />
      <rect x="88" y="6" width="2" height="6" fill={LIME} />
      <rect x="6" y="88" width="6" height="2" fill={LIME} />
      <rect x="6" y="84" width="2" height="6" fill={LIME} />
      <rect x="84" y="88" width="6" height="2" fill={LIME} />
      <rect x="88" y="84" width="2" height="6" fill={LIME} />
    </svg>
  );
}

function WordmarkGrid() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <MarkGrid size={48} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontFamily: "Geist, sans-serif", fontSize: 22, fontWeight: 500, color: FOG, letterSpacing: "-0.025em", lineHeight: 1 }}>
          JTM Consulting
        </div>
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, fontWeight: 500, color: DIM, letterSpacing: "0.2em" }}>
          NYC · SINCE 2018
        </div>
      </div>
    </div>
  );
}

function LockupGrid() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <MarkGrid size={96} />
      <div style={{ fontFamily: "Geist, sans-serif", fontSize: 22, fontWeight: 500, color: FOG, letterSpacing: "-0.025em" }}>
        JTM Consulting NYC
      </div>
      <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, fontWeight: 500, color: DIM, letterSpacing: "0.24em" }}>
        ONE TEAM · ONE INVOICE
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 06 — CABLE / BRIDGE
// Two anchor points connected by a single cable arc — a nod to
// Brooklyn Bridge cables and "we connect things." Subtle.
// -------------------------------------------------------------
function MarkCable({ size = 96 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="94" height="94" rx="14" fill={INK} stroke="#1f1f1f" strokeWidth="1" />
      {/* two pillars */}
      <rect x="18" y="28" width="6" height="44" fill={LIME} />
      <rect x="72" y="28" width="6" height="44" fill={LIME} />
      {/* cable arc */}
      <path d="M 21 32 Q 48 70 75 32" stroke={LIME} strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* vertical tension lines */}
      <line x1="32" y1="48" x2="32" y2="60" stroke={LIME} strokeWidth="1" opacity="0.6" />
      <line x1="40" y1="55" x2="40" y2="62" stroke={LIME} strokeWidth="1" opacity="0.6" />
      <line x1="48" y1="58" x2="48" y2="64" stroke={LIME} strokeWidth="1" opacity="0.6" />
      <line x1="56" y1="55" x2="56" y2="62" stroke={LIME} strokeWidth="1" opacity="0.6" />
      <line x1="64" y1="48" x2="64" y2="60" stroke={LIME} strokeWidth="1" opacity="0.6" />
      {/* deck */}
      <rect x="14" y="68" width="68" height="2" fill={LIME} opacity="0.8" />
      {/* JTM */}
      <text x="48" y="86" textAnchor="middle" fontFamily="Geist Mono, monospace"
        fontSize="9" fontWeight="700" fill={FOG} letterSpacing="0.3em">JTM</text>
    </svg>
  );
}

function WordmarkCable() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <MarkCable size={52} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontFamily: "Geist, sans-serif", fontSize: 22, fontWeight: 600, color: FOG, letterSpacing: "-0.02em", lineHeight: 1 }}>
          JTM Consulting NYC
        </div>
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, fontWeight: 500, color: LIME, letterSpacing: "0.2em" }}>
          BUILT IN BROOKLYN
        </div>
      </div>
    </div>
  );
}

function LockupCable() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <MarkCable size={96} />
      <div style={{ fontFamily: "Geist, sans-serif", fontSize: 22, fontWeight: 600, color: FOG, letterSpacing: "-0.02em" }}>
        JTM Consulting NYC
      </div>
      <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, fontWeight: 500, color: DIM, letterSpacing: "0.24em" }}>
        WE CONNECT WHAT YOU RUN ON
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// FAVICONS — each at 32px, optimized for tiny.
// -------------------------------------------------------------
function FaviconTerminal() {
  return (
    <svg width="64" height="64" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="6" fill={LIME} />
      <text x="9" y="23" fontFamily="Geist Mono, monospace" fontSize="20" fontWeight="700" fill={INK}>J</text>
      <rect x="18" y="21" width="8" height="3" fill={INK} />
    </svg>
  );
}
function FaviconBracket() {
  return (
    <svg width="64" height="64" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="6" fill={INK} stroke={LIME} strokeWidth="2" />
      <text x="3" y="23" fontFamily="Geist Mono, monospace" fontSize="18" fontWeight="500" fill={LIME}>{"{"}</text>
      <text x="16" y="22" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fontWeight="700" fill={FOG}>J</text>
      <text x="29" y="23" textAnchor="end" fontFamily="Geist Mono, monospace" fontSize="18" fontWeight="500" fill={LIME}>{"}"}</text>
    </svg>
  );
}
function FaviconNode() {
  return (
    <svg width="64" height="64" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="6" fill={INK} />
      <line x1="9" y1="11" x2="23" y2="11" stroke={LIME} strokeWidth="1" opacity="0.5" />
      <line x1="9" y1="11" x2="16" y2="23" stroke={LIME} strokeWidth="1" opacity="0.5" />
      <line x1="23" y1="11" x2="16" y2="23" stroke={LIME} strokeWidth="1" opacity="0.5" />
      <circle cx="9" cy="11" r="2.5" fill={INK} stroke={LIME} strokeWidth="1.5" />
      <circle cx="23" cy="11" r="2.5" fill={INK} stroke={LIME} strokeWidth="1.5" />
      <circle cx="16" cy="23" r="3.5" fill={LIME} />
    </svg>
  );
}
function FaviconStencil() {
  return (
    <svg width="64" height="64" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="15" fill={LIME} />
      <text x="16" y="21" textAnchor="middle" fontFamily="Geist, sans-serif" fontSize="12" fontWeight="700" fill={INK} letterSpacing="-0.04em">JTM</text>
    </svg>
  );
}
function FaviconGrid() {
  return (
    <svg width="64" height="64" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="6" fill={INK} />
      <g fill={LIME}>
        <rect x="6" y="9" width="20" height="2" />
        <rect x="6" y="9" width="2" height="14" />
        <rect x="14" y="9" width="2" height="14" />
        <rect x="24" y="9" width="2" height="14" />
        <rect x="6" y="21" width="6" height="2" />
        <rect x="20" y="9" width="6" height="2" />
      </g>
    </svg>
  );
}
function FaviconCable() {
  return (
    <svg width="64" height="64" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="6" fill={INK} />
      <rect x="6" y="9" width="2" height="16" fill={LIME} />
      <rect x="24" y="9" width="2" height="16" fill={LIME} />
      <path d="M 7 11 Q 16 25 25 11" stroke={LIME} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="4" y="23" width="24" height="1.5" fill={LIME} />
    </svg>
  );
}

// -------------------------------------------------------------
// CANVAS COMPOSITION
// -------------------------------------------------------------
const directions = [
  { id: "01-terminal", title: "01 / Terminal", subtitle: "Cursor-block monogram. System feel. Pairs with Geist Mono.", Mark: MarkTerminal, Word: WordmarkTerminal, Lock: LockupTerminal, Fav: FaviconTerminal },
  { id: "02-bracket", title: "02 / Bracket", subtitle: "{JTM} as code block. Configurable, technical, IT-fluent.", Mark: MarkBracket, Word: WordmarkBracket, Lock: LockupBracket, Fav: FaviconBracket },
  { id: "03-node", title: "03 / Network", subtitle: "Three nodes, one connection. Web · IT · networks made literal.", Mark: MarkNode, Word: WordmarkNode, Lock: LockupNode, Fav: FaviconNode },
  { id: "04-stencil", title: "04 / Token", subtitle: "Brooklyn-stamp circle. Built-here, infrastructural, confident.", Mark: MarkStencil, Word: WordmarkStencil, Lock: LockupStencil, Fav: FaviconStencil },
  { id: "05-grid", title: "05 / Grid Glyph", subtitle: "JTM constructed from a pixel grid. Mathematical, custom, ownable.", Mark: MarkGrid, Word: WordmarkGrid, Lock: LockupGrid, Fav: FaviconGrid },
  { id: "06-cable", title: "06 / Cable", subtitle: "Brooklyn Bridge cables — \"we connect what you run on.\"", Mark: MarkCable, Word: WordmarkCable, Lock: LockupCable, Fav: FaviconCable },
];

const cellTitle = {
  fontFamily: "Geist Mono, monospace",
  fontSize: 9,
  fontWeight: 600,
  color: DIM,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  marginBottom: 12,
};

const cell = (extra = {}) => ({
  background: "#0a0a0a",
  border: "1px solid #1f1f1f",
  borderRadius: 8,
  padding: 24,
  display: "flex",
  flexDirection: "column",
  ...extra,
});

function DirectionCard({ d }) {
  const { Mark, Word, Lock, Fav } = d;
  return (
    <div style={{ width: 1080, padding: 32, background: "#050505", color: FOG }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid #1f1f1f" }}>
        <div style={{ fontFamily: "Geist, sans-serif", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>{d.title}</div>
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 11, color: DIM, letterSpacing: "0.04em" }}>{d.subtitle}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Mark */}
        <div style={cell({ minHeight: 240, justifyContent: "space-between" })}>
          <div style={cellTitle}>// MARK</div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
            <Mark size={140} />
          </div>
          <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, color: DIM, marginTop: 12, letterSpacing: "0.05em" }}>
            128px · vector · lime on ink
          </div>
        </div>

        {/* Wordmark */}
        <div style={cell({ minHeight: 240, justifyContent: "space-between" })}>
          <div style={cellTitle}>// WORDMARK</div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
            <Word />
          </div>
          <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, color: DIM, marginTop: 12, letterSpacing: "0.05em" }}>
            horizontal · for nav and headers
          </div>
        </div>

        {/* Tagline lockup */}
        <div style={cell({ minHeight: 240, justifyContent: "space-between" })}>
          <div style={cellTitle}>// TAGLINE LOCKUP</div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
            <Lock />
          </div>
          <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, color: DIM, marginTop: 12, letterSpacing: "0.05em" }}>
            stacked · for footer, og, print
          </div>
        </div>
      </div>

      {/* Favicons + sizes row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        <div style={cell()}>
          <div style={cellTitle}>// FAVICON · SIZES</div>
          <div style={{ display: "flex", alignItems: "center", gap: 28, padding: "8px 0" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <Fav />
              <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, color: DIM }}>64</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ transform: "scale(0.5)", transformOrigin: "center" }}><Fav /></div>
              <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, color: DIM, marginTop: -16 }}>32</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ transform: "scale(0.25)", transformOrigin: "center" }}><Fav /></div>
              <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, color: DIM, marginTop: -32 }}>16</div>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#111", border: "1px solid #1f1f1f", borderRadius: 6 }}>
              <div style={{ width: 14, height: 14, background: "#222", borderRadius: 3, display: "grid", placeItems: "center" }}>
                <div style={{ width: 12, height: 12, transform: "scale(0.375)", transformOrigin: "0 0", marginLeft: 0, marginTop: 0 }}>
                  <div style={{ width: 32, height: 32 }}><Fav /></div>
                </div>
              </div>
              <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 11, color: FOG }}>jtmconsultingnyc.com</div>
            </div>
          </div>
        </div>

        {/* Nav preview */}
        <div style={cell()}>
          <div style={cellTitle}>// IN-NAV PREVIEW</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "rgba(10,10,10,0.72)", border: "1px solid #1f1f1f", borderRadius: 6, backdropFilter: "blur(20px)" }}>
            <div style={{ transform: "scale(0.55)", transformOrigin: "left center" }}>
              <Word />
            </div>
            <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, color: DIM, letterSpacing: "0.1em" }}>HOME · WORK · CONTACT</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================
// MOUNT
// =========================
function App() {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  return (
    <DesignCanvas
      title="JTM Consulting NYC — Logo Directions"
      subtitle="Six explorations · lime on ink · pick a finalist (or two) and we'll bake out SVG + favicon files">

      <DCSection id="logos" title="Directions">
        {directions.map((d) => (
          <DCArtboard key={d.id} id={d.id} label={d.title} width={1080} height={620}>
            <DirectionCard d={d} />
          </DCArtboard>
        ))}
      </DCSection>
    </DesignCanvas>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
