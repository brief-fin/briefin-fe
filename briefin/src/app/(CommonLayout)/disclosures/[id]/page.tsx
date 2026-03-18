import Link from 'next/link';
import DisclosureHeader from '@/components/disclosure/disclosure-header';
import DisclosureSummary from '@/components/disclosure/disclosure-summary';
import DisclosureDetails from '@/components/disclosure/disclosure-details';
import DisclosureSidebar from '@/components/disclosure/disclosure-sidebar';
import { MOCK_DISCLOSURE_DETAIL, MOCK_RECENT_DISCLOSURES } from '@/mocks/disclosureDetail';
import type { DisclosureDetail } from '@/types/disclosure';

interface PageProps {
  params: Promise<{ id: string }>;
}

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
        <Link
          href="/disclosure"
          className="rounded-button border border-surface-border bg-surface-white px-14pxr py-10pxr text-[14px] font-bold text-text-secondary transition-colors hover:bg-surface-bg"
        >
          ← 공시 목록으로
        </Link>
      </div>
    );
  }

  const {
    summaryPoints,
    description,
    details,
    descriptionAfterTable,
    url,
    documentUrl,
    relatedCompanyNames,
    companyName,
  } = data;

  return (
    <div className="min-h-screen bg-surface-bg pb-40pxr">
      <div className="pt-20pxr sm:pt-28pxr md:pt-36pxr">
        <Link
          href="/disclosure"
          className="inline-flex items-center gap-4pxr rounded-button border border-surface-border bg-surface-white px-12pxr py-8pxr text-[13px] font-bold text-text-secondary transition-colors hover:bg-surface-bg sm:px-14pxr sm:py-10pxr sm:text-[14px]"
        >
          ← 공시 목록으로
        </Link>
      </div>

      <div className="mt-14pxr flex flex-col gap-16pxr lg:flex-row lg:items-start lg:gap-24pxr">
        <article className="min-w-0 flex-1 rounded-card border border-surface-border bg-surface-white p-24pxr shadow-hero-card sm:p-32pxr">
          <DisclosureHeader
            data={{
              category: data.category,
              date: data.date,
              source: data.source,
              title: data.title,
              companyName: data.companyName,
              reportNumber: data.reportNumber,
            }}
          />

          <div className="mt-20pxr">
            <DisclosureSummary summaryPoints={summaryPoints} />
          </div>

          <p className="fonts-body mt-20pxr text-text-secondary">{description}</p>

          <div className="mt-20pxr">
            <DisclosureDetails details={details} />
          </div>

          {descriptionAfterTable && (
            <p className="fonts-body mt-20pxr text-text-secondary">{descriptionAfterTable}</p>
          )}

          <div className="mt-24pxr border-t border-surface-border pt-20pxr flex flex-wrap items-center gap-12pxr">
            <a
              href={documentUrl ?? url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-button border border-surface-border bg-surface-white px-20pxr py-12pxr text-[13px] font-bold text-text-secondary transition-colors hover:bg-surface-bg"
            >
              📄 원본 보고서 보기 (DART)
            </a>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-button border border-surface-border bg-surface-white px-20pxr py-12pxr text-[13px] font-bold text-text-secondary transition-colors hover:bg-surface-bg"
            >
              🔗 원문 공시 바로가기
            </a>
          </div>

          {relatedCompanyNames && relatedCompanyNames.length > 0 && (
            <div className="mt-24pxr">
              <p className="fonts-caption mb-8pxr font-bold text-text-muted">관련 기업</p>
              <div className="flex flex-wrap gap-8pxr">
                {relatedCompanyNames.map((name) => (
                  <Link
                    key={name}
                    href="/companies"
                    className="rounded-badge bg-surface-muted px-14pxr py-8pxr text-[13px] font-bold text-text-secondary transition-colors hover:bg-surface-border"
                  >
                    📱 {name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        <DisclosureSidebar
          recentDisclosures={MOCK_RECENT_DISCLOSURES}
          companyName={companyName ? companyName.replace(/\s*주식회사\s*$/, '') : undefined}
        />
      </div>
    </div>
  );
}
