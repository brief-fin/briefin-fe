import { useState, useEffect } from 'react';

interface StockPrice {
  currentPrice: number;
  changeRate: number;
}

export function useStockPrice(ticker: string | null) {
  const [stockPrice, setStockPrice] = useState<StockPrice | null>(null);

  useEffect(() => {
    if (!ticker) return;
    if (typeof window === 'undefined') return; 

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/companies/${ticker}/price`
    );

    // 최초 현재가
    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setStockPrice(data);
    };

    // 실시간 업데이트
    eventSource.addEventListener('realtime-price', (e) => {
      const data = JSON.parse(e.data);
      setStockPrice(data);
    });

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [ticker]);

  return stockPrice;
}