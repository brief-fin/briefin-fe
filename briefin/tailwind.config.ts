import type { Config } from 'tailwindcss';

const pxToRem = (px: number, base = 16) => `${px / base}rem`;

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* spacing */
      spacing: Array.from({ length: 1000 }, (_, index) => {
        const value = pxToRem(index + 1);
        return { [`${index + 1}pxr`]: value };
      }).reduce((acc, obj) => ({ ...acc, ...obj }), {}),

      /* color system */
      colors: {
        primary: {
          DEFAULT: '#2C4A8F',
          dark: '#1A3270',
          light: '#F5F0E8',
          mid: '#E0D8C8',
        },

        text: {
          primary: '#1A1D1F',
          secondary: '#4B5563',
          muted: '#9CA3AF',
        },

        surface: {
          bg: '#F5F6F8',
          border: '#E5E7EB',
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
        'hero-badge': '0 2px 12px rgba(44,74,143,0.20)',
        'stat-chip': '0 2px 12px rgba(0,0,0,0.06)',
        'hero-card': '0 4px 24px rgba(0,0,0,0.06)',
        'result-hover': '0 4px 16px rgba(44,74,143,0.10)',
        'news-hover': '0 6px 28px rgba(0,0,0,0.08)',
        autocomplete: '0 8px 24px rgba(0,0,0,0.10)',
        modal: '0 20px 60px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
