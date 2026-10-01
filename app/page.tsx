import Link from "next/link";
import Image from "next/image";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";

export const metadata = {
  title: `${BRAND_NAME} | 대전·청주·천안 출장 프라이빗케어 마사지 & 테라피 정보`,
  description:
    "대전, 청주, 세종, 천안 시·군 출장 마사지, 타이, 아로마, 스웨디시, 1인샵 테라피 매장 정보 및 코스별 가격 안내.",
  alternates: {
    canonical: DOMAIN,
  },
  openGraph: {
    title: `${BRAND_NAME} | 대전·청주·천안 출장 프라이빗케어 마사지 플랫폼`,
    description:
      "대전·청주·세종·천안 등 충청·전북 12개 지역 엄선된 출장마사지·스웨디시 제휴 샵 안내.",
    url: DOMAIN,
    siteName: BRAND_NAME,
    locale: "ko_KR",
    type: "website",
  },
};

export default function HomePage() {
  const customerServicePhone = "0507-1280-3335";

  // 12개 권역 리스트 (지역 핵심 상권 키워드 포함)
  const targetRegions = [
    { name: "대전", slug: "daejeon", desc: "유성·둔산·월평·봉명 등 전지역" },
    { name: "청주", slug: "cheongju", desc: "복대·율량·가경·오창 테라피" },
    { name: "세종", slug: "sejong", desc: "나성·도담·보람·조치원 스파" },
    { name: "천안", slug: "cheonan", desc: "불당·두정·성정·백석 힐링샵" },
    { name: "아산", slug: "asan", desc: "온천·배방·탕정 프리미엄 케어" },
    { name: "공주", slug: "gongju", desc: "신관·금흥·중동 바디 테라피" },
    { name: "계룡", slug: "gyeryong", desc: "엄사·금암 건식/아로마" },
    { name: "논산", slug: "nonsan", desc: "취암·내동 맞춤형 힐링 케어" },
    { name: "옥천", slug: "okcheon", desc: "옥천읍 감성 테라피/타이" },
    { name: "금산", slug: "geumsan", desc: "금산읍 전신 바디 & 스킨" },
    { name: "익산", slug: "iksan", desc: "영등·모현·신동 스웨디시" },
    { name: "전주", slug: "jeonju", desc: "신시가지·효자·덕진·송천" },
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
      name: `${BRAND_NAME} 중부권 마사지 포털`,
      url: DOMAIN,
      description:
        "대전, 청주, 세종, 천안, 전주 등 중부권 12개 시군 마사지·스파·에스테틱 샵 정보 포털",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "중부마사지넷 제휴 및 추천 지역",
      itemListElement: (allLinks.length > 0
        ? allLinks
        : targetRegions.map((r) => ({
            title: `${r.name} 마사지 테라피`,
            url: `/${r.slug}`,
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
              지역 선택
            </a>
            <a
              href={`tel:${customerServicePhone}`}
              className="px-4 py-1.5 rounded-full bg-[#00ff88] text-black font-black text-xs hover:scale-105 transition-transform"
            >
              📞 입점·예약 문의
            </a>
          </div>
        </div>
      </header>

      {/* 메인 히어로 섹션 */}
      <section className="py-14 px-4 max-w-[960px] mx-auto text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-bold text-xs mb-4">
          CENTRAL KOREA MASSAGE & SPA GUIDE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight mb-4 text-white">
          중부권 마사지 & 프리미엄 테라피
        </h1>
        <p className="text-[#d8d2ea] text-base sm:text-lg mb-8 max-w-[720px] mx-auto leading-relaxed">
          대전, 세종, 충남, 충북, 전북 12개 권역의 검증된 힐링 매장을 한눈에 비교하세요.<br className="hidden sm:inline" />
          쾌적한 룸 컨디션, 정찰제 코스 요금, 고객 맞춤 추천을 실시간으로 확인하실 수 있습니다.
        </p>

        {/* 12개 지역 퀵 네비게이션 칩 */}
        <div className="flex flex-wrap justify-center gap-2 max-w-[800px] mx-auto mb-8">
          {targetRegions.map((region) => (
            <Link
              key={region.slug}
              href={`#area-${region.slug}`}
              className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-gray-200 hover:border-[#00ff88] hover:text-[#00ff88] transition-all"
            >
              #{region.name}
            </Link>
          ))}
        </div>
      </section>

      {/* 안심 서비스 지표 */}
      <section className="bg-[#141024] border-y border-white/10 py-5 px-4">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs sm:text-sm font-bold">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#00ff88] text-lg">🏢</span>
            <span>검증된 정식 제휴 매장</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#00ff88] text-lg">📋</span>
            <span>투명한 정찰제 가격</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#00ff88] text-lg">🛡</span>
            <span>청결·위생 관리 매장</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#00ff88] text-lg">🧭</span>
            <span>중부·호남 12개 시·군 통합</span>
          </div>
        </div>
      </section>

      <main className="max-w-[1000px] mx-auto px-4 mt-14 space-y-16">
        {/* 지역별 매장 탐색 */}
        <section id="area">
          <div className="text-center mb-10">
            <p className="text-[#00ff88] font-extrabold text-xs tracking-widest mb-1">REGIONAL DIRECTORY</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white">중부권 12개 지역 안내</h2>
            <p className="text-gray-400 text-sm mt-1">원하시는 지역을 선택하시면 상세 매장 목록과 세부 코스를 보실 수 있습니다.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
            {targetRegions.map((region) => (
              <div
                key={region.slug}
                id={`area-${region.slug}`}
                className="p-4 rounded-2xl bg-[#141024] border border-white/10 hover:border-[#00ff88]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-white text-base sm:text-lg group-hover:text-[#00ff88] transition-colors">
                      {region.name} 마사지
                    </span>
                    <span className="text-[10px] text-[#00ff88] bg-[#00ff88]/10 px-1.5 py-0.5 rounded font-bold">
                      인기
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1">{region.desc}</p>
                </div>
                <Link
                  href={`/${region.slug}`}
                  className="mt-3.5 w-full py-1.5 rounded-lg bg-white/5 hover:bg-[#00ff88] hover:text-black text-gray-300 text-xs font-bold text-center transition-all block"
                >
                  매장 보기 →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 표준 관리 코스 & 프로그램 안내 */}
        <section id="course">
          <div className="text-center mb-8">
            <p className="text-[#ba8cff] font-extrabold text-xs tracking-widest mb-1">PROGRAM & PRICE</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white">표준 테라피 코스 안내</h2>
            <p className="text-gray-400 text-sm mt-1">제휴 샵에서 제공하는 대표 관리 코스 및 기준 요금입니다.</p>
          </div>

          <div className="space-y-4">
            {/* 건식 테라피 */}
            <div className="p-5 rounded-2xl bg-[#141024] border border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌿</span>
                  <h3 className="text-lg font-black text-white">클래식 건식 케어 (타이)</h3>
                </div>
                <span className="text-xs text-[#00ff88] font-bold bg-[#00ff88]/10 px-2.5 py-1 rounded-full border border-[#00ff88]/30">전신 근육 이완</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-gray-400 mb-1">60분 코스</p>
                  <p className="font-extrabold text-white">50,000원</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-gray-400 mb-1">90분 코스</p>
                  <p className="font-extrabold text-white">70,000원</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-gray-400 mb-1">120분 코스</p>
                  <p className="font-extrabold text-white">80,000원</p>
                </div>
              </div>
            </div>

            {/* 아로마 테라피 */}
            <div className="p-5 rounded-2xl bg-[#141024] border border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌸</span>
                  <h3 className="text-lg font-black text-white">천연 에센셜 아로마 케어</h3>
                </div>
                <span className="text-xs text-[#ba8cff] font-bold bg-[#ba8cff]/10 px-2.5 py-1 rounded-full border border-[#ba8cff]/30">스트레스 완화 & 힐링</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-gray-400 mb-1">60분 코스</p>
                  <p className="font-extrabold text-white">60,000원</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-gray-400 mb-1">90분 코스</p>
                  <p className="font-extrabold text-white">80,000원</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-gray-400 mb-1">120분 코스</p>
                  <p className="font-extrabold text-white">90,000원</p>
                </div>
              </div>
            </div>

            {/* 스웨디시 케어 */}
            <div className="p-5 rounded-2xl bg-[#18132c] border border-[#ba8cff]/30">
              <div className="flex items-center justify-between border-b border-[#ba8cff]/20 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  <h3 className="text-lg font-black text-[#ba8cff]">프리미엄 림프 스웨디시</h3>
                </div>
                <span className="text-xs text-black bg-[#ba8cff] font-black px-2.5 py-0.5 rounded-full">부드러운 압 테라피</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-300 mb-1">60분 코스</p>
                  <p className="font-black text-white text-sm sm:text-base">100,000원</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-300 mb-1">90분 코스</p>
                  <p className="font-black text-white text-sm sm:text-base">120,000원</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-300 mb-1">120분 코스</p>
                  <p className="font-black text-white text-sm sm:text-base">150,000원</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 제휴 샵 이용 후기 및 FAQ */}
        <section id="review">
          <div className="text-center mb-8">
            <p className="text-[#00ff88] font-extrabold text-xs tracking-widest mb-1">USER REVIEW & FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white">이용 후기 및 가이드</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-3xl bg-[#141024] border border-white/10 space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <span>💬</span> 생생 이용 후기
              </h3>
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-gray-200 mb-1">"대전 유성온천역 근처 샵 다녀왔는데 주차도 편리하고 피로가 싹 풀렸습니다."</p>
                  <span className="text-[#00ff88] font-bold">- 대전 유성구 회원님</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-gray-200 mb-1">"청주 복대동 스웨디시 샵 룸 컨디션이 매우 청결하고 조용해서 힐링하기 좋았어요."</p>
                  <span className="text-[#ba8cff] font-bold">- 청주 흥덕구 회원님</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-gray-200 mb-1">"천안 불당동 아로마 케어 받았는데 뭉친 목과 어깨가 확실히 가벼워졌네요."</p>
                  <span className="text-gray-300 font-bold">- 천안 서북구 회원님</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#141024] border border-white/10 space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <span>❓</span> 자주 묻는 질문 (FAQ)
              </h3>
              <div className="space-y-3 text-xs leading-relaxed text-gray-300">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <p className="font-bold text-white mb-0.5">Q. 예약 및 결제는 어떻게 하나요?</p>
                  <p className="text-gray-400">원하시는 지역 매장 페이지에서 전화 문의 또는 사전 예약을 진행하실 수 있으며, 현장 및 사전 결제 방식은 매장별 정책에 따릅니다.</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <p className="font-bold text-white mb-0.5">Q. 건전 힐링 샵만 등록되나요?</p>
                  <p className="text-gray-400">{BRAND_NAME}은 이용 수칙을 준수하는 건전 테라피, 바디케어, 에스테틱 매장만을 정식 등록하여 운영합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="mt-20 py-8 px-4 border-t border-white/10 text-center text-xs text-gray-400">
        <p className="font-bold text-gray-300 mb-1">
          {BRAND_NAME} - 중부권 마사지·에스테틱·스파 정보 안내 플랫폼
        </p>
        <p>대전, 청주, 세종, 천안, 아산, 공주, 계룡, 논산, 옥천, 금산, 익산, 전주 전 지역 제휴 샵 안내</p>
        <p className="mt-4 text-gray-500">© 2026 {BRAND_NAME}. All rights reserved.</p>
      </footer>

      {/* 모바일 하단 고정 플로팅 바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[480px] bg-[#0b0914]/95 backdrop-blur-xl border border-white/20 p-2.5 rounded-2xl shadow-2xl z-50 flex gap-2">
        <a
          href="#area"
          className="flex-1 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1 active:scale-95 transition-all"
        >
          📍 지역별 샵 찾기
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