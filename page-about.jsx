/* global React */
const { useState } = React;

function AboutPage({ openIntake }) {
  const team = [
    { name: "Jordan T. Mercer", role: "Founder / Strategy", bio: "Ex-IBM consultant, raised in Queens. Started JTM in 2020 after watching his uncle's deli get burned by three different agencies in a single year.", initials: "JM" },
    { name: "Sara Okafor", role: "Design Lead", bio: "Brand systems for everything from food trucks to law firms. Believes good design is just clear thinking, made visual.", initials: "SO" },
    { name: "Rafael Vega", role: "Lead Engineer", bio: "Full-stack + DevOps. Has personally rescued 41 small businesses from ransomware. Will not shut up about Linux.", initials: "RV" },
    { name: "Mei Chen", role: "Head of Marketing", bio: "Local SEO obsessive. Got a bagel shop ranking above the New York Times for a long-tail keyword. We're still bragging about it.", initials: "MC" },
  ];

  const values = [
    { num: "01", title: "Pick up the phone.", desc: "Every client has our cell. Same-day reply, period. If we can't, we'll tell you when we can — to the hour." },
    { num: "02", title: "Show the work.", desc: "Demo every Friday during build sprints. No black boxes, no '90-day discovery' to justify the bill." },
    { num: "03", title: "Own the outcome.", desc: "If we built it and it broke, we fix it. No 'that's a third-party plugin' shrug. The buck stops with us." },
    { num: "04", title: "Tell the truth.", desc: "We've talked clients out of redesigns, new brands, and full retainers. The good ones come back when they actually need us." },
  ];

  return (
    <div className="page page-about">
      <section className="page-hero">
        <div className="container">
          <div className="mono-tag">// ABOUT</div>
          <h1 className="h-display page-hero-title">
            We're four people<br/>
            who <span className="glow-text">answer the phone.</span>
          </h1>
          <p className="page-hero-sub">
            Founded in 2020 above a barber shop in Bushwick. We've stayed small on purpose
            so every client gets the people whose names are on the proposal — not a
            rotating cast of account managers.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="section">
        <div className="container">
          <div className="story-grid">
            <div>
              <div className="mono-tag">// THE STORY</div>
              <h2 className="h-section" style={{ marginTop: 16, marginBottom: 32 }}>
                Started because<br/>nobody else would.
              </h2>
            </div>
            <div className="story-text">
              <p>
                In 2017, our founder Jordan was helping his uncle reopen a deli in Astoria.
                The old website didn't work. The Wi-Fi at the register died twice a day.
                The "branding agency" had ghosted with the deposit.
              </p>
              <p>
                He called three different vendors — one for the site, one for the network,
                one for the brand — and ended up project-managing all of them himself.
                It cost twice the budget and took four times as long.
              </p>
              <p>
                <span className="glow-text">JTM is the company he wishes had existed back then.</span> One team,
                one invoice, one phone number. No outsourcing, no hand-offs, no surprises.
                Eight years later, we still do it the same way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="section section-tight stats-band">
        <div className="container">
          <div className="stats-row">
            <div className="stat-big">
              <div className="stat-big-num">2020</div>
              <div className="mono">Founded in NYC</div>
            </div>
            <div className="stat-big">
              <div className="stat-big-num">15</div>
              <div className="mono">Businesses launched</div>
            </div>
            <div className="stat-big">
              <div className="stat-big-num">4</div>
              <div className="mono">In-house team, no offshore</div>
            </div>
            <div className="stat-big">
              <div className="stat-big-num">$0</div>
              <div className="mono">Spent on outbound sales</div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="mono-tag">// HOW WE WORK</div>
              <div style={{ height: 16 }} />
              <h2 className="h-section">Four rules.<br/>Non-negotiable.</h2>
            </div>
            <p className="section-desc">
              These aren't aspirational values stapled to the office wall.
              We've fired clients over them and walked away from money over them.
            </p>
          </div>
          <div className="values-grid">
            {values.map((v) => (
              <div className="value-card" key={v.num}>
                <div className="mono value-num">{v.num}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="mono-tag">// THE TEAM</div>
              <div style={{ height: 16 }} />
              <h2 className="h-section">The whole<br/>operation.</h2>
            </div>
            <p className="section-desc">
              When you hire JTM, these are the four people doing the work.
              No junior swap-outs, no offshore pipelines, no "we'll loop in a specialist."
            </p>
          </div>
          <div className="team-grid">
            {team.map((m) => (
              <div className="team-card" key={m.name}>
                <div className="team-portrait">
                  <div className="team-portrait-grid" />
                  <div className="team-initials">{m.initials}</div>
                </div>
                <div className="team-body">
                  <div className="team-name">{m.name}</div>
                  <div className="mono team-role">{m.role}</div>
                  <p className="team-bio">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container cta-inner">
          <div className="cta-eyebrow mono-tag">// WANT TO MEET?</div>
          <h2 className="h-display cta-title">
            Coffee's on us.<br/>
            <span className="glow-text">Brooklyn or Zoom.</span>
          </h2>
          <button className="btn btn-primary cta-btn" onClick={openIntake}>
            Start a project →
          </button>
        </div>
      </section>
    </div>
  );
}

window.JTM = window.JTM || {};
window.JTM.AboutPage = AboutPage;
