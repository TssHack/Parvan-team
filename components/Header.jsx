"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { translations } from "../locales/translations";

export default function Header({ lang, setLang, theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[lang];
  const isRtl = lang === "fa";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.team, href: "#team" },
    { label: t.nav.works, href: "#works" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? "12px 0" : "20px 0",
          transition: "padding 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        <div className="container">
          <nav
            className={scrolled ? "glass-strong" : "glass"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 24px",
              borderRadius: "var(--radius-xl)",
              transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
          >
            {/* Logo */}
            <a
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                color: "var(--charcoal)",
              }}
            >
              <LogoMark />
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "17px",
                  letterSpacing: isRtl ? "0" : "-0.01em",
                  fontFamily: isRtl ? "var(--font-fa)" : "var(--font-en)",
                }}
              >
                {isRtl ? "پروان" : "Parvan"}
              </span>
            </a>

            {/* Desktop nav links */}
            <ul
              style={{
                display: "flex",
                gap: "2px",
                listStyle: "none",
                alignItems: "center",
              }}
              className="desktop-nav"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      display: "block",
                      padding: "8px 16px",
                      borderRadius: "100px",
                      fontSize: "14px",
                      color: "var(--muted)",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      fontFamily: isRtl ? "var(--font-fa)" : "var(--font-en)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--border)";
                      e.currentTarget.style.color = "var(--charcoal)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--muted)";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop Controls */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
              className="desktop-controls"
            >
              {/* Lang toggle */}
              <button
                onClick={() => setLang(isRtl ? "en" : "fa")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  borderRadius: "100px",
                  border: "1px solid var(--border-strong)",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--charcoal)",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.05em",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--border)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
                aria-label="Switch language"
              >
                <span style={{ fontSize: "14px" }}>
                  {isRtl ? "🇬🇧" : "🇮🇷"}
                </span>
                {isRtl ? "EN" : "FA"}
              </button>

              {/* Theme toggle */}
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid var(--border-strong)",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  transition: "all 0.2s ease",
                  color: "var(--charcoal)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--border)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
                aria-label="Toggle theme"
              >
                {theme === "light" ? "◐" : "○"}
              </button>
            </div>

            {/* Mobile: Hamburger */}
            <button
              className="mobile-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                border: "1px solid var(--border-strong)",
                background: "transparent",
                cursor: "pointer",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "5px",
                padding: "10px",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--border)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
              aria-label="Toggle menu"
            >
              <span
                style={{
                  display: "block",
                  width: "18px",
                  height: "1.5px",
                  background: "var(--charcoal)",
                  borderRadius: "2px",
                  transition: "all 0.3s var(--ease)",
                  transform: menuOpen
                    ? `rotate(${isRtl ? "-45" : "45"}deg) translate(${isRtl ? "-3px" : "3px"}, ${isRtl ? "-3px" : "3px"})`
                    : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "18px",
                  height: "1.5px",
                  background: "var(--charcoal)",
                  borderRadius: "2px",
                  transition: "all 0.3s var(--ease)",
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? "translateX(8px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "18px",
                  height: "1.5px",
                  background: "var(--charcoal)",
                  borderRadius: "2px",
                  transition: "all 0.3s var(--ease)",
                  transform: menuOpen
                    ? `rotate(${isRtl ? "45" : "-45"}deg) translate(${isRtl ? "-3px" : "3px"}, ${isRtl ? "3px" : "-3px"})`
                    : "none",
                }}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* ── Mobile Drawer ──────────────────────────── */}
      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(26, 22, 16, 0.5)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 99,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.35s var(--ease)",
        }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          [isRtl ? "right" : "left"]: 0,
          width: "min(340px, 85vw)",
          height: "100vh",
          zIndex: 101,
          background: "var(--parchment)",
          boxShadow: isRtl
            ? "-8px 0 40px rgba(42,36,32,0.15)"
            : "8px 0 40px rgba(42,36,32,0.15)",
          transform: menuOpen
            ? "translateX(0)"
            : `translateX(${isRtl ? "100%" : "-100%"})`,
          transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Spine accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            [isRtl ? "right" : "left"]: 0,
            width: "3px",
            height: "100%",
            background: "linear-gradient(180deg, var(--terracotta), var(--sage), var(--dusk-pink))",
            opacity: 0.5,
          }}
        />

        {/* Drawer header */}
        <div
          style={{
            padding: "24px 28px 20px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <LogoMark />
              <span
                className="book-title"
                style={{ fontSize: "18px" }}
              >
                {isRtl ? "پروان" : "Parvan"}
              </span>
            </div>

            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "1px solid var(--border-strong)",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--charcoal)",
                fontSize: "18px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--border)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
              aria-label="Close menu"
            >
              <i className={`ti ${isRtl ? "ti-x" : "ti-x"}`} />
            </button>
          </div>

          {/* Subtitle */}
          <p
            className="book-subtitle"
            style={{
              fontSize: "12px",
              marginTop: "8px",
              color: "var(--muted)",
            }}
          >
            {isRtl ? "فهرست مطالب" : "Table of Contents"}
          </p>
        </div>

        {/* Nav links — TOC style */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          <div style={{ padding: "0 28px" }}>
            <div className="book-divider" style={{ margin: "12px 0" }}>
              <span className="book-divider-symbol">❖</span>
            </div>
          </div>

          {navLinks.map((link, i) => {
            const chapterNums = ["I", "II", "III", "IV"];
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="toc-item"
                style={{
                  padding: isRtl ? "16px 28px 16px 20px" : "16px 20px 16px 28px",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                  textDecoration: "none",
                  color: "var(--charcoal)",
                  transition: "color 0.2s ease, padding-right 0.3s var(--ease)",
                  borderBottom: "1px dotted var(--border-strong)",
                  fontFamily: isRtl ? "var(--font-fa)" : "var(--font-en)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--terracotta)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--charcoal)";
                }}
              >
                <span
                  className="chapter-num"
                  style={{
                    fontSize: "1.2rem",
                    width: "28px",
                    flexShrink: 0,
                    textAlign: "center",
                    opacity: 0.5,
                    lineHeight: 1,
                  }}
                >
                  {chapterNums[i]}
                </span>
                <span style={{ fontSize: "15px", fontWeight: 500 }}>
                  {link.label}
                </span>
                <span
                  style={{
                    flex: 1,
                    borderBottom: "1px dotted var(--border)",
                    marginBottom: "4px",
                    minWidth: "20px",
                  }}
                />
                <span
                  className="toc-page"
                  style={{
                    fontFamily: "var(--font-serif-en)",
                    fontSize: "13px",
                    color: "var(--muted)",
                    fontStyle: "italic",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </a>
            );
          })}

          {/* Team members sub-links */}
          <div style={{ padding: "20px 28px 8px" }}>
            <p
              style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted-light)",
                marginBottom: "12px",
              }}
            >
              {isRtl ? "نویسندگان" : "Authors"}
            </p>
            {[
              {
                name: isRtl ? "الشن گوزلی" : "Elshan Ghozali",
                slug: "elshan-ghozali",
                num: "01",
              },
              {
                name: isRtl ? "احسان فضلی" : "Ehsan Fazli",
                slug: "ehsan-fazli",
                num: "02",
              },
              {
                name: isRtl ? "امیرمهدی شهبازی" : "Amirmahdi Shahbazi",
                slug: "amirmahdi-shahbazi",
                num: "03",
              },
            ].map((member) => (
              <Link
                key={member.slug}
                href={`/team/${member.slug}`}
                onClick={handleNavClick}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 0",
                  textDecoration: "none",
                  color: "var(--ink-light)",
                  transition: "color 0.2s ease",
                  borderBottom: "1px solid var(--border)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--terracotta)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--ink-light)")
                }
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif-en)",
                    fontSize: "12px",
                    color: "var(--muted-light)",
                    width: "20px",
                    textAlign: "center",
                  }}
                >
                  {member.num}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontFamily: isRtl ? "var(--font-fa)" : "var(--font-en)",
                  }}
                >
                  {member.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Drawer footer — controls */}
        <div
          style={{
            padding: "20px 28px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Controls row */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => {
                setLang(isRtl ? "en" : "fa");
              }}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "10px",
                borderRadius: "12px",
                border: "1px solid var(--border-strong)",
                background: "transparent",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--charcoal)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--border)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <span style={{ fontSize: "14px" }}>
                {isRtl ? "🇬🇧" : "🇮🇷"}
              </span>
              {isRtl ? "English" : "فارسی"}
            </button>

            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                border: "1px solid var(--border-strong)",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                transition: "all 0.2s ease",
                color: "var(--charcoal)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--border)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
              aria-label="Toggle theme"
            >
              {theme === "light" ? "◐" : "○"}
            </button>
          </div>

          {/* University badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "8px",
              borderRadius: "8px",
              background: "var(--border)",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Azad_University_logo.png"
              alt=""
              style={{
                width: "18px",
                height: "18px",
                objectFit: "contain",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                color: "var(--muted)",
                fontFamily: isRtl ? "var(--font-fa)" : "var(--font-en)",
              }}
            >
              {isRtl ? "دانشگاه آزاد تبریز" : "Tabriz Azad University"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Responsive Styles ──────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-controls { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }

        @media (min-width: 769px) {
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill="var(--charcoal)" />
      <path
        d="M8 20 L14 8 L20 20"
        stroke="var(--sand)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M10.5 16 L17.5 16"
        stroke="var(--terracotta)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}