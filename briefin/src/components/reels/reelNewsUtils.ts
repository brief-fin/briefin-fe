import type { ReelNews } from '@/types/reelNews';

export function findReelIndexByRelatedTitle(reels: ReelNews[], title: string): number {
  return reels.findIndex((r) => r.relatedNews.some((rn) => rn.title === title));
}
