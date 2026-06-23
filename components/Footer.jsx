"use client";
import Link from "next/link";
import { useStore } from "./StoreProvider";

export default function Footer() {
  const { lang } = useStore();
  const isRtl = lang === "fa";

  return (
    <footer
      id="contact"
      style={{
        borderTop: "1px solid var(--border)",
        paddingTop: "80px",
        paddingBottom: "40px",
        background: "var(--sand-2)",
        marginTop: "40px",
      }}
    >
      <div className="container">
        {/* بخش بالایی پشت جلد */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr",
            gap: "60px",
            marginBottom: "80px",
          }}
          className="footer-grid"
        >
          {/* ستون اول: هویت کتاب */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "3px", height: "32px", background: "var(--terracotta)", borderRadius: "2px" }} />
              <h2 className="book-title" style={{ fontSize: "2rem", margin: 0 }}>
                {isRtl ? "پروان" : "Parvan"}
              </h2>
            </div>
            <p className="book-body" style={{ fontSize: "14px", maxWidth: "320px", color: "var(--muted)", marginBottom: "24px" }}>
              {isRtl 
                ? "این کتاب، مجموعه‌ای از فصل‌های نوشته‌شده توسط اعضای تیم مهندسی پروان است. هر فصل نماینده‌ی مسیر حرفه‌ای، مهارت‌ها و نمونه‌کارهای یک مهندس است."
                : "This book is a collection of chapters written by the members of the Parvan engineering team. Each chapter represents the professional journey, skills, and portfolio of an engineer."
              }
            </p>
            {/* لوگو دانشگاه */}
            <div className="parchment" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 16px", borderRadius: "var(--radius-sm)" }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Azad_University_logo.png"
                alt="Azad University"
                style={{ width: "24px", height: "24px", objectFit: "contain" }}
              />
              <span style={{ fontSize: "12px", color: "var(--ink-light)" }}>
                {isRtl ? "دانشجویان دانشگاه آزاد تبریز" : "Students of Tabriz Azad University"}
              </span>
            </div>
          </div>

          {/* ستون دوم: فهرست مجدد */}
          <div>
            <p className="eyebrow" style={{ marginBottom: "24px" }}>
              {isRtl ? "فهرست فصل‌ها" : "Table of Chapters"}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { label: isRtl ? "مقدمه" : "Preface", href: "/#about" },
                { label: isRtl ? "الشن گوزلی" : "Elshan Ghozali", href: "/team/elshan-ghozali" },
                { label: isRtl ? "احسان فضلی" : "Ehsan Fazli", href: "/team/ehsan-fazli" },
                { label: isRtl ? "امیرمهدی شهبازی" : "Amirmahdi Shahbazi", href: "/team/amirmahdi-shahbazi" },
                { label: isRtl ? "برگه‌های انتخابی" : "Selected Pages", href: "/#works" },
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: "16px" }}>
                  <Link
                    href={item.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      textDecoration: "none",
                      color: "var(--ink-light)",
                      transition: "color 0.2s ease",
                      fontSize: "14px",
                      fontFamily: isRtl ? "var(--font-fa)" : "var(--font-en)"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--terracotta)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-light)")}
                  >
                    <span style={{ fontFamily: "var(--font-serif-en)", fontSize: "12px", color: "var(--muted-light)", width: "20px", textAlign: "center" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون سوم: تماس و کولوفون */}
          <div>
            <p className="eyebrow" style={{ marginBottom: "24px" }}>
              {isRtl ? "ارتباط و کولوفون" : "Contact & Colophon"}
            </p>
            
            <a
              href="mailto:hello@parvan.ir"
              className="btn-primary"
              style={{ fontSize: "13px", marginBottom: "32px", width: "100%", justifyContent: "center" }}
            >
              <i className="ti ti-mail" style={{ fontSize: "16px" }}></i>
              {isRtl ? "تماس با ما" : "Get in touch"}
            </a>

            <div className="margin-note" style={{ fontSize: "12px", lineHeight: 1.8, borderLeft: isRtl ? "none" : "2px solid var(--border-strong)", borderRight: isRtl ? "2px solid var(--border-strong)" : "none", paddingLeft: isRtl ? "0" : "16px", paddingRight: isRtl ? "16px" : "0" }}>
              <strong style={{ color: "var(--charcoal)" }}>{isRtl ? "شناسنامه کتاب (Colophon):" : "Colophon:"}</strong>
              <br />
              {isRtl 
                ? "این سایت با استفاده از چارچوب Next.js، تایپوگرافی‌های Playfair Display و Vazirmatn و پالت رنگی الهام‌گرفته از کاغذ کاهی و جوهر سنتی طراحی شده است."
                : "This site was built using Next.js, Playfair Display & Vazirmatn typography, and a color palette inspired by traditional parchment and ink."
              }
            </div>
          </div>
        </div>

        {/* جداکننده تزئینی */}
        <div className="book-divider" style={{ marginBottom: "32px" }}>
          <span className="book-divider-symbol">❖</span>
        </div>

        {/* نوار رنگی گرادیان */}
        <div
          style={{
            height: "2px",
            background: "linear-gradient(90deg, var(--sage), var(--terracotta), var(--dusk-pink), var(--sage))",
            marginBottom: "32px",
            opacity: 0.6,
            borderRadius: "2px",
          }}
        />

        {/* بخش کپی‌رایت پایانی */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0, fontFamily: isRtl ? "var(--font-fa)" : "var(--font-en)" }}>
            © {new Date().getFullYear()} Parvan Engineering. {isRtl ? "تمام حقوق محفوظ است." : "All rights reserved."}
          </p>
          <p className="book-subtitle" style={{ fontSize: "12px", margin: 0, color: "var(--muted-light)" }}>
            {isRtl ? "ساخته‌شده با دقت، مثل یک کتاب خوب." : "Crafted with care, like a good book."}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </footer>
  );
}