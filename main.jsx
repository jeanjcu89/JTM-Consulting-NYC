/* global React, ReactDOM, JTM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSelect */
const { useState } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#c6ff00",
  "accent2": "#00dcff",
  "displayFont": "Geist",
  "monoFont": "Geist Mono",
  "bgMode": "black"
}/*EDITMODE-END*/;

function hexToRgbStr(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

const FONT_PAIRS = {
  "Geist": { display: "Geist", mono: "Geist Mono" },
  "Inter": { display: "Inter", mono: "JetBrains Mono" },
  "Space Grotesk": { display: "Space Grotesk", mono: "Space Mono" },
  "IBM Plex": { display: "IBM Plex Sans", mono: "IBM Plex Mono" },
  "DM Sans": { display: "DM Sans", mono: "DM Mono" },
};

function App() {
  const [route, go] = JTM.useHashRoute();
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to root
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", tweaks.accent);
    root.style.setProperty("--accent-2", tweaks.accent2);
    root.style.setProperty("--accent-rgb", hexToRgbStr(tweaks.accent));
    root.style.setProperty("--accent-2-rgb", hexToRgbStr(tweaks.accent2));

    const pair = FONT_PAIRS[tweaks.displayFont] || FONT_PAIRS["Geist"];
    root.style.setProperty("--font-display", `"${pair.display}", system-ui, sans-serif`);
    root.style.setProperty("--font-body", `"${pair.display}", system-ui, sans-serif`);
    root.style.setProperty("--font-mono", `"${pair.mono}", ui-monospace, monospace`);

    if (tweaks.bgMode === "navy") {
      root.style.setProperty("--bg", "#080d1a");
      root.style.setProperty("--bg-elev", "#0e1424");
      root.style.setProperty("--bg-elev-2", "#141a2c");
      root.style.setProperty("--border", "#1a2238");
      root.style.setProperty("--border-strong", "#26304a");
    } else if (tweaks.bgMode === "graphite") {
      root.style.setProperty("--bg", "#0e0e10");
      root.style.setProperty("--bg-elev", "#16161a");
      root.style.setProperty("--bg-elev-2", "#1c1c22");
      root.style.setProperty("--border", "#24242a");
      root.style.setProperty("--border-strong", "#30303a");
    } else {
      root.style.setProperty("--bg", "#0a0a0a");
      root.style.setProperty("--bg-elev", "#111111");
      root.style.setProperty("--bg-elev-2", "#161616");
      root.style.setProperty("--border", "#1f1f1f");
      root.style.setProperty("--border-strong", "#2a2a2a");
    }
  }, [tweaks]);

  const openIntake = () => setIntakeOpen(true);
  const closeIntake = () => setIntakeOpen(false);

  let Page;
  switch (route) {
    case "services":  Page = JTM.ServicesPage; break;
    case "portfolio": Page = JTM.PortfolioPage; break;
    case "about":     Page = JTM.AboutPage; break;
    case "contact":   Page = JTM.ContactPage; break;
    default:          Page = JTM.HomePage;
  }

  return (
    <>
      <div className="grain" />
      <JTM.Nav route={route} openIntake={openIntake} />
      <Page openIntake={openIntake} go={go} />
      <JTM.Footer openIntake={openIntake} go={go} />
      {intakeOpen && <JTM.IntakeModal onClose={closeIntake} />}

      <TweaksPanel title="Tweaks">
        <TweakSection title="Accent">
          <TweakColor label="Primary accent" value={tweaks.accent} onChange={(v) => setTweak("accent", v)} />
          <TweakColor label="Secondary accent" value={tweaks.accent2} onChange={(v) => setTweak("accent2", v)} />
        </TweakSection>

        <TweakSection title="Background">
          <TweakRadio
            label="Tone"
            value={tweaks.bgMode}
            onChange={(v) => setTweak("bgMode", v)}
            options={[
              { value: "black", label: "Pure black" },
              { value: "graphite", label: "Graphite" },
              { value: "navy", label: "Deep navy" },
            ]}
          />
        </TweakSection>

        <TweakSection title="Type">
          <TweakSelect
            label="Font pairing"
            value={tweaks.displayFont}
            onChange={(v) => setTweak("displayFont", v)}
            options={[
              { value: "Geist", label: "Geist + Geist Mono" },
              { value: "Inter", label: "Inter + JetBrains Mono" },
              { value: "Space Grotesk", label: "Space Grotesk + Space Mono" },
              { value: "IBM Plex", label: "IBM Plex Sans + Mono" },
              { value: "DM Sans", label: "DM Sans + DM Mono" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
