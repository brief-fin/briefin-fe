const CATEGORY_LABEL: Record<string, string> = {
  // 신규 세부 코드
  B001: '주요사항보고서',
  A001: '사업보고서',
  A002: '반기보고서',
  A003: '분기보고서',
  C001: '증권신고서',
  D001: '대량보유보고서',
  // 구 대분류 코드 (기존 데이터 fallback)
  A: '정기공시',
  B: '주요사항보고서',
  C: '발행공시',
  D: '지분공시',
  I: '공정위공시',
};

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABEL[category] ?? category;
}
