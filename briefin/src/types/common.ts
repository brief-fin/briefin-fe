export interface AlertBannerProps {
  title: string;
  description: string;
  buttonLabel: string;
  /** true면 버튼 자리를 스켈레톤으로 대체 */
  loading?: boolean;
  /** 있으면 버튼 대신 Link로 렌더(호버 색 변경 없음), 없으면 button + onButtonClick */
  buttonHref?: string;
  onButtonClick?: () => void;
}

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
  tabIcons?: Partial<Record<T, React.ReactNode>>;
}
