"use client";
import { useEffect, useState } from "react";
import { useStore } from "../../../components/StoreProvider";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getMemberBySlug, getAllSlugs } from "../../../data/members";
import Header from "../../../components/Header";
import {
  ScrollProgress,
  BackToTop,
  PageLoader,
  SmoothScrollOffset,
} from "../../../components/Polish";

// آیکون‌های رسمی SVG برندها
const BrandIcons = {
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  website: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  email: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  telegram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  twitter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  devto: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6.02v4.36h.56c.37 0 .65-.08.85-.23.2-.16.3-.47.3-.93v-2.04c0-.46-.1-.77-.31-.93zm6.69 2.46c-.16-.15-.38-.22-.66-.22h-.56v2.72h.56c.28 0 .5-.07.66-.22.16-.14.24-.36.24-.65v-.98c0-.29-.08-.51-.24-.65zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.4-1.04.6-1.8.6H4.5V8.1h2.26c.76 0 1.36.2 1.8.6.44.4.66 1.02.66 1.86v2.88c0 .84-.22 1.46-.66 1.86zm6.62-.24c-.52.47-1.21.7-2.08.7h-2.1V8.1h2.08c.87 0 1.56.23 2.08.7.52.47.78 1.15.78 2.04v2.18c0 .89-.26 1.57-.78 2.04zm6.58.24c-.44.4-1.04.6-1.8.6h-2.26V8.1h2.26c.76 0 1.36.2 1.8.6.44.4.66 1.02.66 1.86v2.88c0 .84-.22 1.46-.66 1.86z" />
    </svg>
  ),
};

export default function MemberPage() {
  const params = useParams();
  const slug = params.slug as string;
  const member = getMemberBySlug(slug);
  const { lang, setLang, theme, setTheme } = useStore();
  const isRtl = lang === "fa";

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.isIntersecting && e.target.classList.add("visible")
        ),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [lang]);

  if (!member) {
    return (
      <>
        <Header
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
        />
        <main style={{ paddingTop: "160px", textAlign: "center" }}>
          <div className="container">
            <h1 className="book-title" style={{ fontSize: "2rem" }}>
              {isRtl ? "عضو یافت نشد" : "Member not found"}
            </h1>
            <Link
              href="/"
              className="btn-ghost"
              style={{ marginTop: "24px", display: "inline-flex" }}
            >
              {isRtl ? "بازگشت به خانه" : "Go back home"}
            </Link>
          </div>
        </main>
      </>
    );
  }

  const avatarMap: Record<string, string> = {
    "elshan-ghozali": "/elshanghozali.webp",
    "ehsan-fazli": "/ehsanfazli.webp",
    "amirmahdi-shahbazi": "/amirmahdishahbazi.webp",
  };
  const avatarSrc = avatarMap[slug] || member.avatar;

  const bio = isRtl ? member.bio.fa : member.bio.en;
  const bioParagraphs = bio.split("\n\n");
  const workingOn = isRtl ? member.workingOn.fa : member.workingOn.en;
  const education = isRtl ? member.education.fa : member.education.en;
  const firstLetter = (isRtl ? member.nameFa : member.name)
    .charAt(0)
    .toUpperCase();

  const linkItems = [
    {
      key: "github",
      label: "GitHub",
      icon: BrandIcons.github,
      url: member.links.github,
      color: "#333",
    },
    {
      key: "website",
      label: isRtl ? "وبسایت" : "Website",
      icon: BrandIcons.website,
      url: member.links.website,
      color: "var(--sage-dark)",
    },
    {
      key: "email",
      label: "Email",
      icon: BrandIcons.email,
      url: member.links.email ? `mailto:${member.links.email}` : undefined,
      color: "var(--terracotta)",
    },
    {
      key: "telegram",
      label: "Telegram",
      icon: BrandIcons.telegram,
      url: member.links.telegram,
      color: "#0088cc",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: BrandIcons.linkedin,
      url: member.links.linkedin,
      color: "#0a66c2",
    },
    {
      key: "twitter",
      label: "X / Twitter",
      icon: BrandIcons.twitter,
      url: member.links.twitter,
      color: "var(--charcoal)",
    },
    {
      key: "devto",
      label: "dev.to",
      icon: BrandIcons.devto,
      url: member.links.devto,
      color: "var(--ink)",
    },
  ].filter((l) => l.url);

  const allSlugs = getAllSlugs();
  const currentIndex = allSlugs.indexOf(slug);
  const prevMember =
    currentIndex > 0 ? getMemberBySlug(allSlugs[currentIndex - 1]) : null;
  const nextMember =
    currentIndex < allSlugs.length - 1
      ? getMemberBySlug(allSlugs[currentIndex + 1])
      : null;

  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <Header
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
      />
      <SmoothScrollOffset />

      <main style={{ paddingTop: "120px" }}>
        {/* ── هدر فصل ─────────────────────── */}
        <section style={{ paddingBottom: "0" }}>
          <div className="container">
            <div
              className="reveal"
              style={{ position: "relative", marginBottom: "48px" }}
            >
              <span
                className="chapter-num"
                style={{
                  position: "absolute",
                  top: "-30px",
                  [isRtl ? "right" : "left"]: 0,
                  opacity: 0.35,
                }}
              >
                {member.num}
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <Link
                  href="/#team"
                  style={{
                    fontSize: "12px",
                    color: "var(--muted)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--terracotta)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--muted)")
                  }
                >
                  <i
                    className={`ti ${isRtl ? "ti-arrow-right" : "ti-arrow-left"}`}
                    style={{ fontSize: "14px" }}
                  />
                  {isRtl ? "فهرست تیم" : "Team Index"}
                </Link>
                <span style={{ color: "var(--border-strong)" }}>/</span>
                <span style={{ fontSize: "12px", color: "var(--muted-light)" }}>
                  {isRtl ? "فصل" : "Chapter"} {member.num}
                </span>
              </div>
              <div className="book-divider" style={{ marginBottom: "24px" }}>
                <span className="book-divider-symbol">❖</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── کارت پروفایل ────────────────── */}
        <section style={{ paddingTop: "0", paddingBottom: "100px" }}>
          <div className="container">
            <div
              className="parchment page-curl reveal"
              style={{
                padding: "56px",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "56px",
                  alignItems: "start",
                }}
                className="profile-grid"
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      position: "relative",
                      width: "180px",
                      height: "220px",
                      margin: "0 auto 24px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        border: "2px solid var(--border-strong)",
                        borderRadius: "var(--radius-md)",
                        transform: isRtl ? "rotate(2deg)" : "rotate(-2deg)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        right: "10px",
                        bottom: "10px",
                        borderRadius: "var(--radius-sm)",
                        overflow: "hidden",
                        border: "4px solid var(--sand-2)",
                        boxShadow: "0 8px 24px var(--page-shadow)",
                        background: "var(--sand)",
                      }}
                    >
                      <img
                        src={avatarSrc}
                        alt={isRtl ? member.nameFa : member.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                  <span
                    className="tag"
                    style={{ fontSize: "12px", padding: "6px 14px" }}
                  >
                    {isRtl ? member.roleFa : member.role}
                  </span>
                </div>
                <div>
                  <h1
                    className="book-title"
                    style={{
                      fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
                      marginBottom: "12px",
                      lineHeight: 1.15,
                    }}
                  >
                    {isRtl ? member.nameFa : member.name}
                  </h1>
                  <p className="book-subtitle" style={{ marginBottom: "0" }}>
                    {isRtl ? member.taglineFa : member.tagline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── بیوگرافی ──────────────────────── */}
        <section style={{ position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              top: "-60px",
              [isRtl ? "left" : "right"]: "-40px",
              fontFamily: "var(--font-serif-en)",
              fontSize: "28rem",
              fontWeight: 700,
              color: "var(--charcoal)",
              opacity: 0.025,
              pointerEvents: "none",
              zIndex: 0,
              lineHeight: 1,
              userSelect: "none",
            }}
            aria-hidden="true"
          >
            {firstLetter}
          </div>
          <div
            className="container"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div
              className="reveal bio-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: "80px",
                alignItems: "start",
              }}
            >
              <div className="spine-left">
                <p className="eyebrow">
                  {isRtl ? "بیوگرافی" : "Biography"}
                </p>
                <div
                  className="book-divider"
                  style={{ margin: "16px 0 28px" }}
                >
                  <span className="book-divider-symbol">❖</span>
                </div>
                {bioParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className={`book-body reveal ${
                      i === 0 ? "drop-cap" : ""
                    }`}
                    style={{
                      marginBottom:
                        i < bioParagraphs.length - 1 ? "24px" : 0,
                      transitionDelay: `${0.1 + i * 0.05}s`,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
              <div>
                <div
                  className="parchment reveal"
                  style={{
                    padding: "32px 28px",
                    borderRadius: "var(--radius-md)",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "20px",
                    }}
                  >
                    <i
                      className="ti ti-rocket"
                      style={{ color: "var(--terracotta)", fontSize: "16px" }}
                    />
                    <p className="eyebrow" style={{ marginBottom: 0 }}>
                      {isRtl ? "روی چه چیزی کار می‌کنم" : "What I'm Working On"}
                    </p>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {workingOn.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          gap: "12px",
                          marginBottom: "14px",
                          fontSize: "14px",
                          color: "var(--ink-light)",
                          lineHeight: 1.7,
                        }}
                      >
                        <span
                          style={{
                            color: "var(--terracotta)",
                            marginTop: "3px",
                            flexShrink: 0,
                            fontSize: "8px",
                          }}
                        >
                          ◆
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="parchment reveal"
                  style={{
                    padding: "32px 28px",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "20px",
                    }}
                  >
                    <i
                      className="ti ti-school"
                      style={{ color: "var(--sage)", fontSize: "16px" }}
                    />
                    <p className="eyebrow" style={{ marginBottom: 0 }}>
                      {isRtl
                        ? "تحصیلات و گواهینامه‌ها"
                        : "Education & Certifications"}
                    </p>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {education.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          gap: "12px",
                          marginBottom: "12px",
                          fontSize: "14px",
                          color: "var(--ink-light)",
                          lineHeight: 1.7,
                        }}
                      >
                        <span
                          style={{
                            color: "var(--sage)",
                            marginTop: "3px",
                            flexShrink: 0,
                            fontSize: "8px",
                          }}
                        >
                          ●
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── لینک‌ها با افکت ورق زدن و آیکون‌های اصلی ── */}
        <section>
          <div className="container">
            <div className="reveal" style={{ position: "relative" }}>
              <p className="eyebrow">
                {isRtl ? "ارتباطات و منابع" : "Notes & Connections"}
              </p>
              <div
                className="book-divider"
                style={{ margin: "16px 0 40px" }}
              >
                <span className="book-divider-symbol">❖</span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "24px",
                }}
                className="social-stack-grid"
              >
                {linkItems.map((link, i) => {
                  const rotations = [
                    "-2deg",
                    "1.5deg",
                    "-1deg",
                    "2.5deg",
                    "-1.5deg",
                    "1deg",
                    "-2.5deg",
                  ];
                  const rot = rotations[i % rotations.length];

                  return (
                    <a
                      key={link.key}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="parchment social-card reveal"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "28px 24px",
                        borderRadius: "var(--radius-md)",
                        textDecoration: "none",
                        color: "var(--ink-light)",
                        position: "relative",
                        overflow: "hidden",
                        transform: `rotate(${rot})`,
                        transition:
                          "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        transitionDelay: `${i * 0.05}s`,
                        marginTop: i > 0 ? "-8px" : "0",
                        zIndex: linkItems.length - i,
                        borderLeft: `4px solid ${link.color}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform =
                          "rotate(0deg) translateY(-10px) scale(1.02)";
                        e.currentTarget.style.zIndex = "50";
                        e.currentTarget.style.boxShadow =
                          "0 20px 40px rgba(42,36,32,0.2), 0 8px 16px rgba(42,36,32,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = `rotate(${rot})`;
                        e.currentTarget.style.zIndex = String(
                          linkItems.length - i
                        );
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <span
                        className="book-ref"
                        style={{
                          position: "absolute",
                          top: "12px",
                          [isRtl ? "left" : "right"]: "16px",
                          fontSize: "14px",
                          opacity: 0.6,
                          verticalAlign: "baseline",
                        }}
                      >
                        [{i + 1}]
                      </span>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "16px",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                            background: `color-mix(in srgb, ${link.color} 10%, transparent)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: link.color,
                          }}
                        >
                          {link.icon}
                        </div>
                        <div>
                          <p
                            style={{
                              fontFamily: isRtl
                                ? "var(--font-fa)"
                                : "var(--font-en)",
                              fontSize: "15px",
                              fontWeight: 600,
                              color: "var(--charcoal)",
                              marginBottom: "4px",
                              lineHeight: 1.3,
                            }}
                          >
                            {link.label}
                          </p>
                          <p
                            style={{
                              fontSize: "11px",
                              color: "var(--muted)",
                              wordBreak: "break-all",
                            }}
                          >
                            {link.url
                              ?.replace("mailto:", "")
                              .replace("https://", "")
                              .replace("http://", "")}
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── مهارت‌ها ──────────────────────── */}
        <section>
          <div className="container">
            <div className="reveal" style={{ position: "relative" }}>
              <p className="eyebrow">
                {isRtl ? "مهارت‌های فنی" : "Technical Skills"}
              </p>
              <div
                className="book-divider"
                style={{ margin: "16px 0 40px" }}
              >
                <span className="book-divider-symbol">❖</span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                }}
                className="skills-grid"
              >
                <div className="parchment reveal" style={{ padding: "28px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "20px",
                    }}
                  >
                    <i
                      className="ti ti-code"
                      style={{
                        color: "var(--sage-dark)",
                        fontSize: "16px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--sage-dark)",
                        margin: 0,
                      }}
                    >
                      {isRtl ? "زبان‌ها" : "Languages"}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {member.skills.languages.map((s) => (
                      <span
                        key={s}
                        className="tech-pill"
                        style={{ padding: "5px 12px" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="parchment reveal" style={{ padding: "28px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "20px",
                    }}
                  >
                    <i
                      className="ti ti-tools"
                      style={{
                        color: "var(--terracotta)",
                        fontSize: "16px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--terracotta)",
                        margin: 0,
                      }}
                    >
                      {isRtl ? "ابزارها" : "Tools & Tech"}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {member.skills.tools.map((s) => (
                      <span
                        key={s}
                        className="tech-pill"
                        style={{ padding: "5px 12px" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="parchment reveal" style={{ padding: "28px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "20px",
                    }}
                  >
                    <i
                      className="ti ti-brain"
                      style={{
                        color: "var(--dusk-pink)",
                        fontSize: "16px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--dusk-pink)",
                        margin: 0,
                      }}
                    >
                      {isRtl ? "در حال یادگیری" : "Currently Learning"}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {member.skills.learning.map((s) => (
                      <span
                        key={s}
                        className="tech-pill"
                        style={{ padding: "5px 12px" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── نمونه‌کارها ──────────────────────── */}
        {member.works && member.works.length > 0 && (
          <section>
            <div className="container">
              <div
                className="reveal"
                style={{ position: "relative" }}
              >
                <p className="eyebrow">
                  {isRtl ? "نمونه‌کارها" : "Selected Work"}
                </p>
                <div
                  className="book-divider"
                  style={{ margin: "16px 0 40px" }}
                >
                  <span className="book-divider-symbol">❖</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >
                  {member.works.map((work, i) => (
                    <div
                      key={i}
                      className="parchment reveal"
                      style={{
                        padding: "36px 40px",
                        borderRadius: "var(--radius-md)",
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        alignItems: "center",
                        gap: "40px",
                        transition: "transform 0.3s var(--ease)",
                        transitionDelay: `${i * 0.1}s`,
                        position: "relative",
                        overflow: "hidden",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = `translateX(${
                          isRtl ? "-6px" : "6px"
                        })`)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "translateX(0)")
                      }
                    >
                      {i === 0 && (
                        <div
                          className="bookmark"
                          style={{
                            [isRtl ? "right" : "left"]: "24px",
                          }}
                        />
                      )}
                      <div>
                        <div style={{ marginBottom: "12px" }}>
                          <span className="tag">
                            {isRtl ? work.tagFa : work.tag}
                          </span>
                        </div>
                        <h3
                          className="book-title"
                          style={{
                            fontSize: "22px",
                            marginBottom: "10px",
                          }}
                        >
                          {isRtl ? work.titleFa : work.title}
                        </h3>
                        <p
                          className="book-body"
                          style={{
                            fontSize: "15px",
                            color: "var(--muted)",
                            maxWidth: "500px",
                            lineHeight: 1.8,
                          }}
                        >
                          {isRtl ? work.bodyFa : work.body}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            marginTop: "18px",
                            flexWrap: "wrap",
                          }}
                        >
                          {work.tech.map((tech) => (
                            <span
                              key={tech}
                              className="tech-pill"
                              style={{ padding: "4px 12px" }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          border: "1px solid var(--border-strong)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          color: "var(--muted)",
                          fontSize: "16px",
                        }}
                      >
                        <i
                          className={`ti ${
                            isRtl ? "ti-arrow-left" : "ti-arrow-right"
                          }`}
                        ></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── ناوبری فصل‌ها ────────────── */}
        <section style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="container">
            <div
              className="book-divider reveal"
              style={{ marginBottom: "48px" }}
            >
              <span className="book-divider-symbol">❖</span>
            </div>
            
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
              }}
              className="chapter-nav-grid"
            >
              <div>
                {prevMember ? (
                  <Link
                    href={`/team/${prevMember.slug}`}
                    className="parchment reveal"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      padding: "24px",
                      borderRadius: "var(--radius-md)",
                      textDecoration: "none",
                      color: "inherit",
                      transition:
                        "transform 0.3s var(--ease), box-shadow 0.3s var(--ease)",
                      height: "100%",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 30px var(--page-shadow)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "var(--muted-light)",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <i
                        className={`ti ${
                          isRtl ? "ti-arrow-right" : "ti-arrow-left"
                        }`}
                        style={{ fontSize: "12px" }}
                      ></i>
                      {isRtl ? "فصل قبلی" : "Previous Chapter"}
                    </span>
                    <span
                      className="book-title"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {isRtl ? prevMember.nameFa : prevMember.name}
                    </span>
                    <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                      {isRtl ? prevMember.roleFa : prevMember.role}
                    </span>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>

              <div>
                {nextMember ? (
                  <Link
                    href={`/team/${nextMember.slug}`}
                    className="parchment reveal"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      padding: "24px",
                      borderRadius: "var(--radius-md)",
                      textDecoration: "none",
                      color: "inherit",
                      transition:
                        "transform 0.3s var(--ease), box-shadow 0.3s var(--ease)",
                      height: "100%",
                      justifyContent: "center",
                      textAlign: isRtl ? "left" : "right",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 30px var(--page-shadow)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        color: "var(--muted-light)",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        justifyContent: isRtl
                          ? "flex-start"
                          : "flex-end",
                      }}
                    >
                      {isRtl ? "فصل بعدی" : "Next Chapter"}
                      <i
                        className={`ti ${
                          isRtl ? "ti-arrow-left" : "ti-arrow-right"
                        }`}
                        style={{ fontSize: "12px" }}
                      ></i>
                    </span>
                    <span
                      className="book-title"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {isRtl ? nextMember.nameFa : nextMember.name}
                    </span>
                    <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                      {isRtl ? nextMember.roleFa : nextMember.role}
                    </span>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            <div
              className="reveal"
              style={{ textAlign: "center", marginTop: "48px" }}
            >
              <Link
                href="/#team"
                className="btn-primary"
                style={{ padding: "16px 32px" }}
              >
                <i
                  className={`ti ${
                    isRtl ? "ti-arrow-right" : "ti-arrow-left"
                  }`}
                  style={{ fontSize: "16px" }}
                ></i>
                {" "}
                {isRtl ? "بازگشت به فهرست تیم" : "Back to Team Index"}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <BackToTop lang={lang} />

      <style>{`
        /* افکت ورق زدن پیشرفته برای کارت‌های شبکه‌های اجتماعی */
        .social-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          ${isRtl ? "left" : "right"}: 0;
          width: 0;
          height: 0;
          background: linear-gradient(
            ${isRtl ? "225deg" : "135deg"},
            transparent 50%,
            rgba(255, 255, 255, 0.4) 50%,
            var(--sand-2) 55%,
            var(--border-strong) 56%,
            var(--sand) 60%
          );
          border-radius: 0 0 0 var(--radius-md);
          box-shadow: -2px -2px 8px rgba(42, 36, 32, 0.1);
          transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 2;
          pointer-events: none;
        }
        
        .social-card:hover::after {
          width: 80px;
          height: 80px;
        }

        /* ریسپانسیو */
        @media (max-width: 900px) {
          .profile-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 40px !important;
          }
          .profile-grid > div:last-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .bio-grid, .chapter-nav-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .skills-grid, .social-stack-grid {
            grid-template-columns: 1fr !important;
          }
          .social-card {
            transform: rotate(0deg) !important;
            margin-top: 0 !important;
          }
          .social-card::after {
            display: none;
          }
        }
      `}</style>
    </>
  );
}