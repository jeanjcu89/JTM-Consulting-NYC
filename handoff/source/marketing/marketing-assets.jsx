/* global React */
// =============================================================
// JTM Consulting NYC — Social + Google Ads asset pack
// Locked direction: JTM Monogram (J·T·M ligature)
// Pure brand: black bg, lime mark, mono type, generous negative space.
// =============================================================

const LIME = "#c2ff3d";
const INK  = "#0a0a0a";
const FOG  = "#f5f5f4";
const DIM  = "#6b6b68";
const MUTE = "#9a9a96";

const HEADLINE  = "One team.\nOne invoice.";
const SECONDARY = "Web · Brand · IT · Networks · Cloud";
const CTA       = "Start your project";
const CONTACT   = "info@jtmconsultingnyc.com";
const URL       = "jtmconsultingnyc.com";

// -------------------------------------------------------------
// CORE MARK — JTM Monogram (J·T·M ligature, lime chip)
// -------------------------------------------------------------
const MARK_SRC = "logo-mark.png";

function MarkInline({ size = 96, radius }) {
  // Square chip with a smaller monogram centered inside (more breathing room).
  const r = radius != null ? radius : Math.round(size * 0.146);
  const monoSize = size * 0.62;
  return (
    <div style={{
      width: size, height: size, background: LIME, borderRadius: r,
      boxSizing: "border-box",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <img src={MARK_SRC} alt="JTM" style={{ width: monoSize, height: monoSize, display: "block", objectFit: "contain" }} />
    </div>
  );
}

// Static (non-blinking) variant for export-friendly artboards
function MarkInlineStatic({ size = 96 }) {
  return <MarkInline size={size} />;
}

// Wordmark used in nav/footers and small format placements — STACKED LOCKUP
function Wordmark({ size = "md", showSub = true }) {
  const scale = size === "lg" ? 1.4 : size === "sm" ? 0.78 : 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 * scale }}>
      <MarkInline size={72 * scale} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 18 * scale, fontWeight: 700, color: FOG, letterSpacing: "0.04em", lineHeight: 1 }}>
          JTM<span style={{ color: LIME, animation: "jtmCursorBlink 1.1s steps(1,end) infinite" }}>_</span>CONSULTING NYC
        </div>
        {showSub && (
          <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 10 * scale, fontWeight: 500, color: DIM, letterSpacing: "0.18em", marginTop: 4 }}>
            ONE TEAM · ONE INVOICE
          </div>
        )}
      </div>
    </div>
  );
}

// Horizontal lockup variant — when vertical space is tight (banners, leaderboards)
function WordmarkHoriz({ size = "md", showSub = true }) {
  const scale = size === "lg" ? 1.4 : size === "sm" ? 0.78 : 1;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 * scale }}>
      <MarkInline size={56 * scale} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 18 * scale, fontWeight: 700, color: FOG, letterSpacing: "0.04em", lineHeight: 1 }}>
          JTM<span style={{ color: LIME, animation: "jtmCursorBlink 1.1s steps(1,end) infinite" }}>_</span>CONSULTING NYC
        </div>
        {showSub && (
          <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 10 * scale, fontWeight: 500, color: DIM, letterSpacing: "0.18em", marginTop: 4 }}>
            ONE TEAM · ONE INVOICE
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SHARED PIECES
// -------------------------------------------------------------
const baseFrame = {
  background: INK,
  color: FOG,
  fontFamily: "Geist, system-ui, sans-serif",
  position: "relative",
  overflow: "hidden",
  boxSizing: "border-box",
};

function CornerTicks({ inset = 16, color = "#1f1f1f", size = 10, weight = 1 }) {
  const s = size, w = weight;
  const corner = (style) => (
    <div style={{ position: "absolute", width: s, height: s, ...style }}>
      <div style={{ position: "absolute", inset: 0, borderTop: `${w}px solid ${color}`, borderLeft: `${w}px solid ${color}`, opacity: 1, ...style.flip }} />
    </div>
  );
  // Use simple ::before/::after via four divs
  return (
    <>
      <div style={{ position: "absolute", top: inset, left: inset, width: s, height: w, background: color }} />
      <div style={{ position: "absolute", top: inset, left: inset, width: w, height: s, background: color }} />
      <div style={{ position: "absolute", top: inset, right: inset, width: s, height: w, background: color }} />
      <div style={{ position: "absolute", top: inset, right: inset, width: w, height: s, background: color }} />
      <div style={{ position: "absolute", bottom: inset, left: inset, width: s, height: w, background: color }} />
      <div style={{ position: "absolute", bottom: inset, left: inset, width: w, height: s, background: color }} />
      <div style={{ position: "absolute", bottom: inset, right: inset, width: s, height: w, background: color }} />
      <div style={{ position: "absolute", bottom: inset, right: inset, width: w, height: s, background: color }} />
    </>
  );
}

function Meta({ children, color = DIM, size = 11, gap = 12 }) {
  return (
    <div style={{ fontFamily: "Geist Mono, monospace", fontSize: size, fontWeight: 500, color, letterSpacing: "0.18em", textTransform: "uppercase", display: "flex", gap }}>
      {children}
    </div>
  );
}

function CTAPill({ label = CTA, size = 14 }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      padding: `${size * 0.85}px ${size * 1.4}px`,
      background: LIME, color: INK, borderRadius: 999,
      fontFamily: "Geist, sans-serif", fontWeight: 600, fontSize: size, letterSpacing: "-0.01em",
    }}>
      {label}
      <span style={{ fontFamily: "Geist Mono, monospace", fontSize: size * 0.85 }}>→</span>
    </div>
  );
}

function HeadlineBig({ text = HEADLINE, size = 96, weight = 600 }) {
  return (
    <div style={{
      fontFamily: "Geist, sans-serif", fontSize: size, fontWeight: weight,
      letterSpacing: "-0.035em", lineHeight: 0.96, color: FOG, whiteSpace: "pre-line",
    }}>
      {text}
    </div>
  );
}

// =============================================================
// FACEBOOK / INSTAGRAM
// =============================================================

// IG/FB feed square — 1080×1080
function IGSquare() {
  return (
    <div style={{ ...baseFrame, width: 1080, height: 1080, padding: 80 }}>
      <CornerTicks inset={48} size={16} />
      {/* Top: small wordmark */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Wordmark size="md" />
        <Meta size={12} gap={10}><span>EST. 2018</span><span style={{ color: LIME }}>●</span><span>ONE TEAM</span></Meta>
      </div>
      {/* Center: headline */}
      <div style={{ marginTop: 120 }}>
        <Meta size={13} gap={14} color={LIME}><span>// 01</span><span>{`THE PITCH`}</span></Meta>
        <div style={{ marginTop: 28 }}>
          <HeadlineBig size={140} />
        </div>
        <div style={{ marginTop: 36, fontFamily: "Geist, sans-serif", fontSize: 28, color: MUTE, letterSpacing: "-0.01em", maxWidth: 760 }}>
          Small business, done right.<br />
          <span style={{ color: FOG }}>Web, brand, marketing, network and IT — under one roof.</span>
        </div>
      </div>
      {/* Bottom: CTA + contact */}
      <div style={{ position: "absolute", left: 80, right: 80, bottom: 80, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <CTAPill size={20} />
        <div style={{ textAlign: "right", fontFamily: "Geist Mono, monospace", fontSize: 13, color: DIM, letterSpacing: "0.14em" }}>
          <div style={{ color: FOG }}>{URL}</div>
          <div style={{ marginTop: 6 }}>{CONTACT}</div>
        </div>
      </div>
    </div>
  );
}

// IG/FB Story — 1080×1920
function IGStory() {
  return (
    <div style={{ ...baseFrame, width: 1080, height: 1920, padding: 96 }}>
      <CornerTicks inset={56} size={18} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <MarkInline size={140} />
        <Meta size={13} gap={12}><span>STORY</span><span style={{ color: LIME }}>●</span><span>09:24</span></Meta>
      </div>

      <div style={{ marginTop: 220 }}>
        <Meta size={14} gap={14} color={LIME}>
          <span>// PROMPT</span><span>SMALL BIZ. BIG SETUP.</span>
        </Meta>
        <div style={{ marginTop: 40 }}>
          <HeadlineBig size={168} />
        </div>
      </div>

      <div style={{ marginTop: 64, fontFamily: "Geist, sans-serif", fontSize: 32, color: FOG, letterSpacing: "-0.01em", lineHeight: 1.25, maxWidth: 820 }}>
        We build the digital backbone for ambitious small business.
      </div>

      <div style={{ position: "absolute", left: 96, right: 96, bottom: 220 }}>
        <Meta size={13} color={DIM} gap={20}>
          <span>WEB</span><span style={{ color: LIME }}>·</span>
          <span>BRAND</span><span style={{ color: LIME }}>·</span>
          <span>IT</span><span style={{ color: LIME }}>·</span>
          <span>NETWORKS</span><span style={{ color: LIME }}>·</span>
          <span>CLOUD</span>
        </Meta>
      </div>

      <div style={{ position: "absolute", left: 96, right: 96, bottom: 96, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <CTAPill size={24} />
        <div style={{ textAlign: "right", fontFamily: "Geist Mono, monospace", fontSize: 16, color: DIM, letterSpacing: "0.14em" }}>
          <div style={{ color: FOG }}>{URL}</div>
        </div>
      </div>
    </div>
  );
}

// FB / OG link card — 1200×630
function OGCard() {
  return (
    <div style={{ ...baseFrame, width: 1200, height: 630, padding: 64, display: "grid", gridTemplateColumns: "1fr 360px", gap: 48 }}>
      <CornerTicks inset={40} size={14} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <WordmarkHoriz size="md" />
        <div>
          <Meta size={11} color={LIME} gap={12}><span>// THE PITCH</span></Meta>
          <div style={{ marginTop: 18 }}>
            <HeadlineBig size={88} />
          </div>
          <div style={{ marginTop: 18, fontFamily: "Geist, sans-serif", fontSize: 22, color: MUTE, letterSpacing: "-0.01em", maxWidth: 540 }}>
            We build the digital backbone for ambitious small business.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Meta size={11} gap={10}>
            <span>WEB</span><span style={{ color: LIME }}>·</span>
            <span>BRAND</span><span style={{ color: LIME }}>·</span>
            <span>IT</span><span style={{ color: LIME }}>·</span>
            <span>NETWORKS</span><span style={{ color: LIME }}>·</span>
            <span>CLOUD</span>
          </Meta>
          <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 13, color: FOG, letterSpacing: "0.12em" }}>{URL}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <MarkInline size={300} />
      </div>
    </div>
  );
}

// =============================================================
// GOOGLE RESPONSIVE DISPLAY ADS — required asset set
// =============================================================

// Square logo — 1200×1200
function GoogleLogo() {
  return (
    <div style={{ ...baseFrame, width: 1200, height: 1200, padding: 0, display: "grid", placeItems: "center" }}>
      <MarkInline size={760} />
    </div>
  );
}

// Marketing image (landscape) — 1200×628
function GoogleMarketing() {
  return (
    <div style={{ ...baseFrame, width: 1200, height: 628, padding: 64 }}>
      <CornerTicks inset={36} size={14} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <WordmarkHoriz size="md" />
        <Meta size={11} gap={10} color={LIME}><span>// AD</span></Meta>
      </div>
      <div style={{ marginTop: 40 }}>
        <HeadlineBig size={104} />
      </div>
      <div style={{ position: "absolute", left: 64, right: 64, bottom: 64, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ fontFamily: "Geist, sans-serif", fontSize: 20, color: MUTE, maxWidth: 560, letterSpacing: "-0.005em" }}>
          {SECONDARY}
        </div>
        <CTAPill size={16} />
      </div>
    </div>
  );
}

// Square marketing image — 1200×1200
function GoogleSquare() {
  return (
    <div style={{ ...baseFrame, width: 1200, height: 1200, padding: 88 }}>
      <CornerTicks inset={48} size={16} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Wordmark size="md" />
        <Meta size={12} gap={10} color={LIME}><span>// AD</span></Meta>
      </div>
      <div style={{ marginTop: 140 }}>
        <Meta size={13} color={LIME}><span>WHY US</span></Meta>
        <div style={{ marginTop: 28 }}>
          <HeadlineBig size={156} />
        </div>
        <div style={{ marginTop: 36, fontFamily: "Geist, sans-serif", fontSize: 30, color: MUTE, letterSpacing: "-0.01em", maxWidth: 800 }}>
          Small business, done right.
        </div>
      </div>
      <div style={{ position: "absolute", left: 88, right: 88, bottom: 88, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <CTAPill size={22} />
        <div style={{ textAlign: "right", fontFamily: "Geist Mono, monospace", fontSize: 14, color: DIM, letterSpacing: "0.14em" }}>
          <div style={{ color: FOG }}>{URL}</div>
        </div>
      </div>
    </div>
  );
}

// Portrait image — 480×600 (4:5)
function GooglePortrait() {
  return (
    <div style={{ ...baseFrame, width: 480, height: 600, padding: 32 }}>
      <CornerTicks inset={18} size={8} />
      <MarkInline size={64} />
      <div style={{ marginTop: 38 }}>
        <Meta size={9} color={LIME}><span>{`// PITCH`}</span></Meta>
        <div style={{ marginTop: 14, fontFamily: "Geist, sans-serif", fontSize: 52, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 0.96, color: FOG, whiteSpace: "pre-line" }}>
          {HEADLINE}
        </div>
        <div style={{ marginTop: 18, fontFamily: "Geist, sans-serif", fontSize: 14, color: MUTE, letterSpacing: "-0.005em", maxWidth: 360 }}>
          Web · Brand · IT · Networks · Cloud — one team.
        </div>
      </div>
      <div style={{ position: "absolute", left: 32, right: 32, bottom: 32, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <CTAPill size={11} />
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, color: DIM, letterSpacing: "0.14em" }}>{URL}</div>
      </div>
    </div>
  );
}

// Headline / body text reference card
function GoogleCopyRef() {
  const headlines = [
    { t: "JTM Consulting", n: "≤ 30 chars" },
    { t: "One team. One invoice.", n: "≤ 30 chars" },
    { t: "Small business, done right.", n: "≤ 30 chars" },
  ];
  const longs = [
    { t: "One team for your website, brand, marketing, network and IT.", n: "≤ 90 chars" },
    { t: "Small business done right — web, brand, IT and networks under one roof.", n: "≤ 90 chars" },
  ];
  const desc = [
    { t: "Web, brand, marketing, IT, networks and cloud — one team, one invoice.", n: "≤ 90 chars" },
    { t: "The digital backbone for ambitious small business. Done right.", n: "≤ 90 chars" },
    { t: "Your website, brand, IT and network — handled by one team that picks up the phone.", n: "≤ 90 chars" },
    { t: "One team. One invoice. The full digital stack for ambitious small business.", n: "≤ 90 chars" },
    { t: "Stop juggling vendors. We run your web, brand, IT, network and cloud — end to end.", n: "≤ 90 chars" },
  ];
  const Row = ({ items, label }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Meta size={10} color={LIME}>{label}</Meta>
      {items.map((it, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "14px 16px", background: "#111", border: "1px solid #1f1f1f", borderRadius: 8, alignItems: "center" }}>
          <div style={{ fontFamily: "Geist, sans-serif", fontSize: 18, color: FOG, letterSpacing: "-0.01em" }}>{it.t}</div>
          <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 11, color: DIM, letterSpacing: "0.1em" }}>{`${it.t.length} / ${it.n.match(/\d+/)[0]}`}</div>
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ ...baseFrame, width: 1200, height: 800, padding: 64 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <Meta size={10} color={LIME}>{`// COPY DECK · GOOGLE RDA`}</Meta>
          <div style={{ marginTop: 8, fontFamily: "Geist, sans-serif", fontSize: 32, fontWeight: 600, letterSpacing: "-0.025em" }}>
            Headlines · long headlines · descriptions
          </div>
        </div>
        <WordmarkHoriz size="sm" showSub={false} />
      </div>
      <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Row items={headlines} label="HEADLINES (5 REQ.)" />
        <Row items={longs} label="LONG HEADLINES (1+ REQ.)" />
      </div>
      <div style={{ marginTop: 24 }}>
        <Row items={desc} label="DESCRIPTIONS (5 REQ.)" />
      </div>
      <div style={{ position: "absolute", left: 64, right: 64, bottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Geist Mono, monospace", fontSize: 11, color: DIM, letterSpacing: "0.14em" }}>
        <div>BUSINESS NAME · JTM CONSULTING ({`${"JTM Consulting".length}/25`})</div>
        <div>FINAL URL · {URL}</div>
      </div>
    </div>
  );
}

// =============================================================
// STATIC DISPLAY BANNERS
// =============================================================

function MediumRect() {
  // 300×250
  return (
    <div style={{ ...baseFrame, width: 300, height: 250, padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CornerTicks inset={10} size={5} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <MarkInline size={42} />
        <Meta size={7} gap={6} color={LIME}><span>// AD</span></Meta>
      </div>
      <div>
        <div style={{ fontFamily: "Geist, sans-serif", fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 0.96, color: FOG, whiteSpace: "pre-line" }}>
          {HEADLINE}
        </div>
        <div style={{ marginTop: 8, fontFamily: "Geist Mono, monospace", fontSize: 8.5, color: DIM, letterSpacing: "0.14em" }}>
          WEB · BRAND · IT · NETWORKS
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <CTAPill size={9} />
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 8, color: DIM, letterSpacing: "0.12em" }}>{URL}</div>
      </div>
    </div>
  );
}

function Leaderboard() {
  // 728×90
  return (
    <div style={{ ...baseFrame, width: 728, height: 90, padding: "14px 22px", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 22, alignItems: "center" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}><CornerTicks inset={6} size={5} /></div>
      <MarkInline size={56} />
      <div>
        <div style={{ fontFamily: "Geist, sans-serif", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1, color: FOG }}>
          One team. One invoice.
        </div>
        <div style={{ marginTop: 4, fontFamily: "Geist Mono, monospace", fontSize: 9, color: DIM, letterSpacing: "0.14em" }}>
          WEB · BRAND · IT · NETWORKS · CLOUD
        </div>
      </div>
      <CTAPill size={11} />
    </div>
  );
}

function Skyscraper() {
  // 160×600
  return (
    <div style={{ ...baseFrame, width: 160, height: 600, padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CornerTicks inset={8} size={5} />
      <MarkInline size={56} />
      <div>
        <Meta size={6} color={LIME} gap={4}><span>// PITCH</span></Meta>
        <div style={{ marginTop: 8, fontFamily: "Geist, sans-serif", fontSize: 22, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 0.96, color: FOG, whiteSpace: "pre-line" }}>
          {HEADLINE}
        </div>
        <div style={{ marginTop: 10, fontFamily: "Geist Mono, monospace", fontSize: 7, color: DIM, letterSpacing: "0.18em", lineHeight: 1.6 }}>
          WEB<br />BRAND<br />IT<br />NETWORKS<br />CLOUD
        </div>
      </div>
      <div>
        <CTAPill size={8} />
        <div style={{ marginTop: 10, fontFamily: "Geist Mono, monospace", fontSize: 7, color: DIM, letterSpacing: "0.14em" }}>{URL}</div>
      </div>
    </div>
  );
}

function MobileBanner() {
  // 320×50
  return (
    <div style={{ ...baseFrame, width: 320, height: 50, padding: "8px 12px", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "center" }}>
      <MarkInline size={34} />
      <div style={{ fontFamily: "Geist, sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1, color: FOG }}>
        One team. One invoice.
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 7.5, color: DIM, letterSpacing: "0.12em", marginTop: 2, fontWeight: 500 }}>JTM CONSULTING</div>
      </div>
      <CTAPill size={8} />
    </div>
  );
}

function HalfPage() {
  // 300×600
  return (
    <div style={{ ...baseFrame, width: 300, height: 600, padding: 22, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CornerTicks inset={12} size={7} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <MarkInline size={64} />
        <Meta size={7} gap={6} color={LIME}><span>// AD</span></Meta>
      </div>
      <div>
        <Meta size={8} color={LIME}><span>WHY US</span></Meta>
        <div style={{ marginTop: 12, fontFamily: "Geist, sans-serif", fontSize: 38, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 0.96, color: FOG, whiteSpace: "pre-line" }}>
          {HEADLINE}
        </div>
        <div style={{ marginTop: 14, fontFamily: "Geist, sans-serif", fontSize: 13, color: MUTE, letterSpacing: "-0.005em" }}>
          Small business, done right.
        </div>
        <div style={{ marginTop: 14, fontFamily: "Geist Mono, monospace", fontSize: 8, color: DIM, letterSpacing: "0.18em", lineHeight: 1.7 }}>
          WEB · BRAND<br />IT · NETWORKS<br />CLOUD
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <CTAPill size={10} />
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 8, color: DIM, letterSpacing: "0.14em" }}>{URL}</div>
      </div>
    </div>
  );
}

// =============================================================
// CANVAS
// =============================================================
function App() {
  const { DesignCanvas, DCSection, DCArtboard } = window;
  return (
    <DesignCanvas
      title="JTM Consulting — Marketing Asset Pack"
      subtitle="JTM Monogram lockup · pure brand · global · ready to export"
    >
      <DCSection id="meta" title="Mark · Reference">
        <DCArtboard id="ref-mark" label="JTM monogram" width={400} height={400}>
          <div style={{ width: 400, height: 400, background: INK, display: "grid", placeItems: "center" }}>
            <MarkInline size={280} />
          </div>
        </DCArtboard>
        <DCArtboard id="ref-wordmark" label="Wordmark" width={600} height={400}>
          <div style={{ width: 600, height: 400, background: INK, display: "grid", placeItems: "center" }}>
            <Wordmark size="lg" />
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="social" title="Facebook / Instagram">
        <DCArtboard id="ig-square" label="Feed square · 1080×1080" width={1080} height={1080}>
          <IGSquare />
        </DCArtboard>
        <DCArtboard id="ig-story" label="Story · 1080×1920" width={1080} height={1920}>
          <IGStory />
        </DCArtboard>
        <DCArtboard id="og-card" label="OG / link card · 1200×630" width={1200} height={630}>
          <OGCard />
        </DCArtboard>
      </DCSection>

      <DCSection id="rda" title="Google Responsive Display Ads">
        <DCArtboard id="g-logo" label="Logo · 1200×1200 (1:1)" width={1200} height={1200}>
          <GoogleLogo />
        </DCArtboard>
        <DCArtboard id="g-marketing" label="Marketing image · 1200×628 (1.91:1)" width={1200} height={628}>
          <GoogleMarketing />
        </DCArtboard>
        <DCArtboard id="g-square" label="Square marketing · 1200×1200" width={1200} height={1200}>
          <GoogleSquare />
        </DCArtboard>
        <DCArtboard id="g-portrait" label="Portrait · 480×600 (4:5)" width={480} height={600}>
          <GooglePortrait />
        </DCArtboard>
        <DCArtboard id="g-copy" label="Copy deck · headlines & descriptions" width={1200} height={800}>
          <GoogleCopyRef />
        </DCArtboard>
      </DCSection>

      <DCSection id="static" title="Static Display Banners">
        <DCArtboard id="b-300x250" label="Medium Rectangle · 300×250" width={300} height={250}>
          <MediumRect />
        </DCArtboard>
        <DCArtboard id="b-728x90" label="Leaderboard · 728×90" width={728} height={90}>
          <Leaderboard />
        </DCArtboard>
        <DCArtboard id="b-160x600" label="Skyscraper · 160×600" width={160} height={600}>
          <Skyscraper />
        </DCArtboard>
        <DCArtboard id="b-320x50" label="Mobile Banner · 320×50" width={320} height={50}>
          <MobileBanner />
        </DCArtboard>
        <DCArtboard id="b-300x600" label="Half Page · 300×600" width={300} height={600}>
          <HalfPage />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
