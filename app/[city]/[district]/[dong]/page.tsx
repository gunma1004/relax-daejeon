import Link from "next/link";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";
import { notFound } from "next/navigation";

// 40개의 순환형 SEO 패턴 (타이틀: '출장 [수식어] 마사지' 분리 / 디스크립션: 동 이름 뒤 '출장 마사지' 필수 결합)
export const DONG_SEO_PATTERNS = [
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
  { t: "출장 얼티밋 스웨디시 마사지 & 웰빙", d: "출장 마사지 종합 안내. 지친 몸과 마음에 진정한 활력을 선사하는 고품격 테라피." }
];

export function getDongSeoPattern(seedText: string) {
  let hash = 0;
  for (let i = 0; i < seedText.length; i++) {
    hash = seedText.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % DONG_SEO_PATTERNS.length;
  return DONG_SEO_PATTERNS[index];
}

export async function generateStaticParams() {
  const paths: { city: string; district: string; dong: string }[] = [];

  Object.entries(CITIES_DATA).forEach(([citySlug, city]) => {
    city.districts.forEach((district) => {
      district.dongs.forEach((dong) => {
        paths.push({
          city: citySlug,
          district: district.slug,
          dong: dong.slug,
        });
      });
    });
  });

  return paths;
}

export const dynamicParams = false;

// 1. 메타데이터 생성: 타이틀 및 메타디스크립션 규칙 적용
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; district: string; dong: string }>;
}) {
  const { city, district, dong } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);
  const dongInfo = districtInfo?.dongs.find((d) => d.slug === dong);

  if (!cityInfo || !districtInfo || !dongInfo) return {};

  const pattern = getDongSeoPattern(`${cityInfo.name}_${districtInfo.name}_${dongInfo.name}_dong_seo_v5`);

  // [규칙 1] 타이틀: '출장 [수식어] 마사지' 분리 구조
  const title = `${dongInfo.name} ${pattern.t} | ${BRAND_NAME} ${cityInfo.name}`;

  // [규칙 2] 메타디스크립션: 동 이름 바로 뒤에 '출장 마사지' 필수 결합
  const description = `${dongInfo.name} ${pattern.d}`;

  const url = `${DOMAIN}/${city}/${district}/${dong}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${BRAND_NAME} ${dongInfo.name}`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DongPage({
  params,
}: {
  params: Promise<{ city: string; district: string; dong: string }>;
}) {
  const { city, district, dong } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);
  const dongInfo = districtInfo?.dongs.find((d) => d.slug === dong);

  if (!cityInfo || !districtInfo || !dongInfo) return notFound();

  const isDaejeon = city === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";
  const areaFullName = `${cityInfo.name} ${districtInfo.name} ${dongInfo.name}`;
  
  // 동 단위 패턴 가져오기
  const pattern = getDongSeoPattern(`${cityInfo.name}_${districtInfo.name}_${dongInfo.name}_dong_seo_v5`);

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      {/* 상단 GNB */}
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
              <span
                className="w-2.5 h-6 rounded-full inline-block"
                style={{ backgroundColor: mainColor }}
              ></span>
              {BRAND_NAME}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/${city}/${district}`}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              {districtInfo.name} 전체
            </Link>
            <a
              href={`tel:${cityInfo.phone}`}
              className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black transition-transform hover:scale-105"
              style={{ backgroundColor: mainColor }}
            >
              📞 {dongInfo.name} 예약 문의
            </a>
          </div>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[900px] mx-auto text-center">
        {/* 상단 뱃지 */}
        <span
          className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border"
          style={{
            color: mainColor,
            borderColor: `${mainColor}40`,
            backgroundColor: `${mainColor}15`,
          }}
        >
          {areaFullName.toUpperCase()} 24H CARE
        </span>

        {/* H1: 패턴 기반 제목 매핑 ('출장 [수식어] 마사지') */}
        <h1 className="text-3xl sm:text-5xl font-black mb-6 break-keep">
          {dongInfo.name} {pattern.t}
        </h1>

        {/* 검색 봇이 읽는 동 단위 고유 본문 */}
        <div className="text-[#e1d9f5] text-base sm:text-lg mb-10 max-w-[700px] mx-auto leading-relaxed text-justify break-keep">
          <p>{dongInfo.contentBody}</p>
        </div>

        {/* 케어 코스 안내 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-12">
          <div className="p-5 rounded-2xl bg-[#140f24] border border-white/10 space-y-2">
            <span className="text-xs font-bold text-gray-400">PROGRAM 01</span>
            <h3 className="font-extrabold text-white text-base">출장 타이 마사지</h3>
            <p className="text-xs text-gray-300">뭉친 근육을 부드럽게 풀어주는 스트레칭 중심 수기 케어</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#140f24] border border-white/10 space-y-2">
            <span className="text-xs font-bold text-gray-400">PROGRAM 02</span>
            <h3 className="font-extrabold text-white text-base">출장 아로마 마사지</h3>
            <p className="text-xs text-gray-300">천연 에센셜 오일로 누리는 심신 안정 및 피로 회복</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#140f24] border border-white/10 space-y-2">
            <span className="text-xs font-bold text-gray-400">PROGRAM 03</span>
            <h3 className="font-extrabold text-white text-base">출장 스웨디시 마사지</h3>
            <p className="text-xs text-gray-300">부드러운 터치와 림프 순환을 돕는 프리미엄 감성 케어</p>
          </div>
        </div>

        {/* 고유 FAQ 섹션 (유사문서 회피) */}
        {dongInfo.faqs && dongInfo.faqs.length > 0 && (
          <section className="text-left bg-[#140f24] p-6 sm:p-8 rounded-3xl border border-white/10 mb-12">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">💡</span> {dongInfo.name} 자주 묻는 질문
            </h3>
            <div className="space-y-5">
              {dongInfo.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white/5 p-5 rounded-2xl border border-white/5">
                  <p className="font-bold mb-2 text-lg" style={{ color: mainColor }}>
                    Q. {faq.question}
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">A. {faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 인근 다른 동 링크 */}
        <section className="text-left bg-[#140f24] p-6 rounded-3xl border border-white/10">
          <h3 className="text-base font-bold text-white mb-3">
            📍 {districtInfo.name} 인근 다른 지역 안내
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {districtInfo.dongs
              .filter((d) => d.slug !== dong)
              .map((otherDong) => {
                const otherPattern = getDongSeoPattern(`${cityInfo.name}_${districtInfo.name}_${otherDong.name}_dong_seo_v5`);
                return (
                  <Link
                    key={otherDong.slug}
                    href={`/${city}/${district}/${otherDong.slug}`}
                    className="py-2.5 px-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 font-bold hover:bg-white/20 transition-all truncate text-center"
                    title={`${otherDong.name} ${otherPattern.t}`}
                  >
                    {otherDong.name}
                  </Link>
                );
              })}
          </div>
        </section>
      </main>

      {/* 모바일 하단 플로팅 예약 바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a
          href={`tel:${cityInfo.phone}`}
          className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all shadow-lg"
          style={{ backgroundColor: mainColor }}
        >
          📞 {dongInfo.name} {pattern.t.split("&")[0].trim()} 문의 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}