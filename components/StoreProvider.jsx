"use client";
import { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // خواندن از حافظه مرورگر در اولین بارگذاری
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("parvan-lang") || "fa";
    }
    return "fa";
  });

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("parvan-theme") || "light";
    }
    return "light";
  });

  // همگام‌سازی با تگ‌های HTML و ذخیره در حافظه
  useEffect(() => {
    localStorage.setItem("parvan-lang", lang);
    localStorage.setItem("parvan-theme", theme);
    
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.lang = lang;
    document.body.dir = lang === "fa" ? "rtl" : "ltr";
  }, [lang, theme]);

  return (
    <StoreContext.Provider value={{ lang, setLang, theme, setTheme }}>
      {children}
    </StoreContext.Provider>
  );
}

// هوک اختصاصی برای استفاده آسان در تمام کامپوننت‌ها
export const useStore = () => useContext(StoreContext);