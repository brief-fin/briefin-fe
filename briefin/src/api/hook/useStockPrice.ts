import { useState, useEffect } from 'react';

interface StockPrice {
  currentPrice: number;
  changeRate: number;
}

export function useStockPrice(ticker: string | null) {
  const [stockPrice, setStockPrice] = useState<StockPrice | null>(null);

  useEffect(() => {
    // 1. ticker가 없거나 브라우저 환경이 아니면 초기화 후 종료
    if (!ticker || typeof window === 'undefined') {
      setStockPrice(null);
      return;
    }

    // 2. 새로운 연결을 시작하기 전에 기존 데이터를 비웁니다.
    // (이 호출은 ticker가 변경될 때 한 번만 발생하므로 에러를 방지할 수 있습니다)
    setStockPrice(null);

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/companies/${ticker}/price`
    );

    // 공통 데이터 파싱 로직
    const updatePrice = (dataStr: string) => {
      try {
        const data: StockPrice = JSON.parse(dataStr);
        setStockPrice(data);
      } catch (err) {
        console.error("데이터 파싱 실패:", err);
      }
    };

    // 최초 현재가 (기본 message 이벤트)
    eventSource.onmessage = (e: MessageEvent) => {
      updatePrice(e.data);
    };

    /**
     * [CodeRabbit 지적 반영 1] 타입 안정성 확보
     * 커스텀 이벤트 핸들러에서는 e가 Event 타입으로 추론되므로 
     * MessageEvent인지 확인하는 타입 가드가 필요합니다.
     */
    eventSource.addEventListener('realtime-price', (e: Event) => {
      if (e instanceof MessageEvent) {
        updatePrice(e.data);
      }
    });

    /**
     * [CodeRabbit 지적 반영 2] 자동 재연결 보존
     * onerror에서 close()를 호출하면 브라우저의 자동 재시도 로직이 멈춥니다.
     * 에러 로그만 찍고 브라우저가 스스로 재연결하게 둡니다.
     */
    eventSource.onerror = (e) => {
      console.warn("SSE 연결 일시적 오류. 재연결을 시도합니다.", e);
    };

    // 3. Clean-up: 티커가 바뀌거나 컴포넌트가 사라질 때만 연결을 완전히 닫습니다.
    return () => {
      eventSource.close();
    };
  }, [ticker]);

  return stockPrice;
}