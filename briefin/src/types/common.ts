import { NewsItem } from '@/types/news';

export interface AlertBannerProps {
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick?: () => void;
}

export type BackButtonProps = {
  /** 이동할 경로. 있으면 Link, 없으면 button으로 렌더 */
  href?: string;
  /** 클릭 핸들러. href가 없을 때만 사용 */
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

export type HeaderProps = {
  isLoggedIn?: boolean;
  userEmail?: string;
  onLogout?: () => void;
};

export type NavItem = {
  label: string;
  href: string;
  highlight?: boolean;
};

export interface LabelProps {
  text: string;
  variant: 'category' | 'company';
}

export interface Company {
  id: number;
  name: string;
  sector: string;
  change: string;
  isRise: boolean;
  emoji: string;
  bgColor: string;
}

export interface PopularCompanyListProps {
  title: string;
  companies: Company[];
  onCompanyClick?: (id: number) => void;
}

export interface SearchComponentProps {
  searchPath?: string;
  placeholder?: string;
}

export interface TabsProps<T extends string> {
  tabs: T[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  className?: string;
}
