import DisclosureHeader from '@/components/disclosure/DisclosureHeader';
import DisclosureInvestmentAnalysis from '@/components/disclosure/DisclosureInvestmentAnalysis';
import DisclosureKeyPoints from '@/components/disclosure/DisclosureKeyPoints';
import DisclosureDetailContent from '@/components/disclosure/DisclosureDetailContent';
import DisclosureSidebar from '@/components/disclosure/DisclosureSideBar';
import DisclosureBtn from '@/components/disclosure/DisclosureBtn';
import { fetchDisclosureDetail, fetchDisclosureRecent } from '@/api/disclosureApi';
import { ApiError } from '@/api/client';
import { notFound } from 'next/navigation';
import type { DisclosureListItem, DisclosureRecentApiItem, PageProps } from '@/types/disclosure';

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
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    throw err;
  }

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
          category: r.category ?? '',
          companyName: data.companyName,
        }),
      );
  } catch (e) {
    console.error('fetchDisclosureRecent 실패:', e);
  }

  const cleanCompanyName = data.companyName?.replace(/\s*주식회사\s*$/, '');

  return (
    <div className="min-h-screen bg-surface-bg py-36pxr">
      <div className="mt-16pxr flex flex-col gap-16pxr lg:flex-row lg:gap-24pxr">
        <div className="flex min-w-0 flex-1 flex-col gap-14pxr">
          <article className="rounded-card border border-surface-border bg-surface-white p-24pxr shadow-hero-card sm:p-32pxr">
            {/* 1. 헤더: 회사명 + ticker, category 배지, 제목, 날짜 */}
            <DisclosureHeader
              data={{
                category: data.category ?? '',
                date: data.disclosedAt,
                title: data.title,
                companyName: data.companyName,
                companyId: data.companyId,
                ticker: data.ticker,
              }}
            />

            {/* 2. 투자 분석 */}
            {data.investmentAnalysis && data.sentiment && (
              <DisclosureInvestmentAnalysis sentiment={data.sentiment} investmentAnalysis={data.investmentAnalysis} />
            )}

            {/* 3. 핵심 포인트 */}
            {data.keyPoints && data.keyPoints.length > 0 && <DisclosureKeyPoints keyPoints={data.keyPoints} />}

            {/* 4. 상세 내용 */}
            {data.detailedContent && <DisclosureDetailContent detailedContent={data.detailedContent} />}

            {/* 5. DART 원문 보기 버튼 */}
            <DisclosureBtn url={data.url} />
          </article>
        </div>

        <div className="w-full lg:w-260pxr lg:shrink-0">
          <div className="sticky top-24pxr">
            <DisclosureSidebar
              companyId={data.companyId}
              recentDisclosures={recentDisclosures}
              companyName={cleanCompanyName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
