import { MyPageTab } from '@/types/mypage';

export const MY_PAGE_TABS: MyPageTab[] = ['관심 기업', '스크랩 뉴스', '최근 본 뉴스', '계정 관리'];

export const TAB_FROM_QUERY: Record<string, MyPageTab> = {
  watchlist: '관심 기업',
  scrap: '스크랩 뉴스',
  recent: '최근 본 뉴스',
  account: '계정 관리',
};

export const TAB_TO_QUERY: Record<MyPageTab, string> = {
  '관심 기업': 'watchlist',
  '스크랩 뉴스': 'scrap',
  '최근 본 뉴스': 'recent',
  '계정 관리': 'account',
};
