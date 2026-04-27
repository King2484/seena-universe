import type { Metadata, Viewport } from "next";
import "./globals.css";
import Noise from "@/components/Noise";
import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "Seena Universe — Coffee · Pilates · Art",
  description: "Three spaces, one soul. A sanctuary crafted for those who move with intention.",
  keywords: ["pilates", "coffee shop", "art studio", "seena studios", "raiyas"],
};

export const viewport: Viewport = {
  themeColor: "#2C2016",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LoadingScreen />
        <Noise />
        {children}
      </body>
    </html>
  );
}
