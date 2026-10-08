export interface FaqData {
  question: string;
  answer: string;
}

export interface DongData {
  slug: string;
  name: string;
  seoTitle?: string;
  seoDesc?: string;
  contentHeading?: string;
  contentBody?: string;
  faqs?: FaqData[];
}

export interface DistrictData {
  slug: string;
  name: string;
  dongs: DongData[];
}

export interface CityData {
  slug: string;
  name: string;
  phone: string;
  title: string;
  districts: DistrictData[];
}

export const DOMAIN = "https://relax-daejeon.netlify.app";
export const BRAND_NAME = "릴렉스대전S슬림";

export const KEYWORD_MODIFIERS = [
  { prefix: "S슬림 림프 케어", sub: "전신 순환 및 부종 완화 테라피" },
  { prefix: "프리미엄 스웨디시", sub: "부드럽고 감성적인 밀착 림프 순환 케어" },
  { prefix: "프라이빗 1인샵", sub: "1:1 맞춤형 힐링 집중 바디 테라피" },
  { prefix: "아로마 바디테라피", sub: "천연 에센셜 오일과 감성 이완 테라피" },
  { prefix: "클래식 건식·타이", sub: "지친 일상 속 뭉친 근육 집중 이완" },
  { prefix: "로열 에스테틱", sub: "페이스 & 전신 밸런스 토탈 케어" },
];

export function getKeywordModifier(seedText: string) {
  let hash = 0;
  for (let i = 0; i < seedText.length; i++) {
    hash = seedText.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % KEYWORD_MODIFIERS.length;
  return KEYWORD_MODIFIERS[index];
}

export function generateDongSEO(
  cityName: string,
  districtName: string,
  dongName: string,
  slug: string
): DongData {
  const modifier = getKeywordModifier(dongName);

  let hash = 0;
  for (let i = 0; i < dongName.length; i++) {
    hash = dongName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const absHash = Math.abs(hash);

  const bodies = [
    `${dongName} 출장 마사지를 찾고 계신가요? ${cityName} ${districtName} ${dongName} 전지역 어디서나 쾌적하게 힐링을 누리실 수 있도록, ${BRAND_NAME}에서 검증된 ${modifier.prefix} 전문 테라피를 안내합니다. 숙소, 자택, 프라이빗 룸 어디든 신속하고 편안한 ${modifier.sub}를 경험해 보세요.`,
    `${districtName} ${dongName} 중심 및 인근 전지역 1:1 맞춤 출장 케어 서비스. 섬세한 압 조절과 ${modifier.sub} 코스로 만족도가 높으며, 철저한 청결 관리와 투명한 정찰제 요금으로 안심하고 이용하실 수 있습니다. 오늘 하루의 묵은 피로를 편안하게 해소해 보세요.`,
    `${cityName} ${districtName} ${dongName} 일대의 신속 방문 ${modifier.prefix} 안내. 프라이빗한 휴식이 필요한 순간, 계신 곳에서 가장 빠르게 연결되는 맞춤 테라피로 ${modifier.sub}의 힐링을 선사합니다. 실시간 코스 및 비용을 지금 확인해 보세요.`
  ];
 
  const faqsList = [
    [
      {
        question: `${dongName} 마사지·1인샵 매장은 전용 주차가 가능한가요?`,
        answer: `네, ${dongName} 내 대다수 제휴 매장은 건물 내 무료 주차장 지원 또는 인근 공영주차장 주차권을 제공하여 자차 방문이 매우 편리합니다.`
      },
      {
        question: `당일 예약 및 방문도 바로 가능한가요?`,
        answer: `가능합니다. 다만 프라이빗한 ${modifier.prefix} 관리와 원활한 입실을 위해 방문 전 전화로 실시간 예약 현황을 확인하시는 것을 추천합니다.`
      }
    ],
    [
      {
        question: `늦은 야간이나 심야 시간대에도 이용할 수 있나요?`,
        answer: `${dongName} 주요 테라피 샵들은 야간 직장인 및 늦은 시간 방문 고객을 위해 심야 영업 또는 24시간 맞춤 운영 매장을 운영하고 있습니다.`
      },
      {
        question: `S슬림 케어는 어떤 프로그램인가요?`,
        answer: `전신 림프절을 부드럽게 자극하여 혈액 순환을 돕고 노폐물 배출과 바디 밸런스 회복에 도움을 주는 ${BRAND_NAME}의 시그니처 힐링 프로그램입니다.`
      }
    ],
    [
      {
        question: `처음 방문하는데 어떤 코스를 선택해야 하나요?`,
        answer: `처음이시라면 부담 없는 압으로 뭉친 근육을 풀어주는 ${modifier.prefix} 기본 코스나 천연 오일을 활용한 ${modifier.sub} 코스를 추천합니다.`
      },
      {
        question: `프라이빗 1인실 및 샤워 시설이 완비되어 있나요?`,
        answer: `네, ${dongName} 제휴 매장 전 룸에는 개별 프라이빗 공간과 호텔식 샤워 부스, 고급 어메니티가 완비되어 있어 쾌적하게 이용하실 수 있습니다.`
      }
    ]
  ];

  return {
    slug,
    name: dongName,
    seoTitle: `${cityName} ${districtName} ${dongName} 마사지·스웨디시 - ${modifier.prefix} | ${BRAND_NAME}`,
    seoDesc: `${cityName} ${districtName} ${dongName} 추천 마사지, 스웨디시, 1인샵, 에스테틱 안내. ${modifier.sub} 전문 테라피 매장 가격, 주차 및 실시간 코스 정보.`,
    contentHeading: `${dongName} 프리미엄 ${modifier.prefix} 전문 테라피`,
    contentBody: bodies[absHash % bodies.length],
    faqs: faqsList[absHash % faqsList.length]
  };
}

const makeDongs = (city: string, district: string, dongs: { slug: string; name: string }[]) => {
  return dongs.map((d) => generateDongSEO(city, district, d.name, d.slug));
};

export const CITIES_DATA: Record<string, CityData> = {
  daejeon: {
    slug: "daejeon",
    name: "대전",
    phone: "0507-1280-3335",
    title: "대전 마사지 & S슬림 프리미엄 테라피",
    districts: [
      {
        slug: "yuseong",
        name: "유성구",
        dongs: makeDongs("대전", "유성구", [
          { slug: "bongmyeong", name: "봉명동" },
          { slug: "guam", name: "구암동" },
          { slug: "gundong", name: "궁동" },
          { slug: "jangdae", name: "장대동" },
          { slug: "sinsung", name: "신성동" },
          { slug: "jeonmin", name: "전민동" },
          { slug: "gwanpyeong", name: "관평동" },
          { slug: "wonsinheung", name: "원신흥동" },
          { slug: "jijok", name: "지족동" },
          { slug: "banseok", name: "반석동" },
          { slug: "yongsan", name: "용산동" },
          { slug: "duckmyeong", name: "덕명동" }
        ])
      },
      {
        slug: "seo",
        name: "서구",
        dongs: makeDongs("대전", "서구", [
          { slug: "dunsan", name: "둔산동" },
          { slug: "wolpyeong", name: "월평동" },
          { slug: "galma", name: "갈마동" },
          { slug: "tanbang", name: "탄방동" },
          { slug: "gwejeong", name: "괴정동" },
          { slug: "yongmun", name: "용문동" },
          { slug: "gwanjeo", name: "관저동" },
          { slug: "doan", name: "도안동" },
          { slug: "gasuwon", name: "가수원동" },
          { slug: "mannyeon", name: "만년동" },
          { slug: "byeon", name: "변동" },
          { slug: "nae", name: "내동" }
        ])
      },
      {
        slug: "junggu",
        name: "중구",
        dongs: makeDongs("대전", "중구", [
          { slug: "eunhaeng", name: "은행동" },
          { slug: "daeheung", name: "대흥동" },
          { slug: "seonhwa", name: "선화동" },
          { slug: "oryu", name: "오류동" },
          { slug: "taepyeong", name: "태평동" },
          { slug: "yuchoen", name: "유천동" },
          { slug: "munhwa", name: "문화동" },
          { slug: "sanseong", name: "산성동" },
          { slug: "yongdu", name: "용두동" }
        ])
      },
      {
        slug: "donggu",
        name: "동구",
        dongs: makeDongs("대전", "동구", [
          { slug: "yongjeon", name: "용전동" },
          { slug: "gaya", name: "가양동" },
          { slug: "jayang", name: "자양동" },
          { slug: "hongdo", name: "홍도동" },
          { slug: "panam", name: "판암동" },
          { slug: "seongnam", name: "성남동" },
          { slug: "dae-dong", name: "대동" },
          { slug: "samseong", name: "삼성동" }
        ])
      },
      {
        slug: "daedeok",
        name: "대덕구",
        dongs: makeDongs("대전", "대덕구", [
          { slug: "songchon", name: "송촌동" },
          { slug: "jungni", name: "중리동" },
          { slug: "birae", name: "비래동" },
          { slug: "sintanjin", name: "신탄진동" },
          { slug: "ojeong", name: "오정동" },
          { slug: "seokbong", name: "석봉동" },
          { slug: "daehwa", name: "대화동" }
        ])
      }
    ]
  }
};
