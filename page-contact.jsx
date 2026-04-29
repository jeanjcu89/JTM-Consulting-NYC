/* global React */
const { useState } = React;

function ContactPage({ openIntake }) {
  return (
    <div className="page page-contact">
      <section className="page-hero">
        <div className="container">
          <div className="mono-tag">// CONTACT</div>
          <h1 className="h-display page-hero-title">
            Tell us what's<br />
            <span className="glow-text">broken.</span>
          </h1>
          <p className="page-hero-sub">
            Three quick questions. We'll come back within 48 hours with a real plan,
            a real price, and the names of the actual people who'd build it.
          </p>
        </div>
      </section>

      <section className="section" style={{ borderTop: "none", paddingTop: 0 }}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-wrap">
              <IntakeForm inline />
            </div>
            <aside className="contact-aside">
              <div className="contact-aside-block">
                <div className="mono">// EMAIL</div>
                <a href="mailto:info@jtmconsultingnyc.com" className="contact-aside-value">info@jtmconsultingnyc.com

                </a>
              </div>
              <div className="contact-aside-block">
                <div className="mono">// CALL / TEXT</div>
                <a href="tel:+17184315113" className="contact-aside-value">(718) 431-5113

                </a>
                <div className="mono" style={{ marginTop: 4, color: "var(--fg-mute)" }}>M–F, 9am–7pm ET</div>
              </div>
              <div className="contact-aside-block">
                <div className="mono">// STUDIO</div>
                <div className="contact-aside-value">
                  271 Meserole St.<br />
                  Brooklyn, NY 11206
                </div>
                <div className="mono" style={{ marginTop: 4, color: "var(--fg-mute)" }}>By appointment</div>
              </div>
              <div className="contact-aside-block contact-promise">
                <div className="mono-tag">// OUR PROMISE</div>
                <p>
                  Real reply from a real human within <span className="glow-text">48 hours.</span>
                  No funnels, no auto-responders, no sales call before we understand the problem.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>);

}

// =========================
// INTAKE FORM (used both as page section AND modal)
// =========================
function IntakeForm({ inline = false, onClose }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    services: [],
    budget: "",
    timeline: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    details: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const totalSteps = 3;
  const WEB3FORMS_KEY = "bb5c1ece-d809-4a7c-a3c6-640761b7e98e";

  const services = [
  "Web design", "Branding", "SEO & marketing",
  "IT support", "Networking", "Cloud migration",
  "Not sure yet — talk to us"];

  const budgets = ["Under $5k", "$5k–15k", "$15k–35k", "$35k+", "Monthly retainer"];
  const timelines = ["ASAP / emergency", "Within 1 month", "1–3 months", "Just exploring"];

  const toggleService = (s) => {
    setData((d) => ({
      ...d,
      services: d.services.includes(s) ?
      d.services.filter((x) => x !== s) :
      [...d.services, s]
    }));
  };

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError("");

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `New project brief from ${data.name || "website visitor"}`,
      from_name: data.name || "JTM website",
      replyto: data.email,
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      services: data.services.join(", "),
      budget: data.budget,
      timeline: data.timeline,
      details: data.details,
      botcheck: ""
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setSubmitError(json.message || "Something went wrong. Please try again or email us directly.");
      }
    } catch (err) {
      setSubmitError("Network error. Please try again or email info@jtmconsultingnyc.com.");
    } finally {
      setSubmitting(false);
    }
  };

  const canNext = () => {
    if (step === 1) return data.services.length > 0;
    if (step === 2) return data.budget && data.timeline;
    return true;
  };

  if (submitted) {
    return (
      <div className={"intake " + (inline ? "intake-inline" : "")}>
        <div className="intake-success">
          <div className="success-mark">
            <svg viewBox="0 0 64 64" width="48" height="48">
              <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M20 33 L29 42 L46 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="mono-tag" style={{ marginBottom: 16 }}>// MESSAGE RECEIVED</div>
          <h2 className="h-section" style={{ marginBottom: 16 }}>
            Got it, {data.name.split(" ")[0] || "there"}.
          </h2>
          <p className="intake-success-sub">
            We've received your project brief. A real human (probably Jordan) will reply
            within <span className="glow-text">48 hours</span> with next steps.
          </p>
          <p className="intake-success-meta mono">
            REFERENCE #JTM-{Math.floor(Math.random() * 90000 + 10000)}
          </p>
          {!inline &&
          <button className="btn btn-ghost" onClick={onClose} style={{ marginTop: 32 }}>
              Close
            </button>
          }
        </div>
      </div>);

  }

  return (
    <div className={"intake " + (inline ? "intake-inline" : "")}>
      <div className="intake-header">
        <div className="intake-step-mono mono">
          STEP {step.toString().padStart(2, "0")} / {totalSteps.toString().padStart(2, "0")}
        </div>
        <div className="intake-progress">
          <div className="intake-progress-bar" style={{ width: `${step / totalSteps * 100}%` }} />
        </div>
      </div>

      <form onSubmit={submit} className="intake-form">
        {step === 1 &&
        <div className="intake-step">
            <h3 className="intake-q">What do you need help with?</h3>
            <p className="intake-hint">Pick all that apply. We'll narrow down on the call.</p>
            <div className="chip-grid">
              {services.map((s) =>
            <button
              key={s}
              type="button"
              className={"chip-large " + (data.services.includes(s) ? "active" : "")}
              onClick={() => toggleService(s)}>
              
                  <span className="chip-check">{data.services.includes(s) ? "✓" : "+"}</span>
                  {s}
                </button>
            )}
            </div>
          </div>
        }

        {step === 2 &&
        <div className="intake-step">
            <h3 className="intake-q">Budget & timeline?</h3>
            <p className="intake-hint">Honest answers help us give you a real plan.</p>

            <div className="form-block">
              <label className="form-label mono">// BUDGET RANGE</label>
              <div className="chip-grid">
                {budgets.map((b) =>
              <button
                key={b}
                type="button"
                className={"chip-large " + (data.budget === b ? "active" : "")}
                onClick={() => setData((d) => ({ ...d, budget: b }))}>
                
                    {b}
                  </button>
              )}
              </div>
            </div>

            <div className="form-block">
              <label className="form-label mono">// WHEN DO YOU NEED THIS DONE?</label>
              <div className="chip-grid">
                {timelines.map((t) =>
              <button
                key={t}
                type="button"
                className={"chip-large " + (data.timeline === t ? "active" : "")}
                onClick={() => setData((d) => ({ ...d, timeline: t }))}>
                
                    {t}
                  </button>
              )}
              </div>
            </div>
          </div>
        }

        {step === 3 &&
        <div className="intake-step">
            <h3 className="intake-q">Who are you?</h3>
            <p className="intake-hint">We'll respond to whoever you tell us to.</p>

            <div className="form-row">
              <div className="form-block">
                <label className="form-label mono">// FULL NAME</label>
                <input
                className="form-input"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Maya Rodriguez"
                required />
              
              </div>
              <div className="form-block">
                <label className="form-label mono">// COMPANY</label>
                <input
                className="form-input"
                value={data.company}
                onChange={(e) => setData({ ...data, company: e.target.value })}
                placeholder="Imagine Swimming Inc" />
              
              </div>
            </div>

            <div className="form-row">
              <div className="form-block">
                <label className="form-label mono">// EMAIL</label>
                <input
                type="email"
                className="form-input"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="name@yourcompany.com"
                required />
              
              </div>
              <div className="form-block">
                <label className="form-label mono">// PHONE (OPTIONAL)</label>
                <input
                type="tel"
                className="form-input"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                placeholder="(212) 555-0148" />
              
              </div>
            </div>

            <div className="form-block">
              <label className="form-label mono">// ANYTHING ELSE WE SHOULD KNOW?</label>
              <textarea
              className="form-input form-textarea"
              value={data.details}
              onChange={(e) => setData({ ...data, details: e.target.value })}
              placeholder="The goal, the problem, the URL of your current site, links to inspiration, the dumpster fire we should know about — whatever helps."
              rows={4} />
            
            </div>
          </div>
        }

        {submitError &&
        <div className="intake-error mono" role="alert" style={{ color: "#ff8a80", marginTop: 12, fontSize: 13 }}>
            {submitError}
          </div>
        }

        <input type="checkbox" name="botcheck" tabIndex={-1} style={{ display: "none" }} />

        <div className="intake-footer">
          {step > 1 ?
          <button type="button" className="btn btn-ghost" onClick={back} disabled={submitting}>← Back</button> :
          <div />}

          {step < totalSteps ?
          <button
            type="button"
            className="btn btn-primary"
            onClick={next}
            disabled={!canNext()}
            style={{ opacity: canNext() ? 1 : 0.4 }}>

              Continue →
            </button> :

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
            style={{ opacity: submitting ? 0.6 : 1 }}>

              {submitting ? "Sending..." : "Send brief →"}
            </button>
          }
        </div>
      </form>
    </div>);

}

// =========================
// MODAL WRAPPER
// =========================
function IntakeModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet intake-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        <div className="intake-modal-head">
          <div className="mono-tag">// START A PROJECT</div>
          <h2 className="h-section" style={{ marginTop: 12 }}>
            Three questions.<br />Two minutes.
          </h2>
        </div>
        <IntakeForm onClose={onClose} />
      </div>
    </div>);

}

window.JTM = window.JTM || {};
Object.assign(window.JTM, { ContactPage, IntakeForm, IntakeModal });