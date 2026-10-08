import Link from "next/link";
import Image from "next/image";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";

export const metadata = {
  title: BRAND_NAME + " | 대전 출장 프리미엄 마사지 스웨디시 1인샵 S슬림 테라피 정보",
  description:
    "대전 출장마사지 유성구, 둔산동, 서구, 중구 등 대전 전지역 힐링 스웨디시 체형관리 정보. 엄선된 아로마 타이 마사지 추천 및 빠른 예약 안내.",
  alternates: {
    canonical: DOMAIN,
  },
  openGraph: {
    title: BRAND_NAME + " | 대전 출장 프리미엄 마사지 S슬림 바디케어",
    description:
      "유성, 둔산, 봉명, 탄방 등 대전 출장마사지 전지역 엄선된 스웨디시 마사지 1인샵 제휴 샵 안내.",
    url: DOMAIN,
    siteName: BRAND_NAME,
    locale: "ko_KR",
    type: "website",
  },
};

export default function HomePage() {
  const customerServicePhone = "0507-1280-3335";
  const defaultCitySlug = "daejeon";

  // 대전 5개 자치구 정보 및 구/동 슬러그 매핑
  const targetDistricts = [
    {
      name: "유성구",
      slug: "yuseong",
      desc: "봉명동·도안동·관평동·신성동·노은",
      popularDongs: [
        { name: "봉명동", slug: "bongmyeong" },
        { name: "관평동", slug: "gwanpyeong" },
        { name: "도안동", slug: "doan" },
      ],
    },
    {
      name: "서구 (둔산권)",
      slug: "seo",
      desc: "둔산동·탄방동·월평동·갈마동·가수원",
      popularDongs: [
        { name: "둔산동", slug: "dunsan" },
        { name: "탄방동", slug: "tanbang" },
        { name: "월평동", slug: "wolpyeong" },
      ],
    },
    {
      name: "중구",
      slug: "junggu",
      desc: "은행선화동·대흥동·유천동·오류동",
      popularDongs: [
        { name: "대흥동", slug: "daeheung" },
        { name: "은행동", slug: "eunhaeng" },
        { name: "선화동", slug: "seonhwa" },
      ],
    },
    {
      name: "동구",
      slug: "donggu",
      desc: "대전역·용전동(복합터미널)·가양동",
      popularDongs: [
        { name: "용전동", slug: "yongjeon" },
        { name: "가양동", slug: "gaya" },
      ],
    },
    {
      name: "대덕구",
      slug: "daedeok",
      desc: "신탄진·송촌동·중리동·오정동",
      popularDongs: [
        { name: "송촌동", slug: "songchon" },
        { name: "중리동", slug: "jungni" },
        { name: "신탄진동", slug: "sintanjin" },
      ],
    },
  ];

  // 동적 링크 수집 (CITIES_DATA 기반 매핑)
  const allLinks = Object.values(CITIES_DATA || {}).flatMap((city: any) =>
    (city.districts || []).flatMap((district: any) =>
      (district.dongs || []).map((dong: any) => ({
        cityName: city.name,
        districtName: district.name,
        dongName: dong.name,
        url: `/${city.slug}/${district.slug}/${dong.slug}`,
        title: dong.seoTitle || `${city.name} ${district.name} ${dong.name} 마사지 힐링 케어`,
      }))
    )
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${BRAND_NAME} 대전 마사지 포털`,
      url: DOMAIN,
      description:
        "대전 유성, 둔산, 봉명, 탄방 등 대전출장 전지역 마사지·스웨디시·체형관리 샵 정보 포털",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${BRAND_NAME} 대전 추천 제휴 지역`,
      itemListElement: (allLinks.length > 0
        ? allLinks
        : targetDistricts.map((r) => ({
            title: `대전 ${r.name} 마사지 테라피`,
            url: `/${defaultCitySlug}/${r.slug}`,
          }))
      ).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: `${DOMAIN}${item.url}`,
      })),
    },
  ];

  return (
    <div className="bg-[#0b0914] text-white font-sans min-h-screen relative overflow-x-hidden pb-32">
      {/* 검색엔진 크롤링용 시맨틱 링크 (DOM 숨김) */}
      <div className="sr-only" aria-hidden="true">
        <ul>
          {allLinks.map((item, idx) => (
            <li key={idx}>
              <a href={item.url}>
                <strong>{item.title}</strong>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-[#0b0914]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
              <span className="w-2.5 h-6 bg-[#00ff88] rounded-full inline-block"></span>
              {BRAND_NAME}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href="#area"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              대전 지역선택
            </a>
            <a
              href={`tel:${customerServicePhone}`}
              className="px-4 py-1.5 rounded-full bg-[#00ff88] text-black font-black text-xs hover:scale-105 transition-transform"
            >
              📞 제휴·예약 문의
            </a>
          </div>
        </div>
      </header>

      {/* 메인 히어로 섹션 */}
      <section className="py-14 px-4 max-w-[960px] mx-auto text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-bold text-xs mb-4">
          DAEJEON PREMIUM MASSAGE & S-SLIM THERAPY
        </span>
        <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight mb-4 text-white">
          대전 마사지 & S슬림 힐링케어
        </h1>
        <p className="text-[#d8d2ea] text-base sm:text-lg mb-8 max-w-[720px] mx-auto leading-relaxed">
          유성구·서구·중구·동구·대덕구 등 대전 전지역의 검증된 힐링 매장을 한눈에 비교하세요.
          <br className="hidden sm:inline" />
          쾌적한 프라이빗 룸, 림프 순환 S슬림 관리, 투명한 정찰제 가격을 실시간 제공합니다.
        </p>

        {/* 대전 자치구 퀵 링크 칩 */}
        <div className="flex flex-wrap justify-center gap-2 max-w-[800px] mx-auto mb-8">
          {targetDistricts.map((district) => (
            <Link
              key={district.slug}
              href={`/${defaultCitySlug}/${district.slug}`}
              className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-gray-200 hover:border-[#00ff88] hover:text-[#00ff88] transition-all"
            >
              #{district.name}
            </Link>
          ))}
        </div>
      </section>

      {/* 안심 서비스 지표 */}
      <section className="bg-[#141024] border-y border-white/10 py-5 px-4">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs sm:text-sm font-bold">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#00ff88] text-lg">🏢</span>
            <span>대전 검증 제휴 매장</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#00ff88] text-lg">📋</span>
            <span>투명한 정찰제 요금</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#00ff88] text-lg">🛡</span>
            <span>청결·위생 1인 프라이빗룸</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#00ff88] text-lg">💎</span>
            <span>S슬림 체형·림프 케어</span>
          </div>
        </div>
      </section>

      <main className="max-w-[1000px] mx-auto px-4 mt-14 space-y-16">
        {/* 지역별 매장 탐색 */}
        <section id="area">
          <div className="text-center mb-10">
            <p className="text-[#00ff88] font-extrabold text-xs tracking-widest mb-1">
              DAEJEON DISTRICTS
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white">대전 자치구별 매장 안내</h2>
            <p className="text-gray-400 text-sm mt-1">
              원하시는 구를 선택하여 소속된 동별 추천 매장과 상세 코스를 확인하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {targetDistricts.map((district) => (
              <div
                key={district.slug}
                id={`area-${district.slug}`}
                className="p-5 rounded-2xl bg-[#141024] border border-white/10 hover:border-[#00ff88]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-white text-lg group-hover:text-[#00ff88] transition-colors">
                      {district.name}
                    </span>
                    <span className="text-[10px] text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded font-bold">
                      추천
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{district.desc}</p>

                  {/* 해당 구의 대표 동 바로가기 태그 */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {district.popularDongs.map((dong) => (
                      <Link
                        key={dong.slug}
                        href={`/${defaultCitySlug}/${district.slug}/${dong.slug}`}
                        className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-gray-300 hover:text-black hover:bg-[#00ff88] transition-colors"
                      >
                        {dong.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 구 페이지로 이동하는 메인 버튼 */}
                <Link
                  href={`/${defaultCitySlug}/${district.slug}`}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#00ff88] hover:text-black text-white text-xs font-black text-center transition-all block border border-white/10 group-hover:border-[#00ff88]"
                >
                  {district.name} 전체 매장 보기 →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 표준 관리 코스 & 프로그램 안내 */}
        <section id="course">
          <div className="text-center mb-8">
            <p className="text-[#ba8cff] font-extrabold text-xs tracking-widest mb-1">
              PROGRAM & PRICE
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white">대전 테라피 표준 코스</h2>
            <p className="text-gray-400 text-sm mt-1">
              제휴 샵에서 제공하는 대표 코스 및 기준 요금 가이드입니다.
            </p>
          </div>

          <div className="space-y-4">
            {/* S슬림 시그니처 케어 */}
            <div className="p-5 rounded-2xl bg-[#1d1633] border border-[#00ff88]/40 shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💎</span>
                  <h3 className="text-lg font-black text-[#00ff88]">시그니처 S슬림 림프 테라피</h3>
                </div>
                <span className="text-xs text-black bg-[#00ff88] font-black px-2.5 py-0.5 rounded-full">
                  인기 No.1
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-300 mb-1">60분 코스</p>
                  <p className="font-black text-white text-sm sm:text-base">110,000원</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-300 mb-1">90분 코스</p>
                  <p className="font-black text-white text-sm sm:text-base">130,000원</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-300 mb-1">120분 코스</p>
                  <p className="font-black text-white text-sm sm:text-base">160,000원</p>
                </div>
              </div>
            </div>

            {/* 프리미엄 스웨디시 */}
            <div className="p-5 rounded-2xl bg-[#141024] border border-[#ba8cff]/30">
              <div className="flex items-center justify-between border-b border-[#ba8cff]/20 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  <h3 className="text-lg font-black text-[#ba8cff]">프리미엄 감성 스웨디시</h3>
                </div>
                <span className="text-xs text-[#ba8cff] font-bold bg-[#ba8cff]/10 px-2.5 py-1 rounded-full border border-[#ba8cff]/30">
                  부드러운 오일 압
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-300 mb-1">60분 코스</p>
                  <p className="font-extrabold text-white">100,000원</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-300 mb-1">90분 코스</p>
                  <p className="font-extrabold text-white">120,000원</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-300 mb-1">120분 코스</p>
                  <p className="font-extrabold text-white">150,000원</p>
                </div>
              </div>
            </div>

            {/* 베이직 건식 & 아로마 */}
            <div className="p-5 rounded-2xl bg-[#141024] border border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌿</span>
                  <h3 className="text-lg font-black text-white">전신 힐링 타이 & 아로마</h3>
                </div>
                <span className="text-xs text-gray-300 font-bold bg-white/10 px-2.5 py-1 rounded-full">
                  가성비 힐링
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-gray-400 mb-1">타이 60분</p>
                  <p className="font-extrabold text-white">50,000원</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-gray-400 mb-1">아로마 60분</p>
                  <p className="font-extrabold text-white">60,000원</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-gray-400 mb-1">스페셜 90분</p>
                  <p className="font-extrabold text-white">80,000원</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 대전 후기 및 FAQ */}
        <section id="review">
          <div className="text-center mb-8">
            <p className="text-[#00ff88] font-extrabold text-xs tracking-widest mb-1">
              USER REVIEW & FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white">대전 고객 후기 및 가이드</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-3xl bg-[#141024] border border-white/10 space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <span>💬</span> 실시간 방문 후기
              </h3>
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-gray-200 mb-1">
                    "유성 봉명동 스웨디시 다녀왔는데 시설 깔끔하고 관리사님 친절하셔서 단골 예약했습니다."
                  </p>
                  <span className="text-[#00ff88] font-bold">- 대전 유성구 회원님</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-gray-200 mb-1">
                    "둔산동 갤러리아 근처 1인샵 S슬림 코스 받았는데 하체 부종 빠지고 몸이 엄청 가벼워졌어요."
                  </p>
                  <span className="text-[#ba8cff] font-bold">- 대전 서구 둔산동 회원님</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-gray-200 mb-1">
                    "복합터미널 근처에서 출장 후 피로 풀러 들렀는데 대기 없이 쾌적하게 힐링했습니다."
                  </p>
                  <span className="text-gray-300 font-bold">- 대전 동구 회원님</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#141024] border border-white/10 space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <span>❓</span> 자주 묻는 질문 (FAQ)
              </h3>
              <div className="space-y-3 text-xs leading-relaxed text-gray-300">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <p className="font-bold text-white mb-0.5">Q. 당일 예약도 가능한가요?</p>
                  <p className="text-gray-400">
                    네, 대부분의 샵이 당일 예약 가능하며 인기 시간대(오후 7시~10시)는 1~2시간 전 사전 연락을 권장합니다.
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <p className="font-bold text-white mb-0.5">Q. 건전 힐링 샵만 등록되나요?</p>
                  <p className="text-gray-400">
                    {BRAND_NAME}은 법적 기준과 안전 수칙을 준수하는 건전 테라피, 바디케어, 에스테틱 매장만을 정식 검증 후 등록합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="mt-20 py-8 px-4 border-t border-white/10 text-center text-xs text-gray-400">
        <p className="font-bold text-gray-300 mb-1">
          {BRAND_NAME} - 대전 마사지·스웨디시·1인샵 정보 가이드 플랫폼
        </p>
        <p>유성구, 서구(둔산), 중구, 동구, 대덕구 대전 전지역 제휴 매장 실시간 안내</p>
        <p className="mt-4 text-gray-500">© 2026 {BRAND_NAME}. All rights reserved.</p>
      </footer>

      {/* 모바일 하단 고정 플로팅 바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[480px] bg-[#0b0914]/95 backdrop-blur-xl border border-white/20 p-2.5 rounded-2xl shadow-2xl z-50 flex gap-2">
        <a
          href="#area"
          className="flex-1 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1 active:scale-95 transition-all"
        >
          📍 대전 구별 매장
        </a>
        <a
          href={`tel:${customerServicePhone}`}
          className="flex-1 py-2.5 rounded-xl bg-[#00ff88] text-black font-black text-xs sm:text-sm flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all"
        >
          📞 제휴 및 예약 문의
        </a>
      </div>
    </div>
  );
}