import type { Config } from 'tailwindcss';

const pxToRem = (px: number, base = 16) => `${px / base}rem`;

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/mocks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* spacing */
      spacing: Array.from({ length: 1800 }, (_, index) => {
        const value = pxToRem(index + 1);
        return { [`${index + 1}pxr`]: value };
      }).reduce((acc, obj) => ({ ...acc, ...obj }), {}),

      /* color system */
      colors: {
        primary: {
          DEFAULT: '#1E3A8A',
          dark: '#1E40AF',
          light: '#DBEAFE',
          mid: '#BFDBFE',
          accent: '#BFDBFE',
          subtle: '#EFF6FF',
        },

        text: {
          primary: '#111827',
          secondary: '#4B5563',
          sub: '#6B7280',
          muted: '#9CA3AF',
          divider: '#D1D5DB',
        },

        surface: {
          bg: '#F3F4F6',
          cream: '#FDFBF7',
          border: '#F1F5F9',
          white: '#FFFFFF',
        },

        semantic: {
          red: '#EF4444',
          blue: '#3B82F6',
          yellow: '#FBBF24',
          neutral: '#6B7280',
          teal: '#2EC49A',
        },

        reels: {
          bg: '#0E1420',
          glass: 'rgba(255,255,255,0.10)',
        },
      },

      /* border radius */
      borderRadius: {
        badge: '6px',
        nav: '8px',
        button: '10px',
        summary: '12px',
        input: '14px',
        card: '16px',
        hero: '20px',
        modal: '24px',
        pill: '100px',
      },

      /* shadows */
      boxShadow: {
        'hero-badge': '0 2px 12px rgba(30,58,138,0.20)',
        'stat-chip': '0 2px 12px rgba(0,0,0,0.06)',
        'hero-card': '0 4px 24px rgba(0,0,0,0.06)',
        'result-hover': '0 4px 16px rgba(30,58,138,0.10)',
        'news-hover': '0 6px 28px rgba(0,0,0,0.08)',
        autocomplete: '0 8px 24px rgba(0,0,0,0.10)',
        modal: '0 20px 60px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
