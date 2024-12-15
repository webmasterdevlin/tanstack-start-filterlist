import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  safelist: [
    'bg-primary',
    'bg-primary-dark',
    'bg-primary-darker',
    'bg-accent-grayblue',
    'bg-accent-purple',
    'bg-gray',
    'dark:bg-white',
    'dark:bg-primary-light',
    'dark:bg-primary-lighter',
    'dark:bg-accent-grayblue-light',
    'dark:bg-accent-purple-light',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          grayblue: {
            DEFAULT: '#6A7DC2',
            dark: '#4E62A5',
          },
          purple: {
            DEFAULT: '#7C23FA',
            dark: '#6A1BFF',
          },
        },
        gray: {
          DEFAULT: '#9CA3AF',
          dark: '#374151',
          light: '#E5E7EB',
        },
        primary: {
          DEFAULT: '#2457FA',
          dark: '#1D47CF',
          darker: '#142F8B',
          light: '#BECDFF',
          lighter: '#DFE7FF',
        },
      },
    },
  },
};
export default config;
