import { useState, useEffect } from 'react';

interface PriceData {
  currentPrice: number;
  changeRate: number;
  marketCap: number;
}

export type PriceMap = Record<string, PriceData>;

export function useSearchPriceStream(tickers: string[]) {
  const [prices, setPrices] = useState<PriceMap>({});
  const tickersKey = tickers.join(',');

  useEffect(() => {
    if (!tickersKey || typeof window === 'undefined') {
      setPrices({});
      return;
    }

    setPrices({});

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/companies/price/stream?tickers=${tickersKey}`,
    );

    tickers.forEach((ticker) => {
      eventSource.addEventListener(ticker, (e: Event) => {
        if (e instanceof MessageEvent) {
          try {
            const data: PriceData = JSON.parse(e.data);
            setPrices((prev) => ({ ...prev, [ticker]: data }));
          } catch (err) {
            console.error('데이터 파싱 실패:', err);
          }
        }
      });
    });

    eventSource.onerror = (e) => {
      console.warn('SSE 연결 일시적 오류. 재연결을 시도합니다.', e);
    };

    return () => {
      eventSource.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickersKey]);

  return prices;
}
