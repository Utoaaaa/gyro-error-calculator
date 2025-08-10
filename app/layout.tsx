import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "航海電羅經差計算器 | Gyrocompass Error Calculator",
  description: "專業的航海電羅經差計算器，使用觀測太陽方位法精確計算電羅經差。",
  keywords: "電羅經差,航海計算器,太陽方位,航海導航,羅經校正",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
