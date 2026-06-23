"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

/* ─── Reveal Hook (Singleton) ──────────────────── */
let _revealInit = false;
function useReveal() {
  useEffect(() => {
    if (_revealInit) return;
    _revealInit = true;
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => {
      obs.disconnect();
      _revealInit = false;
    };
  }, []);
}

/* ─── Hero — Book Cover ────────────────────────── */
export function Hero({ t, lang }) {
  useReveal();
  const isRtl = lang === "fa";
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const check = () => setShowStats(window.innerWidth > 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "120px",
        overflow: "hidden",
      }}
    >
      <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", width: "600px", height: "600px",
          borderRadius: "50%", top: "-100px", left: "-100px",
          background: "radial-gradient(circle, rgba(122,158,142,0.12) 0%, transparent 70%)",
          filter: "blur(2px)",
        }} />
        <div style={{
          position: "absolute", width: "500px", height: "500px",
          borderRadius: "50%", bottom: "-80px", right: "-80px",
          background: "radial-gradient(circle, rgba(196,96,42,0.06) 0%, transparent 70%)",
          filter: "blur(2px)",
        }} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2, width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "720px" }}>
          <div className="book-cover page-curl reveal" style={{ padding: "56px 48px" }}>
            <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "36px", transitionDelay: "0.05s" }}>
              <div className="glass" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "6px 14px", borderRadius: "100px",
                fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                color: "var(--sage-dark)",
              }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--sage)", display: "inline-block" }} />
                {t.hero.eyebrow}
              </div>
            </div>

            <h1 className="book-title-lg reveal" style={{ transitionDelay: "0.1s" }}>
              {t.hero.headline}
            </h1>

            <div className="book-divider reveal" style={{ transitionDelay: "0.15s" }}>
              <span className="book-divider-symbol">❖</span>
            </div>

            <p className="book-subtitle reveal" style={{ transitionDelay: "0.2s" }}>
              {t.hero.subtitle}
            </p>

            <p className="book-body reveal" style={{ marginTop: "20px", maxWidth: "500px", fontSize: "15px", transitionDelay: "0.25s" }}>
              {t.hero.sub}
            </p>

            <div className="reveal" style={{ display: "flex", gap: "12px", marginTop: "36px", flexWrap: "wrap", transitionDelay: "0.3s" }}>
              <a href="#team" className="btn-primary">
                {t.hero.cta}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d={isRtl ? "M10 8 L6 4 M6 12 L10 8" : "M6 8 L10 4 M10 12 L6 8"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
              <a href="#about" className="btn-ghost">{t.hero.ctaSub}</a>
            </div>
          </div>
        </div>

        {showStats && (
          <div className="reveal glass-strong" style={{
            position: "absolute", [isRtl ? "left" : "right"]: 0,
            top: "50%", transform: "translateY(-50%)",
            padding: "28px", borderRadius: "var(--radius-lg)", width: "220px", transitionDelay: "0.4s",
          }}>
            <FloatingStats t={t} />
          </div>
        )}
      </div>
    </section>
  );
}

function FloatingStats({ t }) {
  const items = [
    { label: t.hero.stats.projects, value: "12" },
    { label: t.hero.stats.code, value: "400k+" },
    { label: t.hero.stats.uptime, value: "99.9%" },
  ];
  return (
    <div>
      <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--muted)", letterSpacing: "0.08em", marginBottom: "16px", textTransform: "uppercase" }}>
        {t.hero.stats.title}
      </p>
      {items.map((item) => (
        <div key={item.label} style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: "22px", fontWeight: 500, color: "var(--charcoal)", lineHeight: 1, fontFamily: "var(--font-en)" }}>{item.value}</p>
          <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "3px" }}>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── About — Preface ──────────────────────────── */
export function About({ t, lang }) {
  return (
    <section id="about">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "80px", alignItems: "start" }}>
          <div className="spine-left">
            <p className="eyebrow reveal">{t.about.eyebrow}</p>
            <h2 className="book-title reveal" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", marginBottom: "24px", transitionDelay: "0.05s" }}>
              {t.about.headline}
            </h2>
            <p className="book-body drop-cap reveal" style={{ transitionDelay: "0.1s" }}>
              {t.about.body}
            </p>
            <div className="margin-note reveal" style={{ marginTop: "24px", transitionDelay: "0.15s" }}>
              {t.about.note}
            </div>
          </div>

          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { val: t.about.val1, label: t.about.stat1, span: false },
                { val: t.about.val2, label: t.about.stat2, span: false },
                { val: t.about.val3, label: t.about.stat3, span: true },
              ].map((s, i) => (
                <div key={i} className="parchment reveal" style={{
                  padding: "24px 20px", borderRadius: "var(--radius-md)",
                  gridColumn: s.span ? "1 / -1" : undefined,
                  transitionDelay: `${0.1 + i * 0.05}s`,
                }}>
                  <p style={{ fontSize: "2.2rem", fontWeight: 500, lineHeight: 1, marginBottom: "6px", color: "var(--charcoal)", fontFamily: "var(--font-en)" }}>{s.val}</p>
                  <p style={{ fontSize: "13px", color: "var(--muted)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div className="parchment reveal" style={{
              marginTop: "16px", padding: "16px 20px", borderRadius: "var(--radius-md)",
              display: "flex", alignItems: "center", gap: "12px", transitionDelay: "0.3s",
            }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Azad_University_logo.png" alt="Azad University" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
              <p style={{ fontSize: "13px", color: "var(--muted)" }}>{t.about.university}</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          #about .container > div { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── Team — Table of Contents ─────────────────── */
export function Team({ t, lang }) {
  const isRtl = lang === "fa";
  return (
    <section id="team">
      <div className="container">
        <div className="reveal" style={{ position: "relative", marginBottom: "56px" }}>
          <span className="chapter-num" style={{ position: "absolute", top: "-40px", [isRtl ? "right" : "left"]: 0, opacity: 0.4 }}>II</span>
          <p className="eyebrow" style={{ transitionDelay: "0.05s" }}>{t.team.eyebrow}</p>
          <div className="book-divider" style={{ transitionDelay: "0.1s" }}><span className="book-divider-symbol">❖</span></div>
          <h2 className="book-title" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", transitionDelay: "0.15s" }}>{t.team.headline}</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {t.team.members.map((member, i) => (
            <MemberCard key={member.slug} member={member} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCard({ member, index, lang }) {
  const isRtl = lang === "fa";
  return (
    <Link href={`/team/${member.slug}`} className="parchment page-curl reveal" style={{
      display: "grid", gridTemplateColumns: "60px 1fr auto", gap: "24px", alignItems: "center",
      padding: "32px 36px", borderRadius: "var(--radius-md)",
      textDecoration: "none", color: "inherit",
      transition: "transform 0.3s var(--ease), box-shadow 0.3s var(--ease)",
      transitionDelay: `${index * 0.1}s`,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = `translateX(${isRtl ? "-6px" : "6px"})`;
      e.currentTarget.style.boxShadow = "0 12px 40px var(--page-shadow)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateX(0)";
      e.currentTarget.style.boxShadow = "";
    }}>
      <span className="chapter-num" style={{ fontSize: "2.4rem", lineHeight: 1, textAlign: "center" }}>{member.num}</span>
      <div>
        <h3 className="book-title" style={{ fontSize: "20px", marginBottom: "6px" }}>{isRtl ? member.nameFa : member.name}</h3>
        <span className="tag">{isRtl ? member.roleFa : member.role}</span>
        <p className="book-body" style={{ fontSize: "14px", marginTop: "8px", color: "var(--muted)" }}>{isRtl ? member.taglineFa : member.tagline}</p>
      </div>
      <div style={{
        width: "44px", height: "44px", borderRadius: "50%",
        border: "1px solid var(--border-strong)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, color: "var(--muted)", fontSize: "18px",
      }}>
        <i className={`ti ${isRtl ? "ti-arrow-left" : "ti-arrow-right"}`} aria-hidden="true" />
      </div>
    </Link>
  );
}

/* ─── Works — Selected Pages ───────────────────── */
export function Works({ t, lang }) {
  const isRtl = lang === "fa";
  return (
    <section id="works">
      <div className="container">
        <div className="reveal" style={{ position: "relative", marginBottom: "56px" }}>
          <span className="chapter-num" style={{ position: "absolute", top: "-40px", [isRtl ? "right" : "left"]: 0, opacity: 0.4 }}>III</span>
          <p className="eyebrow" style={{ transitionDelay: "0.05s" }}>{t.works.eyebrow}</p>
          <div className="book-divider" style={{ transitionDelay: "0.1s" }}><span className="book-divider-symbol">❖</span></div>
          <h2 className="book-title" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", transitionDelay: "0.15s" }}>{t.works.headline}</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {t.works.items.map((work, i) => (
            <WorkCard key={i} work={work} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ work, index, lang }) {
  const isRtl = lang === "fa";
  return (
    <div className="parchment reveal" style={{
      padding: "36px 40px", borderRadius: "var(--radius-md)",
      display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "40px",
      position: "relative", transition: "transform 0.3s var(--ease)",
      transitionDelay: `${index * 0.1}s`,
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = `translateX(${isRtl ? "-6px" : "6px"})`)}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}>
      {index === 0 && <div className="bookmark" style={{ [isRtl ? "right" : "left"]: "24px" }} />}
      <div>
        <div style={{ marginBottom: "12px" }}><span className="tag">{work.tag}</span></div>
        <h3 className="book-title" style={{ fontSize: "22px", marginBottom: "10px" }}>{work.title}</h3>
        <p className="book-body" style={{ fontSize: "15px", color: "var(--muted)", maxWidth: "520px" }}>{work.body}</p>
        <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
          {work.tech.map((tech) => (<span key={tech} className="tech-pill">{tech}</span>))}
        </div>
      </div>
      <div style={{
        width: "48px", height: "48px", borderRadius: "50%",
        border: "1px solid var(--border-strong)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, color: "var(--muted)", fontSize: "18px",
      }}>
        <i className={`ti ${isRtl ? "ti-arrow-left" : "ti-arrow-right"}`} aria-hidden="true" />
      </div>
    </div>
  );
}

/* ─── Footer — Back Cover ──────────────────────── */
export function Footer({ t, lang }) {
  const isRtl = lang === "fa";
  return (
    <footer id="contact" style={{ borderTop: "1px solid var(--border)", padding: "80px 0 40px" }}>
      <div className="container">
        <div className="book-divider reveal" style={{ marginBottom: "56px" }}>
          <span className="book-divider-symbol">❖</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "60px", flexWrap: "wrap", gap: "40px" }}>
          <div className="reveal">
            <p className="book-title" style={{ fontSize: "28px", marginBottom: "8px" }}>{isRtl ? "پروان" : "Parvan"}</p>
            <p className="book-body" style={{ fontSize: "14px", color: "var(--muted)" }}>{t.footer.tagline}</p>
          </div>

          <div className="reveal" style={{ display: "flex", flexDirection: "column", alignItems: isRtl ? "flex-end" : "flex-start", gap: "16px", transitionDelay: "0.1s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Azad_University_logo.png" alt="" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>{t.footer.university}</span>
            </div>
            <div style={{ display: "flex", gap: "24px" }}>
              {t.footer.links.map((link) => (
                <a key={link} href="#" style={{ fontSize: "14px", color: "var(--muted)", textDecoration: "none", transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--charcoal)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >{link}</a>
              ))}
            </div>
          </div>

          <div className="reveal" style={{ transitionDelay: "0.15s" }}>
            <a href="mailto:hello@parvan.ir" className="btn-primary" style={{ fontSize: "13px" }}>{t.footer.contact}</a>
          </div>
        </div>

        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, var(--sage), var(--terracotta), var(--dusk-pink), transparent)", marginBottom: "32px", opacity: 0.5 }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <p style={{ fontSize: "13px", color: "var(--muted)" }}>{t.footer.copy}</p>
          <p className="book-subtitle" style={{ fontSize: "12px", margin: 0, color: "var(--muted-light)" }}>{t.footer.crafted}</p>
        </div>
      </div>
    </footer>
  );
}