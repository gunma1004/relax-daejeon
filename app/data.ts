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

// 기본 도메인 및 브랜드명
export const DOMAIN = "https://jungbumassage.netlify.app";
export const BRAND_NAME = "중부마사지넷";

export const KEYWORD_MODIFIERS = [
  { prefix: "힐링 타이", sub: "전신 근육 이완 & 스트레칭" },
  { prefix: "아로마 테라피", sub: "천연 에센셜 오일 바디 케어" },
  { prefix: "스웨디시", sub: "부드러운 감성 림프 순환 케어" },
  { prefix: "1인샵 테라피", sub: "프라이빗 맞춤형 힐링 케어" },
  { prefix: "로열 바디케어", sub: "지친 일상 속 집중 피로 회복" },
  { prefix: "건식 & 아로마", sub: "체계적인 전문가 맞춤 관리" },
];

export function getKeywordModifier(seedText: string) {
  let hash = 0;
  for (let i = 0; i < seedText.length; i++) {
    hash = seedText.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % KEYWORD_MODIFIERS.length;
  return KEYWORD_MODIFIERS[index];
}

/** 
 * SEO 및 유사 문서 필터링 회피를 위한 동적 데이터 자동 생성 함수
 */
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
    `${cityName} ${districtName} ${dongName} 인근에서 편안한 휴식을 찾고 계신가요? ${BRAND_NAME}에서는 바쁜 일상 속 누적된 피로를 해소할 수 있도록 ${modifier.sub} 프로그램을 제공하는 우수 샵을 엄선하여 안내합니다. 프라이빗하고 아늑한 룸에서 전문 테라피스트의 ${modifier.prefix} 관리를 직접 경험해 보세요.`,
    `${districtName} ${dongName} 중심 상권에 위치하여 방문과 주차가 편리한 테라피 샵들을 모았습니다. 섬세한 압 조절과 ${modifier.sub} 코스로 고객 만족도가 높으며, 청결한 위생 관리와 정찰제 요금으로 안심하고 이용하실 수 있습니다. 오늘 하루의 피로를 편안하게 내려놓아 보세요.`,
    `${cityName} ${dongName} 일대의 검증된 ${modifier.prefix} 힐링 공간을 소개합니다. 체계적인 고객 응대 시스템과 쾌적한 시설을 갖춘 매장들로, 나만을 위한 ${modifier.sub}를 통해 활력을 충전하기에 최적화되어 있습니다. 지금 바로 실시간 예약 현황과 코스 요금을 확인해 보세요.`
  ];

  const faqsList = [
    [
      {
        question: `${dongName} 마사지 매장은 주차가 가능한가요?`,
        answer: `네, ${dongName} 내 대다수 제휴 샵은 건물 내 전용 주차 공간 또는 인근 공영/유료 주차장 지원을 제공하여 자차 이용이 편리합니다.`
      },
      {
        question: `당일 예약 및 방문도 가능한가요?`,
        answer: `가능합니다. 다만 원활한 ${modifier.prefix} 관리와 대기 시간 단축을 위해 방문 전 전화로 예약 현황을 미리 확인하시는 것을 권장합니다.`
      }
    ],
    [
      {
        question: `야간이나 늦은 심야 시간에도 이용할 수 있나요?`,
        answer: `${dongName} 지역 샵들은 직장인 및 늦은 시간 방문 고객을 위해 심야 영업 또는 24시간 연중무휴로 운영되는 곳이 다수 준비되어 있습니다.`
      },
      {
        question: `수면이 가능한 코스가 준비되어 있나요?`,
        answer: `일정 시간 이상의 ${modifier.sub} 코스를 이용하시거나 심야 시간대 방문 시 프라이빗 룸에서 편안하게 수면이 가능한 매장들이 있습니다.`
      }
    ],
    [
      {
        question: `처음 방문하는데 어떤 코스를 선택해야 하나요?`,
        answer: `처음이시라면 부담 없는 압으로 뭉친 근육을 부드럽게 이완시키는 ${modifier.prefix} 기본 코스나 천연 오일 ${modifier.sub} 코스를 추천해 드립니다.`
      },
      {
        question: `2인실(커플룸) 동반 이용이 가능한가요?`,
        answer: `네, ${dongName} 주요 제휴 샵에는 커플룸과 다인실이 구비되어 있어 연인, 친구, 동료와 함께 동반 관리를 받으실 수 있습니다.`
      }
    ]
  ];

  return {
    slug,
    name: dongName,
    seoTitle: `${cityName} ${districtName} ${dongName} 마사지 추천 - ${modifier.prefix} | ${BRAND_NAME}`,
    seoDesc: `${cityName} ${districtName} ${dongName} 추천 마사지, 스웨디시, 아로마 샵 안내. ${modifier.sub} 전문 테라피 샵 가격, 위치 및 코스 정보 제공.`,
    contentHeading: `${dongName} 프리미엄 ${modifier.prefix} 힐링 케어`,
    contentBody: bodies[absHash % bodies.length],
    faqs: faqsList[absHash % faqsList.length]
  };
}

// 동 목록 생성 헬퍼 함수
const makeDongs = (city: string, district: string, dongs: { slug: string; name: string }[]) => {
  return dongs.map((d) => generateDongSEO(city, district, d.name, d.slug));
};

export const CITIES_DATA: Record<string, CityData> = {
  // 1. 대전광역시 (5개 자치구)
  daejeon: {
    slug: "daejeon",
    name: "대전",
    phone: "0507-1280-3335",
    title: "대전 마사지 & 프리미엄 테라피 안내",
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
          { slug: "banseok", name: "반석동" }
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
          { slug: "mannyeon", name: "만년동" }
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
          { slug: "munhwa", name: "문화동" }
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
          { slug: "panam", name: "판암동" }
        ])
      },
      {
        slug: "daedeok",
        name: "대덕구",
        dongs: makeDongs("대전", "대덕구", [
          { slug: "songchon", name: "송촌동" },
          { slug: "jungni", name: "중리동" },
          { slug: "birae", name: "비래동" },
          { slug: "sintanjin", name: "신탄진동" }
        ])
      }
    ]
  },

  // 2. 청주시 (4개 구)
  cheongju: {
    slug: "cheongju",
    name: "청주",
    phone: "0507-1280-3336",
    title: "청주 마사지 & 스웨디시 정보",
    districts: [
      {
        slug: "heungdeok",
        name: "흥덕구",
        dongs: makeDongs("청주", "흥덕구", [
          { slug: "bokdae", name: "복대동" },
          { slug: "gagyeong", name: "가경동" },
          { slug: "biha", name: "비하동" },
          { slug: "bongmyeong-cj", name: "봉명동" },
          { slug: "songjeol", name: "송절동" },
          { slug: "gangseo", name: "강서동" },
          { slug: "osong", name: "오송읍" }
        ])
      },
      {
        slug: "cheongwon",
        name: "청원구",
        dongs: makeDongs("청주", "청원구", [
          { slug: "yullyang", name: "율량동" },
          { slug: "ochang", name: "오창읍" },
          { slug: "jujung", name: "주중동" },
          { slug: "udam", name: "우암동" },
          { slug: "nae-deok", name: "내덕동" }
        ])
      },
      {
        slug: "sangdang",
        name: "상당구",
        dongs: makeDongs("청주", "상당구", [
          { slug: "yongam", name: "용암동" },
          { slug: "geumcheon", name: "금천동" },
          { slug: "bukmun", name: "북문로" },
          { slug: "seomun", name: "서문동" },
          { slug: "yeongun", name: "영운동" }
        ])
      },
      {
        slug: "seowon",
        name: "서원구",
        dongs: makeDongs("청주", "서원구", [
          { slug: "sanchik", name: "산남동" },
          { slug: "bunpyeong", name: "분평동" },
          { slug: "sachang", name: "사창동" },
          { slug: "gae-sin", name: "개신동" },
          { slug: "sugok", name: "수곡동" }
        ])
      }
    ]
  },

  // 3. 세종특별자치시
  sejong: {
    slug: "sejong",
    name: "세종",
    phone: "0507-1280-3335",
    title: "세종 마사지 & 프리미엄 테라피",
    districts: [
      {
        slug: "central",
        name: "도심권",
        dongs: makeDongs("세종", "도심권", [
          { slug: "naseong", name: "나성동" },
          { slug: "boram", name: "보람동" },
          { slug: "eojin", name: "어진동" },
          { slug: "areum", name: "아름동" },
          { slug: "jongchon", name: "종촌동" },
          { slug: "dodam", name: "도담동" },
          { slug: "dajeong", name: "다정동" },
          { slug: "saerom", name: "새롬동" },
          { slug: "jochiwon", name: "조치원읍" }
        ])
      }
    ]
  },

  // 4. 천안시 (동남구, 서북구)
  cheonan: {
    slug: "cheonan",
    name: "천안",
    phone: "0507-1280-3335",
    title: "천안 마사지 & 스웨디시 포털",
    districts: [
      {
        slug: "seobuk",
        name: "서북구",
        dongs: makeDongs("천안", "서북구", [
          { slug: "buldang", name: "불당동" },
          { slug: "dujeong", name: "두정동" },
          { slug: "seongjeong", name: "성정동" },
          { slug: "ssangyong", name: "쌍용동" },
          { slug: "baekseok", name: "백석동" },
          { slug: "seongseong", name: "성성동" },
          { slug: "cha-am", name: "차암동" }
        ])
      },
      {
        slug: "dongnam",
        name: "동남구",
        dongs: makeDongs("천안", "동남구", [
          { slug: "shinbu", name: "신부동" },
          { slug: "cheongsu", name: "청수동" },
          { slug: "cheongdang", name: "청당동" },
          { slug: "bongmyeong-ca", name: "봉명동" },
          { slug: "wonseong", name: "원성동" }
        ])
      }
    ]
  },

  // 5. 아산시
  asan: {
    slug: "asan",
    name: "아산",
    phone: "0507-1280-3335",
    title: "아산 온천 & 마사지 케어",
    districts: [
      {
        slug: "main",
        name: "아산권",
        dongs: makeDongs("아산", "아산권", [
          { slug: "oncheon", name: "온천동" },
          { slug: "baebang", name: "배방읍" },
          { slug: "tangjeong", name: "탕정면" },
          { slug: "yonghwa", name: "용화동" },
          { slug: "mojong", name: "모종동" },
          { slug: "dungpo", name: "둔포면" }
        ])
      }
    ]
  },

  // 6. 공주시
  gongju: {
    slug: "gongju",
    name: "공주",
    phone: "0507-1280-3335",
    title: "공주 마사지 & 테라피 정보",
    districts: [
      {
        slug: "main",
        name: "공주권",
        dongs: makeDongs("공주", "공주권", [
          { slug: "singwan", name: "신관동" },
          { slug: "geumheung", name: "금흥동" },
          { slug: "sandeong", name: "산성동" },
          { slug: "jungdong", name: "중동" },
          { slug: "okryong", name: "옥룡동" }
        ])
      }
    ]
  },

  // 7. 계룡시
  gyeryong: {
    slug: "gyeryong",
    name: "계룡",
    phone: "0507-1280-3335",
    title: "계룡 힐링 마사지 & 바디케어",
    districts: [
      {
        slug: "main",
        name: "계룡권",
        dongs: makeDongs("계룡", "계룡권", [
          { slug: "eomsa", name: "엄사면" },
          { slug: "geumam", name: "금암동" },
          { slug: "sindoan", name: "신도안면" },
          { slug: "duma", name: "두마면" }
        ])
      }
    ]
  },

  // 8. 논산시
  nonsan: {
    slug: "nonsan",
    name: "논산",
    phone: "0507-1280-3335",
    title: "논산 마사지 & 아로마 테라피",
    districts: [
      {
        slug: "main",
        name: "논산권",
        dongs: makeDongs("논산", "논산권", [
          { slug: "chwiam", name: "취암동" },
          { slug: "naedong", name: "내동" },
          { slug: "buchang", name: "부창동" },
          { slug: "ganggyeong", name: "강경읍" },
          { slug: "yeonmu", name: "연무읍" }
        ])
      }
    ]
  },

  // 9. 옥천군
  okcheon: {
    slug: "okcheon",
    name: "옥천",
    phone: "0507-1280-3336",
    title: "옥천 힐링 마사지 안내",
    districts: [
      {
        slug: "main",
        name: "옥천권",
        dongs: makeDongs("옥천", "옥천권", [
          { slug: "okcheon-eup", name: "옥천읍" },
          { slug: "dongi", name: "동이면" },
          { slug: "iweon", name: "이원면" }
        ])
      }
    ]
  },

  // 10. 금산군
  geumsan: {
    slug: "geumsan",
    name: "금산",
    phone: "0507-1280-3335",
    title: "금산 힐링 테라피 & 바디케어",
    districts: [
      {
        slug: "main",
        name: "금산권",
        dongs: makeDongs("금산", "금산권", [
          { slug: "geumsan-eup", name: "금산읍" },
          { slug: "chubu", name: "추부면" },
          { slug: "jinsan", name: "진산면" }
        ])
      }
    ]
  },

  // 11. 익산시
  iksan: {
    slug: "iksan",
    name: "익산",
    phone: "0507-1280-3335",
    title: "익산 마사지 & 스웨디시 안내",
    districts: [
      {
        slug: "main",
        name: "익산권",
        dongs: makeDongs("익산", "익산권", [
          { slug: "yeongdeung", name: "영등동" },
          { slug: "mohyeon", name: "모현동" },
          { slug: "sindong", name: "신동" },
          { slug: "eoyang", name: "어양동" },
          { slug: "dongsan", name: "동산동" },
          { slug: "busong", name: "부송동" }
        ])
      }
    ]
  },

  // 12. 전주시 (완산구, 덕진구)
  jeonju: {
    slug: "jeonju",
    name: "전주",
    phone: "0507-1280-3335",
    title: "전주 마사지 & 힐링 에스테틱",
    districts: [
      {
        slug: "wansan",
        name: "완산구",
        dongs: makeDongs("전주", "완산구", [
          { slug: "hyoja", name: "효자동" },
          { slug: "jungwhasan", name: "중화산동" },
          { slug: "seosin", name: "서신동" },
          { slug: "samcheon", name: "삼천동" },
          { slug: "pyeonghwa", name: "평화동" },
          { slug: "gosan", name: "고사동" }
        ])
      },
      {
        slug: "deokjin",
        name: "덕진구",
        dongs: makeDongs("전주", "덕진구", [
          { slug: "songcheon", name: "송천동" },
          { slug: "inhoo", name: "인후동" },
          { slug: "deokjin-dong", name: "덕진동" },
          { slug: "geumam-jj", name: "금암동" },
          { slug: "ujeon", name: "우아동" },
          { slug: "hoban", name: "호성동" },
          { slug: "hyosung", name: "혁신도시" }
        ])
      }
    ]
  }
};