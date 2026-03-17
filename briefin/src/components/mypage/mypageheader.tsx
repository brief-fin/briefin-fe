interface MyPageHeaderProps {
  email?: string;
  onLogout?: () => void;
}

export default function MyPageHeader({ email = 'user@example.com', onLogout }: MyPageHeaderProps) {
  return (
    <div className="flex items-start justify-between px-24pxr pt-36pxr pb-16pxr">
      <div className="flex flex-col gap-4pxr">
        <h1 className="fonts-heading2">마이페이지</h1>
        <p className="text-[15px] text-text-muted">{email}</p>
      </div>
      <button
        onClick={onLogout}
        className="h-38pxr rounded-button border border-surface-border bg-surface-white px-16pxr text-[14px] font-bold text-text-secondary transition-colors hover:bg-surface-bg">
        로그아웃
      </button>
    </div>
  );
}
