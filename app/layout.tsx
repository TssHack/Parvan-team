import "./globals.css";
import { StoreProvider } from "../components/StoreProvider";
import { ReactNode } from "react";

export const metadata = {
  title: "پروان | Parvan Engineering",
  description: "Engineering with intent, delivered with craft.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}