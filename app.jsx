/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo } = React;

// =========================
// ROUTING
// =========================
const ROUTES = ["home", "services", "portfolio", "about", "contact"];

function useHashRoute() {
  const [route, setRoute] = useState(() => {
    const h = window.location.hash.replace("#/", "");
    return ROUTES.includes(h) ? h : "home";
  });
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#/", "");
      setRoute(ROUTES.includes(h) ? h : "home");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return [route, (r) => {window.location.hash = "#/" + r;}];
}

// =========================
// LAYOUT
// =========================
function Nav({ route, openIntake }) {
  const [open, setOpen] = useState(false);
  const items = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" }];


  // Close mobile menu on route change
  useEffect(() => {setOpen(false);}, [route]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {document.body.style.overflow = "";};
  }, [open]);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#/home" className="nav-logo" onClick={() => setOpen(false)}>
          <span className="nav-logo-mark" aria-label="JTM">
            <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <text x="6" y="22" fontFamily="Geist Mono, ui-monospace, monospace" fontSize="19" fontWeight="700" fill="#0a0a0a">J</text>
              <rect x="16" y="20" width="9" height="3" fill="#0a0a0a" className="nav-logo-blink" />
            </svg>
          </span>
          <span className="nav-logo-text">JTM CONSULTING NYC</span>
          <span className="nav-logo-text-mobile">
</span>
        </a>
        <div className="nav-links nav-links-desktop">
          {items.map((it) => <a
              key={it.id}
              href={"#/" + it.id}
              className={"nav-link " + (route === it.id ? "active" : "")}>
            
              {it.label}
            </a>
          )}
          <button className="btn btn-primary btn-sm" onClick={openIntake} style={{ marginLeft: 12 }}>
            Start a project →
          </button>
        </div>
        <button
          className={"nav-burger " + (open ? "open" : "")}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}>
          <span className="burger-bar" />
          <span className="burger-bar" />
        </button>
      </div>
      {open && ReactDOM.createPortal(
        <div className="nav-mobile-sheet open">
          <div className="nav-mobile-inner">
            {items.map((it, idx) => (
              <a
                key={it.id}
                href={"#/" + it.id}
                className={"nav-mobile-link " + (route === it.id ? "active" : "")}
                onClick={() => setOpen(false)}>
                <span className="nav-mobile-num mono">0{idx + 1}</span>
                <span>{it.label}</span>
                <span className="nav-mobile-arrow">→</span>
              </a>
            ))}
            <button
              className="btn btn-primary"
              onClick={() => { setOpen(false); openIntake(); }}
              style={{ marginTop: 24, justifyContent: "center" }}>
              Start a project →
            </button>
            <div className="nav-mobile-meta">
              <div className="mono" style={{ color: "var(--fg-mute)" }}>// CONTACT</div>
              <a href="mailto:info@jtmconsultingnyc.com">info@jtmconsultingnyc.com</a>
              <a href="tel:+17184315113">(718) 431-5113</a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </nav>);

}

function Footer({ openIntake, go }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="mono" style={{ marginBottom: 18 }}>// READY WHEN YOU ARE</div>
            <h3>Let's build<br />something <span className="glow-text">real.</span></h3>
            <button className="btn btn-primary" onClick={openIntake}>
              Start a project →
            </button>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Services</div>
            <a href="#/services">Web design</a>
            <a href="#/services">Branding</a>
            <a href="#/services">SEO & marketing</a>
            <a href="#/services">IT support</a>
            <a href="#/services">Networking</a>
            <a href="#/services">Cloud migration</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            <a href="#/about">About</a>
            <a href="#/portfolio">Work</a>
            <a href="#/contact">Contact</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Connect</div>
            <a href="mailto:info@jtmconsultingnyc.com">info@jtmconsultingnyc.com</a>
            <a href="tel:+17184315113">(718) 431-5113</a>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 JTM Consulting NYC</span>
          <span>Brooklyn, NY</span>
          <span>v.4.2 — Updated Apr '26</span>
        </div>
      </div>
    </footer>);

}

// Mount
window.JTM = window.JTM || {};
Object.assign(window.JTM, { useHashRoute, Nav, Footer });