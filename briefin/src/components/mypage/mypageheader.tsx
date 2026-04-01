interface MyPageHeaderProps {
  email?: string;
  onLogout?: () => void;
}

export default function MyPageHeader({ email = 'user@example.com' }: MyPageHeaderProps) {
  return (
    <div className="flex items-start justify-between pb-16pxr">
      <div className="flex flex-col gap-10pxr">
        <h1 className="fonts-heading3">마이페이지</h1>
      </div>
    </div>
  );
}
