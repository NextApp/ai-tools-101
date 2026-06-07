export const GA4_MEASUREMENT_ID = 'G-4DXBJ5C3K5';

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/AI_Tools_101',
  x: 'https://x.com/AI_Tools_101',
  pinterest: 'https://pinterest.com/AIToolGuide',
  github: 'https://github.com/NextApp/ai-tools-101',
  youtube: 'https://youtube.com/@AIToolGuide',
} as const;

export const UTM_PARAMS = {
  mediumSocial: 'utm_medium=social',
};

export function buildUtmUrl(baseUrl: string, source: string, campaign: string = 'site_launch'): string {
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}utm_source=${encodeURIComponent(source)}&utm_medium=social&utm_campaign=${encodeURIComponent(campaign)}`;
}

export function socialUrl(platform: keyof typeof SOCIAL_LINKS, campaign?: string): string {
  return buildUtmUrl(SOCIAL_LINKS[platform], platform, campaign);
}
