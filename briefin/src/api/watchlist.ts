import { apiClient, ApiResponse } from "./client";


/**
 * 관심 기업 관련 API 응답 타입 정의
 * (백엔드에서 특정 결과 객체를 내려주지 않는다면 null 또는 {}로 설정 가능)
 */
export interface WatchResponse {
  id: number;
  name: string;
  // 필요한 필드 추가
}

export const watchlistApi = {
  /**
   * 관심 기업 등록 (POST)
   * @param companyId 기업 ID
   */
  add: (companyId: number) => 
    apiClient.post<ApiResponse<WatchResponse>>(`/api/users/${companyId}/watch`),

  /**
   * 관심 기업 해지 (DELETE)
   * @param companyId 기업 ID
   */
  remove: (companyId: number) => 
    apiClient.delete<ApiResponse<null>>(`/api/users/${companyId}/watch`),
};