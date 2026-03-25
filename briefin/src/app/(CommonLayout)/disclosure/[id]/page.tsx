import DisclosureHeader from '@/components/disclosure/DisclosureHeader';
import DisclosureSummary from '@/components/disclosure/DisclosureSummary';
import DisclosureSidebar from '@/components/disclosure/DisclosureSideBar';
import DisclosureActionButtons from '@/components/disclosure/DisclosureBtn';
import BackButton from '@/components/common/BackButton';
import { fetchDisclosureDetail, fetchDisclosureRecent } from '@/api/disclosureApi';
import { ApiError } from '@/api/client';
import type { DisclosureListItem, PageProps } from '@/types/disclosure';

export default async function DisclosureDetailPage({ params }: PageProps) {
  const { id } = await params;

  let data;
  let notFound = false;
  try {
    data = await fetchDisclosureDetail(Number(id));
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound = true;
    } else {
      throw err;
    }
  }

  if (notFound || !data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-16pxr">
        <p className="fonts-body text-text-secondary">해당 공시를 찾을 수 없습니다.</p>
        <BackButton>← 공시 목록으로</BackButton>
      </div>
    );
  }

  const summaryPoints = data.summary ? data.summary.split('\n').filter(Boolean) : [];

  let recentDisclosures: DisclosureListItem[] = [];
  try {
    const recent = await fetchDisclosureRecent(data.companyId);
    recentDisclosures = recent
      .filter((r) => r.disclosureId !== data.disclosureId)
      .map((r) => ({
        id: String(r.disclosureId),
        title: r.title,
        date: r.disclosedAt,
        category: '',
        companyName: data.companyName,
      }));
  } catch {
    // sidebar gracefully empty
  }

  const cleanCompanyName = data.companyName?.replace(/\s*주식회사\s*$/, '');

  return (
    <div className="min-h-screen bg-surface-bg py-36pxr">
      <BackButton>← 공시 목록으로</BackButton>
      <div className="mt-16pxr flex flex-col gap-16pxr lg:flex-row lg:items-start lg:gap-24pxr">
        <article className="min-w-0 flex-1 rounded-card border border-surface-border bg-surface-white p-24pxr shadow-hero-card sm:p-32pxr">
          <DisclosureHeader
            data={{
              category: '',
              date: data.disclosedAt,
              source: 'DART',
              title: data.title,
              companyName: data.companyName,
              reportNumber: data.dartId,
            }}
          />
          {summaryPoints.length > 0 && <DisclosureSummary summaryPoints={summaryPoints} />}
          {data.summaryDetail && (
            <p className="fonts-body mt-16pxr whitespace-pre-line text-text-secondary">
              {data.summaryDetail}
            </p>
          )}
          <DisclosureActionButtons url={data.url} />
        </article>
        <DisclosureSidebar recentDisclosures={recentDisclosures} companyName={cleanCompanyName} />
      </div>
    </div>
  );
}
