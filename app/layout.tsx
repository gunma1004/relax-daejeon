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
  metadataBase: new URL("https://jungbumassage.netlify.app"),
  title: {
    template: "%s | 중부마사지넷",
    default: "중부마사지넷 | 대전·청주·세종·천안·전주 마사지 & 테라피 정보",
  },
  description:
    "대전, 청주, 세종, 천안, 아산, 공주, 계룡, 논산, 옥천, 금산, 익산, 전주 전 지역 힐링 마사지·스파·에스테틱 정보. 타이, 아로마, 스웨디시 샵 추천 및 예약 안내.",
  keywords: [
    "중부마사지넷",
    "중부마사지",
    "대전마사지",
    "청주마사지",
    "세종마사지",
    "천안마사지",
    "아산마사지",
    "공주마사지",
    "계룡마사지",
    "논산마사지",
    "옥천마사지",
    "금산마사지",
    "익산마사지",
    "전주마사지",
    "스웨디시",
    "타이마사지",
    "아로마테라피",
    "1인샵",
    "홈타이",
    "에스테틱",
  ],
  alternates: {
    canonical: "https://jungbumassage.netlify.app",
  },
  openGraph: {
    title: "중부마사지넷 | 대전·충청·전북 힐링 마사지 플랫폼",
    description:
      "대전, 청주, 세종, 천안, 아산, 익산, 전주 등 중부권 검증된 마사지·스웨디시·스파 샵 정보를 한눈에 확인하세요.",
    url: "https://jungbumassage.netlify.app",
    siteName: "중부마사지넷",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "중부마사지넷 | 대전·충청·전북 힐링 마사지 플랫폼",
    description:
      "대전, 청주, 세종, 천안, 전주 등 중부권 마사지·스웨디시·스파 정보 안내",
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