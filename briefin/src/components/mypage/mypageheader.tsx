interface MyPageHeaderProps {
  email?: string;
  onLogout?: () => void;
}

export default function MyPageHeader({ email = 'user@example.com' }: MyPageHeaderProps) {
  return (
    <div className="flex items-start justify-between pb-16pxr">
      <div className="flex flex-col gap-4pxr">
        <h1 className="fonts-heading3">마이페이지</h1>
        <p className="text-[15px] text-text-muted">{email}</p>
      </div>
    </div>
  );
}
