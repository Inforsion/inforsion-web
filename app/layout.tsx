import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inforsion 소상공인을 위한 가게 관리 서비스 - Web",
  description:
    "소상공인을 위한 스마트한 가게 관리 솔루션. 매출 분석, 재고 관리, 고객 관리를 한 번에. Webview 및 랜딩페이지 지원",

  keywords: [
    "소상공인",
    "가게관리",
    "매출분석",
    "재고관리",
    "POS",
    "인포션",
    "Inforsion",
  ],
  authors: [{ name: "Inforsion" }],
  creator: "Inforsion",
  publisher: "Inforsion",

  openGraph: {
    title: "Inforsion - 소상공인을 위한 가게 관리 서비스",
    description:
      "소상공인을 위한 스마트한 가게 관리 솔루션. 매출 분석, 재고 관리, 고객 관리를 한 번에.",
    url: "https://webview.inforsion.kr",
    siteName: "Inforsion",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/inforsion-logo-color.png",
        width: 1200,
        height: 630,
        alt: "Inforsion - 소상공인을 위한 가게 관리 서비스",
      },
    ],
  },

  icons: {
    icon: [
      "/inforsion-logo-color.png",
      {
        url: "/favicon.svg",
        sizes: "any",
      },
    ],
    shortcut: "/inforsion-logo-color.png",
    apple: "/inforsion-logo-color.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/inforsion-logo-color.png",
    },
  },

  manifest: "/manifest.json",
  themeColor: "#006FFD",
  colorScheme: "light dark",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://webview.inforsion.kr",
    languages: {
      "ko-KR": "https://webview.inforsion.kr",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        cz-shortcut-listen="true"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
