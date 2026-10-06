import Link from "next/link";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";
import { notFound } from "next/navigation";

// 40개의 순환형 SEO 패턴 (타이틀: '출장 [수식어] 마사지' 분리 구조 / 디스크립션: 출장 마사지 필수 결합)
export const SEO_PATTERNS = [
  { t: "출장 S슬림 마사지 & 림프 케어", d: "출장 마사지 전문 힐링 가이드. 붓기 완화 및 전신 S슬림 림프 테라피와 정찰제 가격 정보." },
  { t: "출장 스웨디시 마사지 & 감성 케어", d: "출장 마사지 전문 힐링 가이드. 부드러운 림프 순환 테라피와 정찰제 가격 정보." },
  { t: "출장 리프레쉬 마사지 & 피로 회복", d: "출장 마사지 추천 플랫폼. 뭉친 전신 근육을 개운하게 풀어주는 활력 테라피 코스." },
  { t: "출장 힐링 마사지 & 프리미엄 테라피", d: "출장 마사지 엄선 정보 포털. 지친 일상 속 편안한 휴식을 제공하는 안심 케어 매장." },
  { t: "출장 아로마 마사지 & 에센셜 바디케어", d: "출장 마사지 제휴 매장 안내. 최고급 천연 에센셜 오일로 누리는 심신 안정 테라피." },
  { t: "출장 타이 마사지 & 전신 스트레칭", d: "출장 마사지 코스별 비교. 숙련된 테라피스트의 체계적인 전통 건식 수기 프로그램." },
  { t: "출장 릴렉싱 마사지 & 딥티슈 케어", d: "출장 마사지 예약 안내. 속근육 긴장 완화와 쾌적한 룸 컨디션을 갖춘 전문 샵." },
  { t: "출장 감성 스웨디시 마사지 전문점", d: "출장 마사지 완벽 가이드. 섬세한 터치와 따뜻한 오일 케어로 완성하는 프리미엄 휴식." },
  { t: "출장 로열 바디 마사지 & 맞춤 관리", d: "출장 마사지 실시간 현황 안내. 1:1 개인 맞춤형 체형 케어와 친절한 테라피스트." },
  { t: "출장 프리미엄 힐링 마사지 코스", d: "출장 마사지 후기 및 가격 비교. 청결한 위생 관리와 투명한 정찰제 운영 매장." },
  { t: "출장 밸런스 케어 마사지 & 컨디셔닝", d: "출장 마사지 인기 명소 안내. 흐트러진 바디 밸런스를 바로잡아주는 체계적 수기 관리." },
  { t: "출장 딥 릴렉스 마사지 & 휴식 공간", d: "출장 마사지 전문 제휴망. 복잡한 도심 속 언제든 편리하게 이용하는 힐링 프로그램." },
  { t: "출장 림프 순환 마사지 & 스파 케어", d: "출장 마사지 최신 정보. 부종 완화와 혈액 순환을 촉진하는 프라이빗 웰니스 코스." },
  { t: "출장 프라이빗 1인샵 마사지 추천", d: "출장 마사지 맞춤 예약 센터. 독립된 공간에서 온전히 나만을 위해 준비된 맞춤 힐링." },
  { t: "출장 소프트 아로마 마사지 안내", d: "출장 마사지 대표 테라피. 은은한 천연 향기와 함께 스트레스를 부드럽게 녹여내는 코스." },
  { t: "출장 전통 건식 마사지 & 지압 테라피", d: "출장 마사지 정식 등록 매장. 결리고 뻐근한 부위를 정밀하게 짚어주는 수기 요법." },
  { t: "출장 클래식 테라피 마사지 명가", d: "출장 마사지 코스 안내 포털. 오랜 경험과 전문성을 갖춘 테라피스트의 정성 어린 케어." },
  { t: "출장 웰니스 바디 마사지 & 힐링 스파", d: "출장 마사지 요금 비교. 건강한 라이프스타일을 위한 전신 순환 및 릴렉스 프로그램." },
  { t: "출장 스페셜 에스테틱 마사지 추천", d: "출장 마사지 투명 예약 안내. 피부 보습과 전신 피로 회복을 동시에 잡는 복합 케어." },
  { t: "출장 활력 충전 마사지 & 컨디션 케어", d: "출장 마사지 검증 샵 리스트. 지친 현대인의 활력을 깨워주는 리바이탈라이징 테라피." },
  { t: "출장 너브 릴렉스 마사지 & 심신 힐링", d: "출장 마사지 추천 코스. 신경계 안정과 깊은 숙면을 유도하는 편안한 림프 관리." },
  { t: "출장 오일 테라피 마사지 & 스킨케어", d: "출장 마사지 정식 제휴 매장. 부드러운 발림성의 오일로 전신 혈자리를 자극하는 케어." },
  { t: "출장 원기 회복 마사지 & 전신 테라피", d: "출장 마사지 전문 안내소. 누적된 만성 피로와 스트레스를 단번에 씻어내는 힐링." },
  { t: "출장 릴렉세이션 마사지 & 감성 힐링", d: "출장 마사지 실시간 상담. 감미로운 음악과 아늑한 분위기 속에서 누리는 최상의 안식." },
  { t: "출장 파워 전신 마사지 & 스포츠 케어", d: "출장 마사지 표준 요금제. 운동 전후 긴장된 근육과 인대를 시원하게 풀어주는 기법." },
  { t: "출장 딥 하모니 마사지 & 림프 힐링", d: "출장 마사지 검증 플랫폼. 몸과 마음의 조화를 되찾아주는 섬세한 터치와 힐링 코스." },
  { t: "출장 집중 스트레칭 마사지 & 체형 교정", d: "출장 마사지 안전 이용 가이드. 굽은 등과 뭉친 어깨를 개운하게 펴주는 전신 관리." },
  { t: "출장 아로마 림프 마사지 & 디톡스 케어", d: "출장 마사지 프리미엄 안내. 노폐물 배출과 순환을 촉진하는 아로마 테라피 프로그램." },
  { t: "출장 센시티브 스웨디시 마사지 추천", d: "출장 마사지 이용 팁. 특유의 부드럽고 따뜻한 리듬감으로 깊은 이완을 주는 감성 코스." },
  { t: "출장 힐링 바디 마사지 & 릴렉스 포털", d: "출장 마사지 실시간 매칭. 철저한 위생 수칙 준수와 편안한 룸 컨디션을 갖춘 샵." },
  { t: "출장 모던 스웨디시 마사지 & 감각 케어", d: "출장 마사지 전문 큐레이션. 감각적인 공간에서 경험하는 수준 높은 유러피언 테라피." },
  { t: "출장 쾌적 힐링 마사지 & 안심 테라피", d: "출장 마사지 공식 등록처. 언제나 쾌적하고 안전하게 믿고 찾는 대표 테라피." },
  { t: "출장 젠틀 아로마 마사지 & 순환 케어", d: "출장 마사지 상세 코스 확인. 자극 없이 부드러운 손길로 림프 흐름을 원활히 돕는 관리." },
  { t: "출장 프라이빗 힐링 마사지 & 프리미엄 룸", d: "출장 마사지 예약 가이드. 철저한 사생활 보호와 안락함이 보장되는 맞춤 힐링 스파." },
  { t: "출장 수기 전통 마사지 & 근육 이완", d: "출장 마사지 비교 플랫폼. 기계 관리와 차별화된 베테랑 손길로 뻐근함을 풀어냅니다." },
  { t: "출장 올데이 리프레쉬 마사지 & 피로 해소", d: "출장 마사지 상시 상담. 밤낮 상관없이 편리하게 활력을 채울 수 있는 웰니스 코스." },
  { t: "출장 실키 스웨디시 마사지 & 림프 테라피", d: "출장 마사지 인기 코스. 부드럽고 매끄러운 오일링으로 굳은 전신을 녹여주는 케어." },
  { t: "출장 클린 힐링 마사지 & 프레시 케어", d: "출장 마사지 투명 정찰제. 깨끗한 시설과 정직한 요금 체계로 재방문율이 높은 매장." },
  { t: "출장 퍼펙트 바디 마사지 & 토탈 힐링", d: "출장 마사지 전문 네트워크. 머리부터 발끝까지 꼼꼼하게 피로를 케어해주는 종합 코스." },
  { t: "출장 감성 아로마 마사지 & 딥 슬립", d: "출장 마사지 추천 리스트. 편안한 수면과 극상의 안식을 돕는 은은한 아로마 릴렉싱." },
  { t: "출장 얼티밋 스웨디시 마사지 & 웰빙", d: "출장 마사지 종합 안내. 지친 몸과 마음에 진정한 활력을 선사하는 고품격 테라피." }
];

// 40개 패턴을 텍스트 해시 기반으로 일정하고 균등하게 순환시키는 헬퍼 함수
export function getSeoPattern(seedText: string) {
  let hash = 0;
  for (let i = 0; i < seedText.length; i++) {
    hash = seedText.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % SEO_PATTERNS.length;
  return SEO_PATTERNS[index];
}

function getCityContent(cityName: string, patternDesc: string) {
  let hash = 0;
  for (let i = 0; i < cityName.length; i++) {
    hash = cityName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const absHash = Math.abs(hash);

  const bodies = [
    `${cityName} 전 지역을 아우르는 검증된 출장 마사지 및 프리미엄 테라피 네트워크입니다. ${patternDesc} 바쁜 일상과 스트레스로 지친 분들을 위해 ${cityName} 주요 번화가, 역세권, 호텔/오피스텔 등 고객님이 계신 곳 어디든 신속하게 방문 가능한 제휴 네트워크를 한눈에 비교하실 수 있습니다. 철저한 매장 위생 점검과 투명한 정찰제 운영으로 최상의 만족도를 선사합니다.`,
    `${cityName} 대표 힐링 테라피 포털 ${BRAND_NAME}에 오신 것을 환영합니다. 하루 일과 후 쌓인 피로를 계신 곳에서 편안하게 풀고 싶을 때, ${cityName} 최고 수준의 출장 스웨디시, S슬림 림프, 아로마 마사지를 경험해 보세요. 숙련된 전문 관리사들의 정성 어린 1:1 맞춤 케어로 몸과 마음을 가볍게 회복하실 수 있습니다.`,
    `${cityName} 중심 상권부터 외곽 주거지까지 30분 내 신속 방문을 지원하는 출장 마사지 가이드입니다. ${patternDesc} 쾌적한 힐링 코스, 정확한 도착 시간, 실시간 코스별 정찰 요금을 투명하게 안내하여 언제나 안심하고 이용하실 수 있습니다.`
  ];

  const faqsList = [
    [
      { q: `${cityName} 출장 마사지 예약 후 방문까지 얼마나 걸리나요?`, a: `평균적으로 예약 확인 후 30분~40분 내외로 도착합니다. 다만 주말이나 심야 피크 시간대에는 사전 예약을 추천합니다.` },
      { q: `결제 방식과 요금 정책은 어떻게 되나요?`, a: `모든 서비스는 투명한 정찰제 요금으로 운영되며, 현장 결제(현금/계좌이체 등)로 안전하게 이용하실 수 있습니다.` }
    ],
    [
      { q: `${cityName} 심야 시간이나 새벽에도 출장 이용이 가능한가요?`, a: `네, 직장인과 교대 근무 고객님들을 위해 늦은 심야나 24시간 연중무휴로 운영되어 언제든 편리하게 예약하실 수 있습니다.` },
      { q: `호텔이나 원룸, 오피스텔에서도 가능한가요?`, a: `네, ${cityName} 내 가정집, 아파트, 오피스텔은 물론 비즈니스 호텔 및 모텔 등 프라이빗한 공간이라면 어디서든 편안하게 관리받으실 수 있습니다.` }
    ]
  ];

  return {
    body: bodies[absHash % bodies.length],
    faqs: faqsList[absHash % faqsList.length]
  };
}

export async function generateStaticParams() {
  return Object.keys(CITIES_DATA).map((city) => ({
    city: city,
  }));
}

export const dynamicParams = true;

type Props = {
  params: Promise<{ city: string }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const city = params.city;
  const cityInfo = CITIES_DATA[city];

  if (!cityInfo) return {};

  const pattern = getSeoPattern(`${cityInfo.name}_city_seo_v4`);
  
  // 1. 타이틀: [도시명] 출장 마사지 [수식어] | [브랜드명]
  const title = `${cityInfo.name} 출장 마사지 - ${pattern.t} | ${BRAND_NAME}`;
  
  // 2. 메타디스크립션: 도시명 바로 뒤 출장 마사지 결합
  const description = `${cityInfo.name} 출장 마사지 전문 1위 안내. ${pattern.d} 24시간 실시간 예약 및 신속 방문.`;
  const url = `${DOMAIN}/${city}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND_NAME,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function CityPage(props: Props) {
  const params = await props.params;
  const city = params.city;
  const cityInfo = CITIES_DATA[city];

  if (!cityInfo) {
    console.log("🚨 [CityPage 404] 찾을 수 없는 city 파라미터:", city);
    return notFound();
  }

  const pattern = getSeoPattern(`${cityInfo.name}_city_seo_v4`);
  const cityContent = getCityContent(cityInfo.name, `${cityInfo.name} ${pattern.d}`);

  return (
    <div className="bg-[#0b0914] text-white font-sans min-h-screen relative overflow-x-hidden pb-32">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-40 bg-[#0b0914]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
              <span className="w-2.5 h-6 bg-[#00ff88] rounded-full inline-block"></span>
              {BRAND_NAME}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              전체 지역
            </Link>
            <a
              href={`tel:${cityInfo.phone}`}
              className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black bg-[#00ff88] hover:scale-105 transition-transform"
            >
              📞 {cityInfo.name} 출장 예약
            </a>
          </div>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[960px] mx-auto text-center">
        {/* 지역 뱃지 및 타이틀 */}
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border border-[#00ff88]/40 bg-[#00ff88]/10 text-[#00ff88]">
          {cityInfo.name.toUpperCase()} MASSAGE & THERAPY DIRECTORY
        </span>
        <h1 className="text-3xl sm:text-5xl font-black mb-6 break-keep">
          {cityInfo.name} 출장 마사지 · {pattern.t}
        </h1>

        {/* 메인 소개 본문 */}
        <div className="text-[#d8d2ea] text-base sm:text-lg mb-12 max-w-[800px] mx-auto leading-relaxed text-justify break-keep">
          <p>{cityContent.body}</p>
        </div>

        {/* 지역 자주 묻는 질문 */}
        <section className="text-left bg-[#141024] p-6 sm:p-8 rounded-3xl border border-white/10 mb-12 max-w-[850px] mx-auto">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-[#00ff88]">✓</span> {cityInfo.name} 출장 마사지 FAQ
          </h3>
          <div className="space-y-4">
            {cityContent.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="font-bold mb-1.5 text-base text-[#00ff88]">Q. {faq.q}</p>
                <p className="text-sm text-gray-300 leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 구 / 세부 지역 목록: "[동] 출장 마사지 [구] 대전" 형태 반영 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-5 text-left text-gray-200 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#00ff88] rounded-full"></span>
            📍 {cityInfo.name} 구·동별 출장 마사지 안내
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            {cityInfo.districts.map((district) => {
              const districtPattern = getSeoPattern(`${cityInfo.name}_${district.name}_district_seo`);
              return (
                <div key={district.slug} className="p-5 rounded-2xl bg-[#141024] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      {/* 구 타이틀: [구이름] 출장 마사지 [도시명] */}
                      <h3 className="text-lg font-bold text-white">
                        {district.name} 출장 마사지 ({cityInfo.name})
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                        {district.name} {districtPattern.d}
                      </p>
                    </div>
                    <Link
                      href={`/${city}/${district.slug}`}
                      className="text-xs font-bold text-[#00ff88] shrink-0 ml-2 hover:underline"
                    >
                      상세보기 →
                    </Link>
                  </div>
                  
                  {/* 동 그리드 버튼: [동이름] 출장 마사지 */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                    {district.dongs.map((dong) => {
                      // 요구하신 핵심 형식: [동] 출장 마사지 [구] [시]
                      const dongTitleText = `${dong.name} 출장 마사지 ${district.name} ${cityInfo.name}`;
                      
                      return (
                        <Link
                          key={dong.slug}
                          href={`/${city}/${district.slug}/${dong.slug}`}
                          className="py-2.5 px-2 text-center rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 font-semibold truncate hover:text-[#00ff88] hover:border-[#00ff88] transition-all"
                          title={dongTitleText}
                        >
                          {dong.name} 출장 마사지
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* 모바일 하단 플로팅 예약 바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[480px] bg-[#0b0914]/95 backdrop-blur-xl border border-white/20 p-2.5 rounded-2xl shadow-2xl z-50">
        <a
          href={`tel:${cityInfo.phone}`}
          className="py-3 rounded-xl font-black text-black bg-[#00ff88] text-sm flex justify-center gap-1 active:scale-95 transition-transform"
        >
          📞 {cityInfo.name} 출장 마사지 실시간 예약
        </a>
      </div>
    </div>
  );
}