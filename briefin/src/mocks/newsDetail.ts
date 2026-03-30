// src/mocks/newsDetailDummy.ts

/** 뉴스 상세 mock 타입 */
export type MockNewsDetailRaw = {
    id: string;
    isLive: boolean;
    category: string;
    source: string;
    publishedAt: string;
    title: string;
    summaries: string[];
    content: string;
    originalUrl: string;
    isScrapped: boolean;
    relatedCompanies: { id: string; name: string; emoji: string }[];
    relatedNews: { id: string; title: string; source: string; publishedAt: string }[];
  };
  
  export const mockNewsDetailData: MockNewsDetailRaw[] = [
    {
      id: "1",
      isLive: true,
      category: "공급계약",
      source: "로이터",
      publishedAt: "2026.03.13 오전 10:30",
      title: "삼성전자, 북미 최대 데이터센터와 NVMe SSD 공급 계약 체결",
      summaries: [
        "북미 대형 데이터센터와 대규모 SSD 공급 확정",
        "고부가가치 제품군 확대로 수익성 개선 기대",
        "향후 2년간 안정적인 매출처 확보",
      ],
      content: `삼성전자가 북미 최대 규모의 데이터센터 운영사와 NVMe SSD 대규모 공급 계약을 체결했다고 13일 밝혔다. 이번 계약은 향후 2년간 진행되며, 삼성전자의 고부가가치 엔터프라이즈 SSD 제품군이 주요 공급 대상이다.
  
  삼성전자 측은 "이번 계약을 통해 안정적인 북미 매출처를 확보했으며, AI 데이터센터 수요 증가에 따른 고성능 스토리지 시장 선점 효과가 기대된다"고 밝혔다.
  
  업계에서는 이번 계약이 삼성전자의 B2B 솔루션 사업 확대 전략과 맞닿아 있으며, 수익성 개선에 긍정적 영향을 줄 것으로 전망하고 있다.`,
      originalUrl: "https://www.reuters.com",
      isScrapped: true,
      relatedCompanies: [
        { id: "1", name: "삼성전자", emoji: "📱" },
        { id: "7", name: "북미 데이터센터", emoji: "🖥️" },
      ],
      relatedNews: [
        { id: "2", title: "SK하이닉스, HBM4 양산 일정 앞당겨", source: "연합뉴스", publishedAt: "오전 8:50" },
        { id: "3", title: "NVIDIA, Blackwell GPU 수요 급증", source: "Bloomberg", publishedAt: "오전 7:40" },
        { id: "4", title: "삼성전자, CES 2026 신제품 발표", source: "한국경제", publishedAt: "2026.01.15" },
      ],
    },
    {
      id: "2",
      isLive: false,
      category: "실적발표",
      source: "한국경제",
      publishedAt: "2026.02.28 오전 9:00",
      title: "삼성전자, 4분기 영업이익 시장 예상치 대폭 상회",
      summaries: [
        "4분기 영업이익 12조원 돌파, 컨센서스 대비 20% 상회",
        "반도체 부문 HBM 매출 급증이 실적 견인",
        "2026년 연간 영업이익 50조원 목표 제시",
      ],
      content: `삼성전자가 2025년 4분기 영업이익이 12조원을 돌파하며 시장 예상치를 대폭 상회했다고 밝혔다. 이는 전년 동기 대비 15% 상회하는 수준으로, 반도체 부문의 HBM 매출 급증이 실적을 견인한 것으로 분석된다.
  
  삼성전자 관계자는 "AI 반도체 수요 확대에 따른 HBM3E 공급 증가와 파운드리 가동률 회복이 주요 요인"이라고 설명했다.
  
  증권가에서는 2026년 연간 영업이익이 50조원을 넘어설 것으로 전망하며, 목표주가를 상향 조정하는 움직임이 이어지고 있다.`,
      originalUrl: "https://www.hankyung.com",
      isScrapped: false,
      relatedCompanies: [
        { id: "1", name: "삼성전자", emoji: "📱" },
      ],
      relatedNews: [
        { id: "1", title: "삼성전자, 북미 최대 데이터센터와 NVMe SSD 공급 계약 체결", source: "로이터", publishedAt: "오전 10:30" },
        { id: "3", title: "NVIDIA, Blackwell GPU 수요 급증", source: "Bloomberg", publishedAt: "오전 7:40" },
      ],
    },
    {
      id: "3",
      isLive: false,
      category: "신제품",
      source: "한국경제",
      publishedAt: "2026.01.15 오전 11:00",
      title: "삼성전자, CES 2026 신제품 발표",
      summaries: [
        "차세대 OLED 패널 및 AI 가전 라인업 공개",
        "AI 홈 생태계 강화로 프리미엄 시장 공략",
        "글로벌 TV 시장 점유율 1위 수성 목표",
      ],
      content: `삼성전자가 CES 2026에서 차세대 OLED 패널과 AI 가전 라인업을 공개했다. 이번 신제품은 AI 홈 생태계를 강화하는 방향으로 설계됐으며, 프리미엄 시장 공략을 위한 핵심 제품군으로 주목받고 있다.
  
  삼성전자는 이번 CES에서 공개한 제품들이 글로벌 TV 시장 점유율 1위를 수성하는 데 핵심적인 역할을 할 것으로 기대하고 있다.
  
  업계에서는 삼성전자의 AI 가전 라인업이 LG전자와의 프리미엄 시장 경쟁에서 우위를 점할 수 있을지 주목하고 있다.`,
      originalUrl: "https://www.hankyung.com",
      isScrapped: false,
      relatedCompanies: [
        { id: "1", name: "삼성전자", emoji: "📱" },
      ],
      relatedNews: [
        { id: "1", title: "삼성전자, 북미 최대 데이터센터와 NVMe SSD 공급 계약 체결", source: "로이터", publishedAt: "오전 10:30" },
        { id: "2", title: "삼성전자, 4분기 영업이익 시장 예상치 대폭 상회", source: "한국경제", publishedAt: "오전 9:00" },
      ],
    },
  ];
  
  /** MockNewsDetailRaw → 상세 페이지용 변환 함수 */
  export function toNewsDetail(raw: MockNewsDetailRaw) {
    return {
      id: raw.id,
      isLive: raw.isLive,
      category: raw.category,
      source: raw.source,
      publishedAt: raw.publishedAt,
      title: raw.title,
      summaries: raw.summaries,
      content: raw.content,
      originalUrl: raw.originalUrl,
      isScrapped: raw.isScrapped,
      relatedCompanies: raw.relatedCompanies,
      relatedNews: raw.relatedNews,
    };
  }