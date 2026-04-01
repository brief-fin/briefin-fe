'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchSubscribedCompanies } from '@/api/disclosureApi';
import { unsubscribePush } from '@/lib/pushNotification';

interface SubscribedCompany {
  companyId: number;
  name: string;
  ticker: string;
  logoUrl: string | null;
}

function BellUnsubscribeButton({ loading, onClick }: { loading: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={loading}
      title="알림 해제"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="shrink-0 p-4pxr disabled:opacity-40">
      {loading ? (
        <span className="block h-18pxr w-18pxr animate-pulse rounded-full bg-gray-200" />
      ) : (
        <img src={hovered ? '/bell-yellow.svg' : '/bell-filled-gray.svg'} alt="" width={18} height={18} />
      )}
    </button>
  );
}

function CompanyLogo({ company }: { company: SubscribedCompany }) {
  const [imgError, setImgError] = useState(false);
  const tossUrl = company.ticker
    ? `https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-${company.ticker}.png`
    : null;
  const src = !imgError && (company.logoUrl || tossUrl) ? (company.logoUrl || tossUrl)! : null;

  if (src) {
    return (
      <Image
        src={src}
        alt={company.name}
        width={40}
        height={40}
        className="object-cover"
        unoptimized
        onError={() => setImgError(true)}
      />
    );
  }
  return <span className="text-[18px]">🏢</span>;
}

export default function SubscribedCompaniesSection() {
  const [companies, setCompanies] = useState<SubscribedCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [unsubscribingIds, setUnsubscribingIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchSubscribedCompanies()
      .then((data) => {
        setCompanies(data ?? []);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
        setCompanies([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUnsubscribe = async (companyId: number) => {
    setUnsubscribingIds((prev) => new Set(prev).add(companyId));
    try {
      await unsubscribePush(companyId);
      setCompanies((prev) => prev.filter((c) => c.companyId !== companyId));
    } catch {
      alert('알림 해제에 실패했습니다.');
    } finally {
      setUnsubscribingIds((prev) => {
        const next = new Set(prev);
        next.delete(companyId);
        return next;
      });
    }
  };

  if (loading) {
    return (
      <div className="flex animate-pulse flex-col gap-12pxr">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-12pxr rounded-card border border-surface-border bg-surface-white px-20pxr py-16pxr">
            <div className="h-40pxr w-40pxr shrink-0 rounded-button bg-gray-200" />
            <div className="flex flex-1 flex-col gap-6pxr">
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-3 w-16 rounded bg-gray-200" />
            </div>
            <div className="h-18pxr w-18pxr rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  if (hasError) {
    return (
      <p className="py-40pxr text-center text-[14px] text-text-muted">목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>
    );
  }

  if (companies.length === 0) {
    return (
      <p className="py-40pxr text-center text-[14px] text-text-muted">공시 알림을 신청한 기업이 없습니다.</p>
    );
  }

  return (
    <div className="flex flex-col gap-12pxr">
      {companies.map((company) => (
        <div
          key={company.companyId}
          className="flex items-center gap-12pxr rounded-card border border-surface-border bg-surface-white px-20pxr py-16pxr">
          <div className="flex h-40pxr w-40pxr shrink-0 items-center justify-center overflow-hidden rounded-button bg-surface-bg">
            <CompanyLogo company={company} />
          </div>
          <Link href={`/companies/${company.companyId}`} className="min-w-0 flex-1 hover:opacity-70">
            <p className="text-[14px] font-bold text-text-primary">{company.name}</p>
            {company.ticker && <p className="fonts-caption text-text-muted">{company.ticker}</p>}
          </Link>
          <BellUnsubscribeButton
            loading={unsubscribingIds.has(company.companyId)}
            onClick={() => handleUnsubscribe(company.companyId)}
          />
        </div>
      ))}
    </div>
  );
}
