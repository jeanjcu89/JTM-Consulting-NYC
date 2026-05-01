/* global React, htmlToImage */
// =============================================================
// JTM Marketing Asset Pack — Exporter
// Renders each artboard as a downloadable <img> at native pixel
// size. Right-click → Save Image As… on each, or use the
// "Save all" button which opens each in a new tab for saving.
// =============================================================

const EXPORT_LIST = [
  { id: "ref-mark",    file: "01-jtm-mark-400.png" },
  { id: "ref-wordmark",file: "02-jtm-wordmark-600.png" },
  { id: "ig-square",   file: "fb-ig-feed-1080.png" },
  { id: "ig-story",    file: "fb-ig-story-1080x1920.png" },
  { id: "og-card",     file: "og-link-card-1200x630.png" },
  { id: "g-logo",      file: "google-logo-1200.png" },
  { id: "g-marketing", file: "google-marketing-1200x628.png" },
  { id: "g-square",    file: "google-square-1200.png" },
  { id: "g-portrait",  file: "google-portrait-480x600.png" },
  { id: "g-copy",      file: "google-copy-deck-1200x800.png" },
  { id: "b-300x250",   file: "banner-medium-rect-300x250.png" },
  { id: "b-728x90",    file: "banner-leaderboard-728x90.png" },
  { id: "b-160x600",   file: "banner-skyscraper-160x600.png" },
  { id: "b-320x50",    file: "banner-mobile-320x50.png" },
  { id: "b-300x600",   file: "banner-half-page-300x600.png" },
];

function findCard(id) {
  const slot = document.querySelector(`[data-dc-slot="${id}"]`);
  if (!slot) return null;
  return slot.querySelector(".dc-card");
}

async function captureDataUrl(node) {
  // Two passes — first warms up font/image loading, second is the keeper.
  await htmlToImage.toPng(node, { pixelRatio: 1, backgroundColor: "#050505", cacheBust: true });
  return await htmlToImage.toPng(node, { pixelRatio: 1, backgroundColor: "#050505", cacheBust: true });
}

function ExportPanel() {
  const [open, setOpen] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [results, setResults] = React.useState([]); // [{file, dataUrl}]
  const [progress, setProgress] = React.useState({ done: 0, total: 0 });

  const renderAll = async () => {
    setBusy(true);
    setResults([]);
    const out = [];
    for (let i = 0; i < EXPORT_LIST.length; i++) {
      const item = EXPORT_LIST[i];
      setProgress({ done: i, total: EXPORT_LIST.length });
      const node = findCard(item.id);
      if (!node) continue;
      try {
        const dataUrl = await captureDataUrl(node);
        out.push({ ...item, dataUrl });
        setResults([...out]);
      } catch (e) {
        console.warn("export failed for", item.id, e);
      }
      await new Promise(r => setTimeout(r, 100));
    }
    setProgress({ done: out.length, total: EXPORT_LIST.length });
    setBusy(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9999,
          background: "#c2ff3d", color: "#0a0a0a",
          fontFamily: "Geist Mono, monospace", fontSize: 12, fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          border: "none", borderRadius: 6, padding: "12px 18px",
          cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,.4)",
        }}>
        Export PNGs ↓
      </button>
    );
  }

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 9999,
      width: 380, maxHeight: "84vh", overflow: "auto",
      background: "#0f0f0f", border: "1px solid #2a2a2a", borderRadius: 8,
      color: "#f5f5f4", fontFamily: "Geist Mono, monospace", fontSize: 11,
      boxShadow: "0 16px 48px rgba(0,0,0,.6)",
    }}>
      <div style={{
        position: "sticky", top: 0, zIndex: 2, background: "#0f0f0f",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 16px", borderBottom: "1px solid #1f1f1f",
      }}>
        <div style={{ letterSpacing: "0.14em", fontWeight: 700, color: "#c2ff3d" }}>// EXPORT</div>
        <button onClick={() => setOpen(false)}
          style={{ background: "transparent", border: "none", color: "#6b6b68", cursor: "pointer", fontSize: 16 }}>×</button>
      </div>

      <div style={{ padding: "12px 16px" }}>
        <button
          onClick={renderAll}
          disabled={busy}
          style={{
            width: "100%", background: "#c2ff3d", color: "#0a0a0a",
            border: "none", borderRadius: 4, padding: "10px 12px",
            fontFamily: "inherit", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.14em", textTransform: "uppercase",
            cursor: busy ? "wait" : "pointer", opacity: busy ? 0.6 : 1,
          }}>
          {busy ? `Rendering ${progress.done}/${progress.total}…` : (results.length ? "Re-render all" : "Render all 15 PNGs")}
        </button>

        <div style={{ marginTop: 12, color: "#9a9a96", lineHeight: 1.55, fontSize: 10 }}>
          After rendering, <span style={{ color: "#c2ff3d" }}>right-click each preview → "Save Image As…"</span> to download at native resolution. Or click the link to open in a new tab.
        </div>

        {results.length > 0 && (
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
            {results.map(item => (
              <div key={item.id} style={{ display: "flex", flexDirection: "column", gap: 6, paddingBottom: 12, borderBottom: "1px solid #1a1a1a" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                  <a href={item.dataUrl} target="_blank" rel="noopener"
                    download={item.file}
                    style={{ color: "#c2ff3d", textDecoration: "none", fontSize: 10, letterSpacing: "0.04em", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    ↓ {item.file}
                  </a>
                </div>
                <a href={item.dataUrl} target="_blank" rel="noopener" download={item.file}
                  style={{ display: "block", background: "#050505", borderRadius: 3, overflow: "hidden", border: "1px solid #1a1a1a" }}>
                  <img src={item.dataUrl} alt={item.file}
                    style={{ display: "block", width: "100%", height: "auto" }} />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Mount once the marketing canvas root is up.
function mountExporter() {
  if (document.getElementById("__jtm-exporter")) return;
  const host = document.createElement("div");
  host.id = "__jtm-exporter";
  document.body.appendChild(host);
  ReactDOM.createRoot(host).render(<ExportPanel />);
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  setTimeout(mountExporter, 200);
} else {
  window.addEventListener("DOMContentLoaded", () => setTimeout(mountExporter, 200));
}
