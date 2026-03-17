export const mockNewsData = [
    {
      id: "1",
      isLive: true,
      source: "로이터",
      publishedAt: "오전 10:30",
      title: "삼성전자, 북미 최대 데이터센터와 NVMe SSD 공급 계약 체결",
      summaries: [
        "북미 대형 데이터센터와 대규모 SSD 공급 확정",
        "고부가가치 제품군 확대로 수익성 개선 기대",
        "향후 2년간 안정적인 매출처 확보",
      ],
      tags: ["공급계약", "삼성전자", "반도체"],
      isScrapped: false,
    },
    {
      id: "2",
      isLive: false,
      source: "연합뉴스",
      publishedAt: "오전 09:15",
      title: "SK하이닉스, HBM4 양산 일정 앞당긴다…엔비디아 공급 확대",
      summaries: [
        "HBM4 양산 시점 6개월 조기 달성 목표",
        "엔비디아향 공급 비중 60% 이상으로 확대",
        "AI 반도체 수요 급증에 따른 생산 라인 증설",
      ],
      tags: ["HBM", "SK하이닉스", "반도체"],
      isScrapped: false,
    },
    {
      id: "3",
      isLive: false,
      source: "블룸버그",
      publishedAt: "오전 08:45",
      title: "카카오, AI 기반 광고 플랫폼 출시…수익 다각화 본격화",
      summaries: [
        "GPT 기반 타겟 광고 솔루션 2분기 출시 예정",
        "광고 매출 전년 대비 30% 성장 기대",
        "카카오톡·다음 채널 통합 운영으로 시너지 극대화",
      ],
      tags: ["카카오", "AI", "광고"],
      isScrapped: true,
    },
    {
      id: "4",
      isLive: true,
      source: "한국경제",
      publishedAt: "오전 07:50",
      title: "현대차, 미국 조지아 공장 전기차 생산량 2배 확대 결정",
      summaries: [
        "조지아 메타플랜트 연산 50만 대 목표로 증설",
        "IRA 보조금 혜택 극대화 위한 현지 생산 강화",
        "2026년까지 북미 전기차 시장 점유율 15% 목표",
      ],
      tags: ["현대차", "전기차", "미국"],
      isScrapped: false,
    },
    {
      id: "5",
      isLive: false,
      source: "매일경제",
      publishedAt: "오전 07:00",
      title: "LG에너지솔루션, 유럽 배터리 공장 가동률 회복세",
      summaries: [
        "폴란드 공장 가동률 85% 회복…전분기 대비 20%p 상승",
        "유럽 전기차 수요 회복에 따른 수주 잔고 증가",
        "2025년 유럽 매출 비중 40% 돌파 전망",
      ],
      tags: ["LG에너지솔루션", "배터리", "유럽"],
      isScrapped: false,
    },
  ];
  
  export type NewsItem = (typeof mockNewsData)[0];