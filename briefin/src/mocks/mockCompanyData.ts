// src/mocks/companyData.ts
export const mockCompanyData = [
    { id: "1", name: "삼성전자", category: "반도체 · 전자", changeRate: +1.3, emoji: "📱" },
    { id: "2", name: "SK하이닉스", category: "반도체", changeRate: +2.1, emoji: "💾" },
    { id: "3", name: "현대차", category: "자동차", changeRate: -0.8, emoji: "🚗" },
    { id: "4", name: "카카오", category: "IT · 플랫폼", changeRate: +0.5, emoji: "💬" },
    { id: "5", name: "LG에너지솔루션", category: "배터리 · 전기차", changeRate: -1.2, emoji: "🔋" },
    { id: "6", name: "NAVER", category: "IT · 플랫폼", changeRate: +1.8, emoji: "🌐" },
  ];
  
  export type Company = (typeof mockCompanyData)[0];