// app/page.tsx 내부의 targetDistricts 수정 부분
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
      slug: "seo", // 👈 "seogu"에서 data.ts와 동일하게 "seo"로 변경
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
        { name: "가양동", slug: "gaya" }, // 👈 data.ts의 slug("gaya")와 일치시킴
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