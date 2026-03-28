import DisclosureHeader from '@/components/disclosure/DisclosureHeader';
import DisclosureSummary from '@/components/disclosure/DisclosureSummary';
import DisclosureSidebar from '@/components/disclosure/DisclosureSideBar';
import DisclosureActionButtons from '@/components/disclosure/DisclosureBtn';
import BackButton from '@/components/common/BackButton';
import { fetchDisclosureDetail, fetchDisclosureRecent } from '@/api/disclosureApi';
import { ApiError } from '@/api/client';
import { notFound } from 'next/navigation';
import type { DisclosureListItem, DisclosureRecentApiItem, PageProps } from '@/types/disclosure';
import ReactMarkdown from 'react-markdown';

export default async function DisclosureDetailPage({ params }: PageProps) {
  const { id } = await params;

  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  let data;
  try {
    data = await fetchDisclosureDetail(numericId);
  } catch (err) {
    if (err instanceof ApiError && (err.status === 404 || err.status === 500)) {
      notFound();
    }
    throw err;
  }

  const summaryPoints = data.summary ? data.summary.split('\n').filter(Boolean) : [];

  let recentDisclosures: DisclosureListItem[] = [];
  try {
    const recent = await fetchDisclosureRecent(data.companyId);

    recentDisclosures = recent
      .filter((r: DisclosureRecentApiItem) => r.disclosureId !== data.disclosureId)
      .map(
        (r: DisclosureRecentApiItem): DisclosureListItem => ({
          id: String(r.disclosureId),
          title: r.title,
          date: r.disclosedAt,
          category: '',
          companyName: data.companyName,
        }),
      );
  } catch (e) {
    console.error('fetchDisclosureRecent 실패:', e);
  }

  const cleanCompanyName = data.companyName?.replace(/\s*주식회사\s*$/, '');

  return (
    <div className="min-h-screen bg-surface-bg py-36pxr">
      <BackButton href="/disclosure">← 공시 목록으로</BackButton>

      <div className="mt-16pxr flex flex-col gap-16pxr lg:flex-row lg:items-start lg:gap-24pxr">
        <div className="flex min-w-0 flex-1 flex-col gap-14pxr">
          <article className="rounded-card border border-surface-border bg-surface-white p-24pxr shadow-hero-card sm:p-32pxr">
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
              <div className="mt-24pxr border-t border-surface-border pt-24pxr">
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => (
                      <h2 className="fonts-heading4 mb-12pxr mt-28pxr flex items-center gap-8pxr text-text-primary first:mt-0">
                        <span className="inline-block h-16pxr w-3pxr shrink-0 rounded-full bg-primary" />
                        {children}
                      </h2>
                    ),
                    p: ({ children }) => (
                      <p className="fonts-body mb-16pxr leading-relaxed text-text-secondary">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-16pxr flex flex-col gap-6pxr pl-4pxr">{children}</ul>
                    ),
                    li: ({ children }) => (
                      <li className="fonts-body flex gap-8pxr text-text-secondary">
                        <span className="mt-[7px] h-5pxr w-5pxr shrink-0 rounded-full bg-primary opacity-50" />
                        <span>{children}</span>
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-text-primary">{children}</strong>
                    ),
                  }}>
                  {data.summaryDetail}
                </ReactMarkdown>
              </div>
            )}

            <DisclosureActionButtons url={data.url} />
          </article>
        </div>

        <aside className="flex w-full flex-col gap-14pxr lg:w-96 lg:shrink-0">
          <DisclosureSidebar
            companyId={data.companyId}
            recentDisclosures={recentDisclosures}
            companyName={cleanCompanyName}
          />
        </aside>
      </div>
    </div>
  );
}
