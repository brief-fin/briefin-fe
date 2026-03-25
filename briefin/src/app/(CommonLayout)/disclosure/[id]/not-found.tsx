import BackButton from '@/components/common/BackButton';

export default function DisclosureNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-16pxr">
      <p className="fonts-body text-text-secondary">해당 공시를 찾을 수 없습니다.</p>
      <BackButton>← 공시 목록으로</BackButton>
    </div>
  );
}
