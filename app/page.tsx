"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Hero, About, Team, Works } from "../components/Sections";
import {
  ScrollProgress,
  BackToTop,
  PageLoader,
  SmoothScrollOffset,
} from "../components/Polish";
import { useStore } from "../components/StoreProvider";
import { translations } from "../locales/translations";
import "./globals.css";

export default function Page() {
  const { lang, setLang, theme, setTheme } = useStore();
  const t = translations[lang as keyof typeof translations];
  const isRtl = lang === "fa";

  // ریست انیمیشن‌های reveal با تغییر زبان
  if (typeof window !== "undefined") {
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.remove("visible");
      setTimeout(() => el.classList.add("visible"), 50);
    });
  }

  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <Header lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      <SmoothScrollOffset />

      <main>
        <Hero t={t} lang={lang} />

        {/* ── تصویره‌ی کتاب (Frontispiece) ──────────── */}
        <section
          style={{
            marginTop: "-40px",
            marginBottom: "-60px",
            position: "relative",
            zIndex: 10,
            paddingBottom: "0"
          }}
        >
          <div className="container" style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="reveal"
              style={{
                position: "relative",
                maxWidth: "420px",
                width: "100%",
                transform: isRtl ? "rotate(1.5deg)" : "rotate(-1.5deg)",
                transition: "transform 0.5s var(--ease)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(0deg) scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = isRtl ? "rotate(1.5deg)" : "rotate(-1.5deg)")}
            >
              {/* نوار چسب در بالای عکس */}
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%) rotate(-2deg)",
                  width: "80px",
                  height: "28px",
                  background: "rgba(255, 255, 255, 0.4)",
                  backdropFilter: "blur(2px)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  zIndex: 2,
                  borderRadius: "2px",
                }}
              />

              {/* کارت عکس پولارویدی */}
              <div
                style={{
                  background: "var(--off-white)",
                  padding: "16px 16px 16px 16px",
                  borderRadius: "2px",
                  boxShadow: 
                    "0 2px 4px rgba(0,0,0,0.02), 0 12px 40px -8px rgba(42, 36, 32, 0.15), 0 20px 60px -12px rgba(42, 36, 32, 0.1)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    overflow: "hidden",
                    backgroundColor: "var(--sand-2)",
                    position: "relative",
                  }}
                >
                  <img
                    src="/elshanandehsan.webp"
                    alt="Parvan Team"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "sepia(0.15) contrast(1.05) saturate(0.9)",
                      transition: "filter 0.5s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.filter = "sepia(0) contrast(1) saturate(1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.filter = "sepia(0.15) contrast(1.05) saturate(0.9)")}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      boxShadow: "inset 0 0 20px rgba(42, 36, 32, 0.15)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <About t={t} lang={lang} />
        <Team t={t} lang={lang} />
        <Works t={t} lang={lang} />
      </main>

      <Footer />
      <BackToTop lang={lang} />
    </>
  );
}
