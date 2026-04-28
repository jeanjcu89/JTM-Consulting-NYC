/* global React */
const { useState } = React;

function ServicesPage({ openIntake }) {
  const [billing, setBilling] = useState("project"); // project | retainer
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: "web",
      num: "01",
      name: "Web design & development",
      lead: "Sites that load in under a second and convert visitors into customers.",
      includes: [
        "Custom design (no templates)",
        "Mobile-first responsive build",
        "CMS so you can edit copy yourself",
        "Analytics + conversion tracking",
        "Hosting setup + 30-day warranty",
      ],
      starting: "$4,800",
      timeline: "3–4 weeks",
    },
    {
      id: "brand",
      num: "02",
      name: "Branding & identity",
      lead: "Logo, color, type, voice — a system you can actually run yourself.",
      includes: [
        "Logo + 3 lockup variations",
        "Color palette + type system",
        "Brand guidelines PDF",
        "Business card + letterhead",
        "Social media templates",
      ],
      starting: "$2,800",
      timeline: "2–3 weeks",
    },
    {
      id: "seo",
      num: "03",
      name: "SEO & marketing",
      lead: "Get found by people in your zip code searching for what you do.",
      includes: [
        "Local SEO audit & fix-list",
        "Google Business Profile setup",
        "On-page SEO + schema markup",
        "Content calendar (3 mo.)",
        "Monthly performance reporting",
      ],
      starting: "$1,400/mo",
      timeline: "Ongoing",
    },
    {
      id: "it",
      num: "04",
      name: "IT support & help-desk",
      lead: "One number for every laptop, printer, login, and Wi-Fi mystery.",
      includes: [
        "Same-day response (M–F)",
        "Remote + on-site for NYC clients",
        "Endpoint security + backups",
        "Email & SaaS administration",
        "Quarterly health review",
      ],
      starting: "$650/mo",
      timeline: "Ongoing",
    },
    {
      id: "net",
      num: "05",
      name: "Networking",
      lead: "Wi-Fi that doesn't go down at the lunch rush. Wired backbones that last a decade.",
      includes: [
        "Site survey + heatmap",
        "Cisco Meraki / Ubiquiti install",
        "VLAN segmentation + guest network",
        "VPN setup for remote staff",
        "12-month uptime monitoring",
      ],
      starting: "$3,200",
      timeline: "1–2 weeks",
    },
    {
      id: "cloud",
      num: "06",
      name: "Cloud migration",
      lead: "Move email, files, and apps to AWS / Google / Microsoft without losing anything.",
      includes: [
        "Migration planning + risk audit",
        "Data + email migration",
        "Identity + SSO setup",
        "Staff training session",
        "30-day post-migration support",
      ],
      starting: "$3,800",
      timeline: "2–3 weeks",
    },
  ];

  const tiers = [
    {
      name: "Starter",
      tagline: "For solo operators & new businesses",
      project: { price: "5,800", suffix: "one-time", note: "fixed-price project" },
      retainer: { price: "850", suffix: "/ month", note: "12-mo. minimum" },
      features: [
        "1-page or 5-page website",
        "Logo + basic brand kit",
        "Google Business + local SEO",
        "Email + basic IT setup",
        "Slack channel for support",
      ],
      cta: "Start here",
      featured: false,
    },
    {
      name: "Growth",
      tagline: "For established small businesses scaling up",
      project: { price: "14,500", suffix: "one-time", note: "fixed-price project" },
      retainer: { price: "2,400", suffix: "/ month", note: "no minimum after mo. 6" },
      features: [
        "Custom website + CMS",
        "Full brand identity system",
        "SEO + monthly content",
        "Help-desk IT (same-day)",
        "Wi-Fi / network setup",
        "Quarterly strategy review",
      ],
      cta: "Most popular",
      featured: true,
    },
    {
      name: "Scale",
      tagline: "For multi-location or 25+ staff operations",
      project: { price: "Custom", suffix: "scoped to needs", note: "starts at $28k" },
      retainer: { price: "5,800", suffix: "/ month", note: "tiered SLA available" },
      features: [
        "Multi-site web platform",
        "Brand system + creative direction",
        "Paid + organic marketing",
        "Dedicated IT engineer",
        "Networking + cloud architecture",
        "Quarterly C-suite reporting",
        "Priority same-hour support",
      ],
      cta: "Talk to us",
      featured: false,
    },
  ];

  return (
    <div className="page page-services">
      {/* HEADER */}
      <section className="page-hero">
        <div className="container">
          <div className="mono-tag">// SERVICES & PRICING</div>
          <h1 className="h-display page-hero-title">
            Six services.<br/>
            <span className="glow-text">One invoice.</span>
          </h1>
          <p className="page-hero-sub">
            Hire us à la carte for a single project, or bundle into a tier and pay one
            predictable monthly bill for everything.
          </p>
        </div>
      </section>

      {/* SERVICE BREAKDOWN */}
      <section className="section">
        <div className="container">
          <div className="services-split">
            <aside className="services-list">
              <div className="mono-tag" style={{ marginBottom: 24 }}>// EXPLORE</div>
              {services.map((s, i) => (
                <button
                  key={s.id}
                  className={"services-list-item " + (activeService === i ? "active" : "")}
                  onClick={() => setActiveService(i)}
                >
                  <span className="mono service-list-num">{s.num}</span>
                  <span className="service-list-name">{s.name}</span>
                  <span className="service-list-arrow">→</span>
                </button>
              ))}
            </aside>

            <div className="services-detail">
              {(() => {
                const s = services[activeService];
                return (
                  <div key={s.id} className="service-detail-card">
                    <div className="service-detail-head">
                      <div className="mono-tag">// {s.num} / {s.name}</div>
                      <h2 className="h-section" style={{ marginTop: 16 }}>{s.lead}</h2>
                    </div>

                    <div className="service-detail-grid">
                      <div className="service-includes">
                        <div className="mono" style={{ marginBottom: 16 }}>// WHAT'S INCLUDED</div>
                        <ul className="includes-list">
                          {s.includes.map((inc, i) => (
                            <li key={i}>
                              <span className="check">✓</span>
                              {inc}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="service-meta">
                        <div className="meta-row">
                          <div className="mono">STARTING</div>
                          <div className="meta-value">{s.starting}</div>
                        </div>
                        <div className="meta-row">
                          <div className="mono">TIMELINE</div>
                          <div className="meta-value">{s.timeline}</div>
                        </div>
                        <button className="btn btn-primary" onClick={openIntake} style={{ width: "100%", marginTop: 16, justifyContent: "center" }}>
                          Get a quote →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="mono-tag">// BUNDLED PACKAGES</div>
              <div style={{ height: 16 }} />
              <h2 className="h-section">Bundle &<br/>save the headache.</h2>
            </div>
            <p className="section-desc">
              Pick a tier when you need more than one service.
              Toggle project vs. monthly retainer below — same scope, different pace.
            </p>
          </div>

          <div className="billing-toggle">
            <button
              className={"billing-opt " + (billing === "project" ? "active" : "")}
              onClick={() => setBilling("project")}
            >
              One-time project
            </button>
            <button
              className={"billing-opt " + (billing === "retainer" ? "active" : "")}
              onClick={() => setBilling("retainer")}
            >
              Monthly retainer
              <span className="save-tag">— save 18%</span>
            </button>
          </div>

          <div className="tier-grid">
            {tiers.map((t) => {
              const p = billing === "project" ? t.project : t.retainer;
              return (
                <div className={"tier-card " + (t.featured ? "featured" : "")} key={t.name}>
                  {t.featured && <div className="tier-badge">{t.cta}</div>}
                  <div className="tier-name">{t.name}</div>
                  <div className="tier-tagline">{t.tagline}</div>
                  <div className="tier-price-block">
                    <div className="tier-price">
                      {p.price === "Custom" ? <span className="custom-price">Custom</span> : (
                        <>
                          <span className="price-currency">$</span>
                          <span className="price-num">{p.price}</span>
                        </>
                      )}
                      <span className="price-suffix">{p.suffix}</span>
                    </div>
                    <div className="mono price-note">{p.note}</div>
                  </div>

                  <button
                    className={"btn " + (t.featured ? "btn-primary" : "btn-ghost")}
                    onClick={openIntake}
                    style={{ width: "100%", justifyContent: "center", marginBottom: 28 }}
                  >
                    {t.featured ? "Start a project →" : t.cta + " →"}
                  </button>

                  <div className="mono" style={{ marginBottom: 14, color: "var(--fg-mute)" }}>// INCLUDES</div>
                  <ul className="includes-list">
                    {t.features.map((f, i) => (
                      <li key={i}><span className="check">✓</span>{f}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="pricing-fineprint mono">
            ★ All tiers include unlimited revisions during sprint, signed NDA, and a money-back guarantee within 14 days of kickoff.
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="mono-tag">// FAQ</div>
              <div style={{ height: 16 }} />
              <h2 className="h-section">Things people ask.</h2>
            </div>
          </div>
          <div className="faq-list">
            {[
              { q: "Do you lock me into a contract?", a: "No long retainers. Project work is fixed-price. Monthly support has a 6-month minimum, then month-to-month." },
              { q: "Do you outsource the work?", a: "Everything is done by our in-house NYC team. We don't sub anything offshore — that's the whole pitch." },
              { q: "What if I already have a website / IT person / brand?", a: "Great. We integrate with what you have, or we audit it and tell you straight whether it's worth keeping. We'd rather lose the project than oversell." },
              { q: "Can you work with my industry?", a: "We've shipped for restaurants, law firms, dental offices, art studios, retail, and early-stage SaaS. If you're a small business in or near NYC, we can probably help." },
              { q: "How fast can we start?", a: "Most kickoffs happen 1–2 weeks after a signed proposal. Emergency IT clients get same-week onboarding." },
            ].map((f, i) => (
              <Faq key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container cta-inner">
          <div className="cta-eyebrow mono-tag">// READY TO START?</div>
          <h2 className="h-display cta-title">
            Get a real quote<br/>
            in <span className="glow-text">48 hours.</span>
          </h2>
          <button className="btn btn-primary cta-btn" onClick={openIntake}>
            Start a project →
          </button>
        </div>
      </section>
    </div>
  );
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={"faq-item " + (open ? "open" : "")}>
      <button className="faq-q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="faq-icon">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
}

window.JTM = window.JTM || {};
window.JTM.ServicesPage = ServicesPage;
