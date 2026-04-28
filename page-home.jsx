/* global React */
const { useState, useEffect, useRef } = React;

// =========================
// ANIMATED HERO
// =========================
function HeroCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Read accent from CSS var
    const accentRaw = getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim() || "198, 255, 0";
    const accent2Raw = getComputedStyle(document.documentElement).getPropertyValue("--accent-2-rgb").trim() || "0, 220, 255";

    // Particle / network nodes
    const nodes = [];
    const NODE_COUNT = 64;
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0008,
        vy: (Math.random() - 0.5) * 0.0008,
        r: Math.random() * 1.6 + 0.4,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const mouse = { x: 0.5, y: 0.5, active: false };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    let t = 0;
    const tick = () => {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      // Update nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
        n.pulse += 0.03;
      }

      // Draw connections
      const maxDist = 0.18;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.35;
            ctx.strokeStyle = `rgba(${accentRaw}, ${alpha * 0.6})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x * W, a.y * H);
            ctx.lineTo(b.x * W, b.y * H);
            ctx.stroke();
          }
        }
      }

      // Mouse influence: connect nearest nodes to cursor
      if (mouse.active) {
        for (const n of nodes) {
          const dx = n.x - mouse.x, dy = n.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 0.22) {
            const alpha = (1 - d / 0.22) * 0.7;
            ctx.strokeStyle = `rgba(${accent2Raw}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x * W, n.y * H);
            ctx.lineTo(mouse.x * W, mouse.y * H);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const pulse = 1 + Math.sin(n.pulse) * 0.3;
        ctx.fillStyle = `rgba(${accentRaw}, 0.9)`;
        ctx.beginPath();
        ctx.arc(n.x * W, n.y * H, n.r * pulse, 0, Math.PI * 2);
        ctx.fill();
        // halo
        ctx.fillStyle = `rgba(${accentRaw}, 0.08)`;
        ctx.beginPath();
        ctx.arc(n.x * W, n.y * H, n.r * pulse * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" />;
}

// Rotating typewriter words
function RotatingWord({ words, interval = 2400 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words, interval]);
  return (
    <span className="rot-word-wrap">
      {words.map((w, idx) => (
        <span
          key={idx}
          className={"rot-word " + (idx === i ? "active" : "")}
          aria-hidden={idx !== i}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

// LIVE TICKER
function Ticker() {
  const items = [
    "BUILDING SINCE 2020",
    "15 CLIENTS LAUNCHED",
    "BROOKLYN → MANHATTAN → QUEENS",
    "NO RETAINER LOCK-INS",
    "IN-HOUSE ENGINEERS + DESIGNERS",
    "SAME-DAY RESPONSE GUARANTEE",
    "CISCO + AWS + GOOGLE PARTNER",
  ];
  const all = [...items, ...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {all.map((t, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// CLIENT LOGOS (placeholder wordmarks)
function ClientLogos() {
  const logos = [
    "IMAGINE SWIMMING", "123 AUTO GROUP", "MANHATTAN MAKOS",
    "IMPERIUM CLEANING", "CONSTRUCTORA CHIC",
  ];
  return (
    <div className="logo-grid">
      {logos.map((l, i) => (
        <div key={i} className="logo-cell">{l}</div>
      ))}
    </div>
  );
}

function HomePage({ openIntake, go }) {
  const services = [
    { num: "01", name: "Web design", desc: "Sites that convert. Fast, accessible, on-brand." },
    { num: "02", name: "Branding", desc: "Identity systems built for small businesses with big plans." },
    { num: "03", name: "SEO & marketing", desc: "Get found locally. Rank, retarget, retain." },
    { num: "04", name: "IT support", desc: "Help-desk on speed dial. Same-day response, period." },
    { num: "05", name: "Networking", desc: "Wired or mesh — networks that don't drop at noon." },
    { num: "06", name: "Cloud migration", desc: "AWS, Google, Microsoft. Move fast, don't break things." },
  ];

  const testimonials = [
    {
      quote: "JTM rebuilt our parent portal and refreshed our identity in eight weeks. Registrations jumped 34% the next season — and our front desk stopped fielding tech complaints.",
      author: "Imagine Swimming",
      role: "NYC swim school",
    },
    {
      quote: "I'd been juggling three IT vendors and a rotating cast of web freelancers. JTM gave us one number. Showroom hasn't gone down once since.",
      author: "123 Auto Group NYC",
      role: "Brooklyn dealership",
    },
    {
      quote: "From the team logo to the registration site to our cloud file storage — they did it all without us learning a single new dashboard.",
      author: "Manhattan Makos",
      role: "Youth swim team",
    },
  ];

  return (
    <div className="page page-home">
      {/* HERO */}
      <section className="hero">
        <HeroCanvas />
        <div className="hero-grid-overlay" />
        <div className="container hero-inner">
          <div className="hero-meta">
            <span className="mono-tag">// JTM CONSULTING — EST. 2018, NYC</span>
            <span className="hero-status">
              <span className="status-dot" />
              <span className="mono">ACCEPTING NEW CLIENTS — Q2 '26</span>
            </span>
          </div>
          <h1 className="h-display hero-title">
            We build the<br />
            <span className="glow-text">digital backbone</span><br />
            for{" "}
            <RotatingWord words={["small businesses.", "delis & shops.", "law firms.", "studios.", "the next NYC.", "you."]} />
          </h1>
          <p className="hero-sub">
            One team for your website, brand, marketing, network, and IT.
            Built in Brooklyn for the businesses that make NYC actually work.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={openIntake}>
              Start a project →
            </button>
            <a className="btn btn-ghost" href="#/services">
              See services & pricing
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">15</div>
              <div className="mono">Businesses launched</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">99.94%</div>
              <div className="mono">Network uptime</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">2.4×</div>
              <div className="mono">Avg. lead lift, year 1</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">6 yrs</div>
              <div className="mono">In NYC, no offshore</div>
            </div>
          </div>
        </div>
        <div className="hero-bottom-bar">
          <span className="mono">SCROLL TO EXPLORE</span>
          <span className="scroll-line" />
        </div>
      </section>

      <Ticker />

      {/* CLIENT LOGOS */}
      <section className="section section-tight">
        <div className="container">
          <div className="divider-row">// TRUSTED BY NYC SMALL BUSINESSES</div>
          <div style={{ height: 48 }} />
          <ClientLogos />
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="mono-tag">// 01 / SERVICES</div>
              <div style={{ height: 16 }} />
              <h2 className="h-section">One vendor.<br/>Six disciplines.</h2>
            </div>
            <p className="section-desc">
              You shouldn't need a project manager just to run your business.
              We're the agency, the IT department, and the marketing team — all on one invoice,
              all picking up the same phone.
            </p>
          </div>

          <div className="service-grid">
            {services.map((s) => (
              <a href="#/services" key={s.num} className="service-card">
                <div className="service-num mono">{s.num}</div>
                <h3 className="h-card">{s.name}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-arrow">→</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="mono-tag">// 02 / PROCESS</div>
              <div style={{ height: 16 }} />
              <h2 className="h-section">Four weeks,<br/>not four months.</h2>
            </div>
            <p className="section-desc">
              Most agencies sell you a 90-day discovery. We don't.
              Here's how a project actually moves at JTM.
            </p>
          </div>

          <div className="process-rail">
            {[
              { n: "01", t: "Free 30-min consult", d: "We listen. You leave with a one-page action plan whether you hire us or not.", w: "Day 1" },
              { n: "02", t: "Fixed-price proposal", d: "No hourly billing surprises. You see every line item before we start.", w: "Day 3" },
              { n: "03", t: "Build sprint", d: "Daily Slack, weekly demo. We don't disappear and surface 6 weeks later.", w: "Week 1–3" },
              { n: "04", t: "Launch + own it", d: "We hand you the keys. Optional support retainer, never required.", w: "Week 4" },
            ].map((p) => (
              <div className="process-step" key={p.n}>
                <div className="process-when mono">{p.w}</div>
                <div className="process-num">{p.n}</div>
                <h4 className="process-title">{p.t}</h4>
                <p className="process-desc">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="mono-tag">// 03 / WHAT THEY SAY</div>
              <div style={{ height: 16 }} />
              <h2 className="h-section">Receipts.</h2>
            </div>
            <p className="section-desc">
              We're picky about who we work with so the people who hire us actually like us.
              No paid testimonials, no fake reviews — just owners we still grab coffee with.
            </p>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((t, i) => (
              <figure className="testimonial" key={i}>
                <div className="quote-mark">"</div>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <div className="t-author">{t.author}</div>
                  <div className="mono t-role">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container cta-inner">
          <div className="cta-eyebrow mono-tag">// READY TO START?</div>
          <h2 className="h-display cta-title">
            Tell us what's<br/>
            <span className="glow-text">broken.</span>
          </h2>
          <p className="cta-sub">
            Three questions. Two minutes. We'll send back a real plan within 48 hours.
          </p>
          <button className="btn btn-primary cta-btn" onClick={openIntake}>
            Start a project →
          </button>
        </div>
      </section>
    </div>
  );
}

window.JTM = window.JTM || {};
window.JTM.HomePage = HomePage;
