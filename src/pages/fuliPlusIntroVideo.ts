export interface FuliPlusIntroVideoProfile {
  viewportWidth: number;
  deviceMemoryGb?: number;
  hardwareConcurrency?: number;
  saveData?: boolean;
}

export type FuliPlusIntroVideoResolution = '540p' | '720p';

export function chooseFuliPlusIntroVideoResolution({
  viewportWidth,
  deviceMemoryGb,
  hardwareConcurrency,
  saveData,
}: FuliPlusIntroVideoProfile): FuliPlusIntroVideoResolution {
  if (saveData) return '540p';
  if (viewportWidth <= 768) return '540p';
  if (typeof deviceMemoryGb === 'number' && deviceMemoryGb <= 4) return '540p';
  if (typeof hardwareConcurrency === 'number' && hardwareConcurrency <= 4) return '540p';
  return '720p';
}
