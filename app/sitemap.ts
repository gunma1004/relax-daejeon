import { MetadataRoute } from "next";
import { CITIES_DATA, DOMAIN } from "./data";

export default function sitemap(): MetadataRoute.Sitemap {
  // ISO 8601 포맷
  const lastModified = new Date().toISOString();

  // 1. 메인 홈페이지
  const routes: MetadataRoute.Sitemap = [
    {
      url: DOMAIN,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // 2. 대전 지역 계층 순회 (시 -> 구 -> 동)
  Object.values(CITIES_DATA || {}).forEach((city: any) => {
    if (!city?.slug) return;

    // 2-1. 시 단위 URL (/daejeon)
    routes.push({
      url: `${DOMAIN}/${city.slug}`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    });

    (city.districts || []).forEach((district: any) => {
      if (!district?.slug) return;

      // 2-2. 구 단위 URL (/daejeon/yuseong 등)
      routes.push({
        url: `${DOMAIN}/${city.slug}/${district.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
      });

      (district.dongs || []).forEach((dong: any) => {
        if (!dong?.slug) return;

        // 2-3. 동 단위 세부 URL (/daejeon/yuseong/bongmyeong 등)
        routes.push({
          url: `${DOMAIN}/${city.slug}/${district.slug}/${dong.slug}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      });
    });
  });

  return routes;
}