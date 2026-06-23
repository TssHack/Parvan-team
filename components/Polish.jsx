"use client";
import { useState, useEffect } from "react";

/* ─── Scroll Progress — Book Spine ──────────────── */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 200,
        background: "var(--border)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, var(--sage), var(--terracotta), var(--dusk-pink))",
          transition: "width 0.1s linear",
          borderRadius: "0 2px 2px 0",
        }}
      />
    </div>
  );
}

/* ─── Back to Top — Bookmark Ribbon ─────────────── */
export function BackToTop({ lang }) {
  const [show, setShow] = useState(false);
  const isRtl = lang === "fa";

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label={isRtl ? "بازگشت به بالا" : "Back to top"}
      style={{
        position: "fixed",
        bottom: "32px",
        [isRtl ? "left" : "right"]: "32px",
        zIndex: 90,
        width: "44px",
        height: "72px",
        background: "var(--terracotta)",
        border: "none",
        borderRadius: "4px 4px 0 0",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "12px",
        gap: "4px",
        boxShadow: "0 4px 16px rgba(196, 96, 42, 0.3)",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        pointerEvents: show ? "auto" : "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(196, 96, 42, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(196, 96, 42, 0.3)";
      }}
    >
      {/* Ribbon triangle */}
      <div
        style={{
          position: "absolute",
          bottom: "-8px",
          left: 0,
          width: 0,
          height: 0,
          borderLeft: "22px solid var(--terracotta)",
          borderRight: "22px solid var(--terracotta)",
          borderBottom: "8px solid transparent",
        }}
      />
      <i
        className={`ti ${isRtl ? "ti-arrow-up" : "ti-arrow-up"}`}
        style={{ color: "#fff", fontSize: "18px" }}
      />
      <span
        style={{
          color: "rgba(255,255,255,0.8)",
          fontSize: "8px",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          lineHeight: 1,
          marginTop: "2px",
        }}
      >
        {isRtl ? "بالا" : "TOP"}
      </span>
    </button>
  );
}

/* ─── Page Load Animation ──────────────────────── */
export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 400);
    const t2 = setTimeout(() => setHidden(true), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--sand)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
        pointerEvents: "none",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* Book opening animation */}
        <div style={{ position: "relative", width: "60px", height: "48px", margin: "0 auto 16px" }}>
          {/* Left page */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "28px",
              height: "100%",
              background: "var(--parchment)",
              borderRadius: "4px 0 0 4px",
              border: "1px solid var(--border-strong)",
              borderRight: "none",
              transformOrigin: "right center",
              animation: "bookOpenLeft 0.8s ease 0.2s both",
            }}
          />
          {/* Right page */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "28px",
              height: "100%",
              background: "var(--parchment)",
              borderRadius: "0 4px 4px 0",
              border: "1px solid var(--border-strong)",
              borderLeft: "none",
              transformOrigin: "left center",
              animation: "bookOpenRight 0.8s ease 0.2s both",
            }}
          />
          {/* Spine */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              transform: "translateX(-50%)",
              width: "4px",
              height: "100%",
              background: "var(--terracotta)",
              borderRadius: "2px",
              opacity: 0.6,
            }}
          />
        </div>
        <p
          className="book-subtitle"
          style={{ fontSize: "13px", color: "var(--muted)" }}
        >
          Opening...
        </p>
      </div>
    </div>
  );
}

/* ─── Smooth Scroll Offset Fix ──────────────────── */
export function SmoothScrollOffset() {
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerHeight = 100;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: "smooth" });

      // Update URL without scroll jump
      history.pushState(null, "", href);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}