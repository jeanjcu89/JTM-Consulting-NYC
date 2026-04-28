/* global React */
const { useState } = React;

function PortfolioPage({ openIntake }) {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const cases = [
    {
      id: "imagine-swimming",
      client: "Imagine Swimming",
      industry: "Education / Youth Sports",
      tags: ["web", "brand", "seo", "it"],
      tagline: "NYC's largest swim school, now running on rails.",
      summary: "Rebuilt the parent-facing booking experience, modernized the back-office IT stack across 5 pool locations, and tuned local SEO so they own 'NYC swim lessons' in search.",
      stats: [
        { num: "+34%", label: "Online registrations YoY" },
        { num: "5", label: "Locations on one stack" },
        { num: "#1", label: "'NYC swim lessons' rank" },
      ],
      services: ["Web design", "Branding", "Local SEO", "IT support"],
      duration: "8 weeks + ongoing",
      year: "2025",
      hue: 200,
    },
    {
      id: "123-auto",
      client: "123 Auto Group NYC",
      industry: "Automotive / Retail",
      tags: ["web", "seo", "net"],
      tagline: "From walk-ins only to a digital-first dealership.",
      summary: "New inventory-driven website with VIN-level SEO pages, lead routing into their CRM, and a hardened showroom network that survives a Brooklyn winter.",
      stats: [
        { num: "+212%", label: "Web-sourced leads" },
        { num: "$0", label: "Network downtime, 9 mo." },
        { num: "1,400+", label: "Indexed VDP pages" },
      ],
      services: ["Web design", "SEO", "Networking"],
      duration: "6 weeks",
      year: "2025",
      hue: 130,
    },
    {
      id: "manhattan-makos",
      client: "Manhattan Makos",
      industry: "Sports / Membership",
      tags: ["web", "brand"],
      tagline: "A swim team brand parents are proud to wear.",
      summary: "Full identity refresh, a registration-driven site that handles meet sign-ups and apparel, and a parent portal that doesn't make anyone email a PDF.",
      stats: [
        { num: "+58%", label: "Season registrations" },
        { num: "0", label: "PDFs emailed back" },
        { num: "3 wks", label: "Concept to launch" },
      ],
      services: ["Branding", "Web design", "E-commerce"],
      duration: "3 weeks",
      year: "2025",
      hue: 130,
    },
    {
      id: "imperium-cleaning",
      client: "Imperium Cleaning",
      industry: "Commercial services",
      tags: ["web", "seo", "brand"],
      tagline: "Quietly took over the LinkedIn search results for office cleaning.",
      summary: "New brand system, a quote-flow site built for B2B procurement, and a content engine targeting NYC commercial property managers.",
      stats: [
        { num: "+9.4×", label: "Quote requests, 6 mo." },
        { num: "Top 3", label: "'NYC office cleaning'" },
        { num: "47", label: "B2B accounts opened" },
      ],
      services: ["Branding", "Web design", "SEO"],
      duration: "5 weeks",
      year: "2024",
      hue: 130,
    },
    {
      id: "constructora-chic",
      client: "Constructora Chic SRL",
      industry: "Construction",
      tags: ["web", "brand", "cloud"],
      tagline: "A bilingual construction firm with a portfolio that closes deals.",
      summary: "Rebuilt the bilingual EN/ES marketing site with a project gallery that owners actually update, plus a cloud-backed file system that crews on-site can use without IT.",
      stats: [
        { num: "EN/ES", label: "Bilingual, fully indexed" },
        { num: "+3", label: "Major bids won post-launch" },
        { num: "0 hrs", label: "Of training needed" },
      ],
      services: ["Web design", "Branding", "Cloud setup"],
      duration: "7 weeks",
      year: "2024",
      hue: 200,
    },
  ];

  const filters = [
    { id: "all", label: "All work" },
    { id: "web", label: "Web" },
    { id: "brand", label: "Branding" },
    { id: "seo", label: "Marketing" },
    { id: "it", label: "IT" },
    { id: "net", label: "Networking" },
    { id: "cloud", label: "Cloud" },
  ];

  const visible = filter === "all" ? cases : cases.filter((c) => c.tags.includes(filter));

  return (
    <div className="page page-portfolio">
      <section className="page-hero">
        <div className="container">
          <div className="mono-tag">// SELECTED WORK</div>
          <h1 className="h-display page-hero-title">
            Real businesses.<br/>
            <span className="glow-text">Real receipts.</span>
          </h1>
          <p className="page-hero-sub">
            Six case studies from the last 18 months. Click any one to read the full story —
            scope, decisions, what worked, what we'd do differently.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-row">
            <span className="mono">// FILTER</span>
            <div className="filter-chips">
              {filters.map((f) => (
                <button
                  key={f.id}
                  className={"filter-chip " + (filter === f.id ? "active" : "")}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <span className="mono filter-count">{visible.length.toString().padStart(2, "0")} / {cases.length.toString().padStart(2, "0")}</span>
          </div>

          <div className="case-grid">
            {visible.map((c, i) => (
              <article
                className={"case-card " + (i === 0 ? "case-card-large" : "")}
                key={c.id}
                onClick={() => setSelected(c)}
                style={{ "--hue": c.hue }}
              >
                <div className="case-thumb">
                  <div className="case-thumb-grid" />
                  <div className="case-thumb-mark">
                    {c.client.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="case-thumb-meta">
                    <span className="mono">// {c.industry}</span>
                    <span className="mono">'{c.year.slice(-2)}</span>
                  </div>
                </div>
                <div className="case-body">
                  <div className="case-client">{c.client}</div>
                  <h3 className="case-tagline">{c.tagline}</h3>
                  <div className="case-services">
                    {c.services.map((s) => (
                      <span key={s} className="case-service-tag">{s}</span>
                    ))}
                  </div>
                  <div className="case-stats-row">
                    {c.stats.slice(0, 2).map((s, idx) => (
                      <div key={idx} className="case-stat">
                        <div className="case-stat-num">{s.num}</div>
                        <div className="mono">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selected && <CaseModal caseStudy={selected} onClose={() => setSelected(null)} openIntake={openIntake} />}

      <section className="section cta-section">
        <div className="container cta-inner">
          <div className="cta-eyebrow mono-tag">// COULD BE YOU NEXT</div>
          <h2 className="h-display cta-title">
            Your story,<br/>
            <span className="glow-text">our next case.</span>
          </h2>
          <button className="btn btn-primary cta-btn" onClick={openIntake}>
            Start a project →
          </button>
        </div>
      </section>
    </div>
  );
}

function CaseModal({ caseStudy: c, onClose, openIntake }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet case-modal" onClick={(e) => e.stopPropagation()} style={{ "--hue": c.hue }}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="case-modal-hero">
          <div className="case-thumb-grid" />
          <div className="case-modal-mark">
            {c.client.split(" ").map(w => w[0]).join("").slice(0, 2)}
          </div>
        </div>
        <div className="case-modal-body">
          <div className="mono-tag">// CASE STUDY / {c.industry.toUpperCase()}</div>
          <h2 className="h-section case-modal-title">{c.client}</h2>
          <p className="case-modal-tagline">{c.tagline}</p>

          <div className="case-modal-stats">
            {c.stats.map((s, i) => (
              <div className="case-stat-big" key={i}>
                <div className="case-stat-big-num">{s.num}</div>
                <div className="mono">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="case-modal-grid">
            <div>
              <div className="mono" style={{ marginBottom: 12 }}>// SUMMARY</div>
              <p className="case-modal-summary">{c.summary}</p>
            </div>
            <div className="case-modal-meta">
              <div className="meta-row">
                <div className="mono">SERVICES</div>
                <div className="case-services" style={{ marginTop: 8 }}>
                  {c.services.map((s) => <span key={s} className="case-service-tag">{s}</span>)}
                </div>
              </div>
              <div className="meta-row">
                <div className="mono">DURATION</div>
                <div className="meta-value" style={{ fontSize: 18 }}>{c.duration}</div>
              </div>
              <div className="meta-row" style={{ borderBottom: "none", paddingBottom: 0 }}>
                <div className="mono">YEAR</div>
                <div className="meta-value" style={{ fontSize: 18 }}>{c.year}</div>
              </div>
            </div>
          </div>

          <button className="btn btn-primary" onClick={() => { onClose(); openIntake(); }} style={{ marginTop: 32 }}>
            Start a project like this →
          </button>
        </div>
      </div>
    </div>
  );
}

window.JTM = window.JTM || {};
window.JTM.PortfolioPage = PortfolioPage;
