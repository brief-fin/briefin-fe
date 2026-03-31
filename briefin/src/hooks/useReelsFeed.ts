'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { REELS_AUTO_ADVANCE_MS, REELS_SCROLL_DEBOUNCE_MS } from '@/constants/reels';
import type { ReelNews } from '@/types/reelNews';
import { scrapNews, deleteScrapNews } from '@/api/newsApi';

export function useReelsFeed(reels: ReelNews[]) {
  const router = useRouter();
  const feedRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const goToRef = useRef<(idx: number) => void>(() => {});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = reels.length;

  const [current, setCurrent] = useState(0);
  const [scrapped, setScrapped] = useState<Set<number>>(new Set());
  const [alerted, setAlerted] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState(0);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    timerRef.current = null;
    progressIntervalRef.current = null;
  }, []);

  const startProgress = useCallback(() => {
    clearTimers();
    setProgress(0);
    const start = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const pct = Math.min(((Date.now() - start) / REELS_AUTO_ADVANCE_MS) * 100, 100);
      setProgress(pct);
    }, 50);

    timerRef.current = setTimeout(() => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      const next = (currentRef.current + 1) % total;
      goToRef.current(next);
    }, REELS_AUTO_ADVANCE_MS);
  }, [clearTimers, total]);

  const goTo = useCallback(
    (idx: number) => {
      let next = idx;
      if (next < 0) next = total - 1;
      else if (next >= total) next = 0;

      currentRef.current = next;
      setCurrent(next);

      const el = feedRef.current;
      if (el) {
        const pageW = el.clientWidth;
        el.scrollTo({ left: pageW * next, behavior: 'smooth' });
      }

      startProgress();
    },
    [startProgress, total],
  );

  useEffect(() => {
    goToRef.current = goTo;
  }, [goTo]);

  useEffect(() => {
    const tid = window.setTimeout(() => {
      startProgress();
    }, 0);
    return () => {
      window.clearTimeout(tid);
      clearTimers();
    };
  }, [clearTimers, startProgress]);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;

    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const w = feed.clientWidth;
        if (w <= 0) return;
        const idx = Math.round(feed.scrollLeft / w);
        const clamped = Math.max(0, Math.min(total - 1, idx));
        if (clamped !== currentRef.current) {
          currentRef.current = clamped;
          setCurrent(clamped);
          startProgress();
        }
      }, REELS_SCROLL_DEBOUNCE_MS);
    };

    feed.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      feed.removeEventListener('scroll', onScroll);
    };
  }, [startProgress, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        goTo(currentRef.current + 1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goTo(currentRef.current - 1);
      }
      if (e.key === 'Escape') router.back();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo, router]);

  const toggleScrap = useCallback(() => {
    const newsId = reels[currentRef.current]?.id;
    if (!newsId) return;

    const isScrapped = scrapped.has(newsId);

    setScrapped((prev) => {
      const s = new Set(prev);
      if (isScrapped) s.delete(newsId);
      else s.add(newsId);
      return s;
    });

    if (isScrapped) {
      deleteScrapNews(newsId).catch(() => setScrapped((p) => new Set(p).add(newsId)));
    } else {
      scrapNews(newsId).catch(() => {
        setScrapped((p) => { const ns = new Set(p); ns.delete(newsId); return ns; });
      });
    }
  }, [reels, scrapped]);

  const toggleAlert = useCallback(() => {
    setAlerted((prev) => {
      const s = new Set(prev);
      if (s.has(currentRef.current)) s.delete(currentRef.current);
      else s.add(currentRef.current);
      return s;
    });
  }, []);

  const reel = reels[current];

  return {
    feedRef,
    current,
    progress,
    goTo,
    reel,
    scrapped,
    alerted,
    toggleScrap,
    toggleAlert,
    reels,
  };
}
