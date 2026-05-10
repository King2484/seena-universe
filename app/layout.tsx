import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import ThemeTransition from "../components/ThemeTransition";
import SmoothScroll from "../components/SmoothScroll";
import CustomCursor from "../components/CustomCursor";

export const metadata: Metadata = {
  title: "455 HAUS | Digital Flagship",
  description: "A cinematic architectural portal into coffee, pilates, and art.",
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)]">
        <ThemeProvider>
          <CustomCursor />
          <ThemeTransition />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
