import Link from "next/link";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";
import { notFound } from "next/navigation";

// 50개 순환형 SEO 패턴
// 규칙 1: 타이틀은 '출장 [수식어] 마사지'로 분리 구조 유지
// 규칙 2: 디스크립션은 지역명 뒤에 '출장 마사지' 필수 결합
export const SEO_PATTERNS = [
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
  { t: "출장 쾌적 힐링 마사지 & 안심 테라피", d: "출장 마사지 공식 등록처. 언제나 쾌적하고 안전하게 믿고 찾는 중부권 대표 테라피." },
  { t: "출장 젠틀 아로마 마사지 & 순환 케어", d: "출장 마사지 상세 코스 확인. 자극 없이 부드러운 손길로 림프 흐름을 원활히 돕는 관리." },
  { t: "출장 프라이빗 힐링 마사지 & 프리미엄 룸", d: "출장 마사지 예약 가이드. 철저한 사생활 보호와 안락함이 보장되는 맞춤 힐링 스파." },
  { t: "출장 수기 전통 마사지 & 근육 이완", d: "출장 마사지 비교 플랫폼. 기계 관리와 차별화된 베테랑 손길로 뻐근함을 풀어냅니다." },
  { t: "출장 올데이 리프레쉬 마사지 & 피로 해소", d: "출장 마사지 상시 상담. 밤낮 상관없이 편리하게 활력을 채울 수 있는 웰니스 코스." },
  { t: "출장 실키 스웨디시 마사지 & 림프 테라피", d: "출장 마사지 인기 코스. 부드럽고 매끄러운 오일링으로 굳은 전신을 녹여주는 케어." },
  { t: "출장 클린 힐링 마사지 & 프레시 케어", d: "출장 마사지 투명 정찰제. 깨끗한 시설과 정직한 요금 체계로 재방문율이 높은 매장." },
  { t: "출장 퍼펙트 바디 마사지 & 토탈 힐링", d: "출장 마사지 전문 네트워크. 머리부터 발끝까지 꼼꼼하게 피로를 케어해주는 종합 코스." },
  { t: "출장 감성 아로마 마사지 & 딥 슬립", d: "출장 마사지 추천 리스트. 편안한 수면과 극상의 안식을 돕는 은은한 아로마 릴렉싱." },
  { t: "출장 얼티밋 스웨디시 마사지 & 웰빙", d: "출장 마사지 종합 안내. 지친 몸과 마음에 진정한 활력을 선사하는 고품격 테라피." },
  { t: "출장 슬로우 릴렉스 마사지 & 바디 쉼터", d: "출장 마사지 안심 가이드. 여유롭고 섬세한 터치로 전신의 뭉친 피로를 풀어냅니다." },
  { t: "출장 에너제틱 케어 마사지 & 활력 부스팅", d: "출장 마사지 코스 안내. 활력과 생기를 되찾아주는 역동적인 컨디셔닝 프로그램." },
  { t: "출장 콤팩트 전신 마사지 & 집중 순환", d: "출장 마사지 맞춤 큐레이션. 짧은 시간에도 완벽한 피로 해소를 돕는 알짜배기 코스." },
  { t: "출장 젠틀 터치 마사지 & 감성 릴렉스", d: "출장 마사지 힐링 추천. 저자극 수기 기법으로 민감한 심신을 차분하게 달래주는 관리." },
  { t: "출장 프리미엄 바디 마사지 & 에스테틱", d: "출장 마사지 에스테틱 제휴. 바디 케어와 스킨 릴렉싱을 한 번에 누리는 패키지." },
  { t: "출장 딥 클린징 마사지 & 스파 테라피", d: "출장 마사지 청결 우선 매장. 위생적인 환경에서 즐기는 상쾌한 바디 케어." },
  { t: "출장 스위트 아로마 마사지 & 향기 케어", d: "출장 마사지 향기 힐링. 달콤하고 은은한 천연 아로마 향이 전하는 깊은 이완." },
  { t: "출장 유러피언 힐링 마사지 & 림프 순환", d: "출장 마사지 감성 안내. 유럽 정통 테크닉을 접목한 수준 높은 바디 케어." },
  { t: "출장 밸런싱 바디 마사지 & 리셋 테라피", d: "출장 마사지 빠른 피로 리셋. 틀어진 전신 균형과 무거운 어깨를 가볍게 풀어줍니다." },
  { t: "출장 토탈 웰니스 마사지 & 힐링 포털", d: "출장 마사지 공인 네트워크. 최고의 만족도를 약속하는 엄선된 힐링 매장 안내." }
];

export function getSeoPattern(seedText: string) {
  let hash = 0;
  for (let i = 0; i < seedText.length; i++) {
    hash = seedText.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % SEO_PATTERNS.length;
  return SEO_PATTERNS[index];
}

// 1. 구 단위 정적 경로 등록
export async function generateStaticParams() {
  const paths: { city: string; district: string }[] = [];

  Object.entries(CITIES_DATA).forEach(([citySlug, city]) => {
    city.districts.forEach((district) => {
      paths.push({
        city: citySlug,
        district: district.slug,
      });
    });
  });

  return paths;
}

export const dynamicParams = true;

// 2. 구 단위 SEO 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; district: string }> | { city: string; district: string };
}) {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;

  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);

  if (!cityInfo || !districtInfo) return {};

  const areaFullName = `${cityInfo.name} ${districtInfo.name}`;
  const pattern = getSeoPattern(`${areaFullName}_district_seo_v5`);

  // 타이틀: '출장 [키워드] 마사지' 분리 구조
  const title = `${areaFullName} ${pattern.t} | ${BRAND_NAME}`;
  
  // 메타디스크립션: 지역명 뒤에 '출장 마사지' 필수 배치
  const description = `${areaFullName} ${pattern.d}`;
  const url = `${DOMAIN}/${city}/${district}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${BRAND_NAME} ${areaFullName}`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

// 구(District) 전용 고유 본문 및 FAQ 생성 헬퍼
function getDistrictContent(cityName: string, districtName: string, patternDesc: string) {
  const areaFullName = `${cityName} ${districtName}`;
  let hash = 0;
  for (let i = 0; i < districtName.length; i++) {
    hash = districtName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const absHash = Math.abs(hash);

  const bodies = [
    `${areaFullName} 전 지역을 아우르는 프리미엄 테라피 및 출장 케어 서비스망입니다. ${patternDesc} 바쁜 일상과 과도한 스트레스에 지친 분들을 위해 ${districtName} 전역 어디서나 빠르게 맞춤 힐링을 누리실 수 있도록 연결해 드립니다. 체계적인 위생 관리와 내상 없는 정찰제 시스템으로 최상의 릴렉스를 선사합니다.`,
    `${areaFullName}에서 믿고 선택할 수 있는 안심 힐링 테라피 가이드입니다. 퇴근 후 자택이나 머무시는 숙소에서 편안하게 ${districtName} 최고 수준의 관리를 경험해 보세요. 숙련된 전문 테라피스트들의 정성 어린 손길로 굳어있던 심신을 부드럽게 이완시켜 드립니다.`,
    `핵심 상권과 아늑한 주거지가 공존하는 ${areaFullName} 맞춤형 스웨디시 & 테라피 안내 센터입니다. ${patternDesc} ${districtName} 주요 역세권부터 주거 단지까지 촘촘한 제휴 네트워크를 바탕으로 신속하고 편리한 안내를 약속드립니다. 투명한 정찰 요금제와 친절한 고객 응대로 기분 좋은 휴식을 완성해 드립니다.`
  ];

  const faqsList = [
    [
      { q: `${districtName} 전 지역 방문 및 이용이 가능한가요?`, a: `네, ${districtName} 내 주요 번화가와 역세권은 물론 외곽 주거 단지 및 숙소까지 폭넓은 제휴망을 통해 신속하게 안내해 드리고 있습니다.` },
      { q: `결제 방식과 요금 체계는 어떻게 되나요?`, a: `선입금 사기 피해가 전혀 없도록 100% 현장 후불제(현금, 계좌이체 등 매장별 기준) 및 정찰제 요금으로 투명하고 안전하게 운영됩니다.` }
    ],
    [
      { q: `${districtName} 테라피스트의 관리 수준은 어떤가요?`, a: `체계적인 마사지 교육 과정을 이수하고 풍부한 실무 경험을 갖춘 전문 테라피스트들이 고객님의 바디 컨디션에 맞춘 섬세한 케어를 제공합니다.` },
      { q: `심야나 새벽 시간에도 이용할 수 있나요?`, a: `고객님들의 다양한 생활 패턴에 맞춰 늦은 심야나 24시간 연중무휴로 운영되는 제휴 매장들이 다수 준비되어 있어 언제든 편리하게 이용하실 수 있습니다.` }
    ]
  ];

  return {
    body: bodies[absHash % bodies.length],
    faqs: faqsList[absHash % faqsList.length]
  };
}

// 3. 구 페이지 본문 컴포넌트
export default async function DistrictPage({
  params,
}: {
  params: Promise<{ city: string; district: string }> | { city: string; district: string };
}) {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;

  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);

  if (!cityInfo || !districtInfo) return notFound();

  const areaFullName = `${cityInfo.name} ${districtInfo.name}`;
  const pattern = getSeoPattern(`${areaFullName}_district_seo_v5`);
  
  // 구 단위 고유 텍스트 및 FAQ 가져오기 (패턴 디스크립션 결합)
  const districtContent = getDistrictContent(cityInfo.name, districtInfo.name, `${areaFullName} ${pattern.d}`);

  return (
    <div className="bg-[#0b0914] text-white font-sans min-h-screen relative overflow-x-hidden pb-32">
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
            <Link
              href={`/${city}`}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              {cityInfo.name} 시 전체
            </Link>
            <a
              href={`tel:${cityInfo.phone}`}
              className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black bg-[#00ff88] transition-transform hover:scale-105"
            >
              📞 {districtInfo.name} 예약 문의
            </a>
          </div>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[960px] mx-auto text-center">
        {/* 상단 뱃지 */}
        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border border-[#00ff88]/40 bg-[#00ff88]/10 text-[#00ff88]">
          {areaFullName.toUpperCase()} HEALING & BODY CARE
        </span>

        {/* H1: 패턴 기반 타이틀 매핑 */}
        <h1 className="text-3xl sm:text-5xl font-black mb-6 break-keep">
          {areaFullName} {pattern.t}
        </h1>

        {/* 네이버/구글 크롤러가 읽는 구 단위 고유 본문 */}
        <div className="text-[#d8d2ea] text-base sm:text-lg mb-12 max-w-[750px] mx-auto leading-relaxed text-justify break-keep">
          <p>{districtContent.body}</p>
        </div>

        {/* 구 단위 고유 FAQ */}
        <section className="text-left bg-[#141024] p-6 sm:p-8 rounded-3xl border border-white/10 mb-12 max-w-[800px] mx-auto">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-[#00ff88]">✓</span> {districtInfo.name} 자주 묻는 질문
          </h3>
          <div className="space-y-4">
            {districtContent.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="font-bold mb-1.5 text-base text-[#00ff88]">Q. {faq.q}</p>
                <p className="text-sm text-gray-300 leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 동별 매장 및 테라피 목록 */}
        <section className="mb-12 text-left">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-200 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#00ff88] rounded-full"></span>
              📍 {districtInfo.name} 동별 맞춤 서비스 선택
            </h2>
            <Link
              href={`/${city}`}
              className="text-xs text-gray-400 hover:text-white underline"
            >
              ← {cityInfo.name} 시 전체보기
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {districtInfo.dongs.map((dong) => {
              const dongHeading = dong.contentHeading || `${dong.name} ${pattern.t}`;
              const dongDesc = dong.seoDesc || `${dong.name} 출장 마사지 추천. 전문 테라피스트의 프라이빗 힐링 케어.`;
              
              return (
                <Link
                  key={dong.slug}
                  href={`/${city}/${district}/${dong.slug}`}
                  className="p-5 rounded-2xl bg-[#141024] border border-white/10 hover:border-[#00ff88]/50 transition-all block group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-white text-base group-hover:text-[#00ff88] transition-colors truncate">
                      {dongHeading}
                    </span>
                    <span className="text-xs text-gray-400 group-hover:text-white font-bold whitespace-nowrap ml-2">
                      바로가기 →
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {dongDesc}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      {/* 모바일 하단 플로팅 예약 바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[480px] bg-[#0b0914]/95 backdrop-blur-xl border border-white/20 p-2.5 rounded-2xl shadow-2xl z-50">
        <a
          href={`tel:${cityInfo.phone}`}
          className="py-3 rounded-xl font-black text-black bg-[#00ff88] text-sm flex items-center justify-center gap-1 active:scale-95 transition-all shadow-lg"
        >
          📞 {districtInfo.name} 빠른 예약 연결 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}