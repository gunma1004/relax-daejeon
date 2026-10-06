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
  metadataBase: new URL("https://relax-daejeon.netlify.app"),
  title: {
    template: "%s | 릴렉스대전S슬립",
    default: "대전 출장 S슬립 마사지·스웨디시·1인샵·에스테틱 추천 가이드 | 릴렉스대전",
  },
  description:
    "대전 출장마사지 유성구, 둔산동, 서구, 중구 등 대전 전지역 힐링 스웨디시·체형관리 마사지샵 정보. 엄선된, 아로마, 타이 마사지 추천 및 빠른 예약 안내.",
  keywords: [
    "릴렉스대전S슬림",
    "대전출장 S슬립마사지",
    "대전스웨디시",
    "대전1인샵",
    "대전체형관리",
    "대전슬림케어",
    "둔산동마사지",
    "유성마사지",
    "봉명동마사지",
    "탄방동마사지",
    "대전아로마",
    "대전타이마사지",
    "대전에스테틱",
    "대전스파",
    "대전건마",
  ],
  alternates: {
    canonical: "https://relax-daejeon.netlify.app",
  },
  openGraph: {
    title: "대전 출장 S슬립 마사지 & 슬림 테라피 | 릴렉스 대전S슬림",
    description:
      "대전 전지역 엄선된 출장마사지·스웨디시·1인샵·에스테틱 정보를 빠르고 편리하게 확인하세요.",
    url: "https://relax-daejeon.netlify.app",
    siteName: "릴렉스대전S슬림",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "릴렉스대전S슬림 | 대전 마사지·스웨디시 플랫폼",
    description:
      "대전 유성, 둔산 등 전지역 마사지·스웨디시·1인샵 정보 안내",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "LA_pPxDDG8woTpUkC-go8lX1KK6GvlR9z0izx4KkUMM",
    other: {
      "naver-site-verification": "b658c45bbee78c6c29d361167e65cc845f195901",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}