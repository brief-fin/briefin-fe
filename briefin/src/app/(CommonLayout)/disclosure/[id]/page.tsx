import DisclosureHeader from '@/components/disclosure/DisclosureHeader';
import DisclosureSummary from '@/components/disclosure/DisclosureSummary';
import DisclosureDetails from '@/components/disclosure/DisclosureDetails';
import DisclosureSidebar from '@/components/disclosure/DisclosureSideBar';
import DisclosureActionButtons from '@/components/disclosure/DisclosureBtn';
import RelatedCompanies from '@/components/disclosure/RelatedCompanies';
import { MOCK_DISCLOSURE_DETAIL, MOCK_RECENT_DISCLOSURES } from '@/mocks/disclosureDetail';
import type { DisclosureDetail } from '@/types/disclosure';
import BackButton from '@/components/common/BackButton';
import { PageProps } from '@/types/disclosure';

async function getDisclosure(id: string): Promise<DisclosureDetail | null> {
  // TODO: API 연동 시 fetch로 교체
  if (id === MOCK_DISCLOSURE_DETAIL.id || id === '2026-03-00412') {
    return MOCK_DISCLOSURE_DETAIL;
  }
  return null;
}

export default async function DisclosureDetailPage({ params }: PageProps) {
  const { id } = await params;
  const data = await getDisclosure(id);

  if (!data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-16pxr">
        <p className="fonts-body text-text-secondary">해당 공시를 찾을 수 없습니다.</p>
        <BackButton>← 공시 목록으로</BackButton>
      </div>
    );
  }

  const {
    category,
    date,
    source,
    title,
    companyName,
    reportNumber,
    summaryPoints,
    description,
    details,
    descriptionAfterTable,
    url,
    documentUrl,
    relatedCompanyNames,
  } = data;

  const cleanCompanyName = companyName ? companyName.replace(/\s*주식회사\s*$/, '') : undefined;

  return (
    <div className="min-h-screen bg-surface-bg py-36pxr">
      <BackButton>← 공시 목록으로</BackButton>
      <div className="mt-16pxr flex flex-col gap-16pxr lg:flex-row lg:items-start lg:gap-24pxr">
        <article className="min-w-0 flex-1 rounded-card border border-surface-border bg-surface-white p-24pxr shadow-hero-card sm:p-32pxr">
          <DisclosureHeader data={{ category, date, source, title, companyName, reportNumber }} />
          <DisclosureSummary summaryPoints={summaryPoints} />
          <p className="fonts-body text-text-secondary">{description}</p>
          <DisclosureDetails details={details} />
          {descriptionAfterTable && <p className="fonts-body text-text-secondary">{descriptionAfterTable}</p>}
          <DisclosureActionButtons url={url} documentUrl={documentUrl} />
          {relatedCompanyNames && <RelatedCompanies relatedCompanyNames={relatedCompanyNames} />}
        </article>
        <DisclosureSidebar recentDisclosures={MOCK_RECENT_DISCLOSURES} companyName={cleanCompanyName} />
      </div>
    </div>
  );
}
