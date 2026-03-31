/**
 * ISO 8601 날짜 문자열을 "YYYY.MM.DD HH:mm" 형식으로 변환합니다.
 * 예) "2026-03-31T10:35:35.173887" → "2026.03.31 10:35"
 */
export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
}

/**
 * ISO 8601 날짜 문자열을 "YYYY.MM.DD" 형식으로 변환합니다.
 * 예) "2026-03-31T10:35:35.173887" → "2026.03.31"
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  return `${yyyy}.${mm}.${dd}`;
}
