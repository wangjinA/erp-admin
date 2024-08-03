/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // 启用暗黑模式
  // darkMode: 'media', // 根据媒体查询切换暗黑模式
  theme: {
    extend: {
      colors: {
        white: 'var(--color-menu-light-bg)',
        'neutral-1': 'var(--color-neutral-1)',
        'neutral-2': 'var(--color-neutral-2)',
        'neutral-3': 'var(--color-neutral-3)',
        'neutral-4': 'var(--color-neutral-4)',
        'neutral-5': 'var(--color-neutral-5)',
        'neutral-6': 'var(--color-neutral-6)',
        'neutral-7': 'var(--color-neutral-7)',
        'neutral-8': 'var(--color-neutral-8)',
        'neutral-9': 'var(--color-neutral-9)',
        'neutral-10': 'var(--color-neutral-10)',
        bg: {
          // 1: 'var(--color-bg-1)',
          // 2: 'var(--color-bg-2)',
          // 3: 'var(--color-bg-3)',
          // 4: 'var(--color-bg-4)',
          // 5: 'var(--color-bg-5)',
          white: 'var(--color-bg-2)',
        },
        // // 文字颜色
        // text: {
        //   1: 'var(--color-text-1)',
        //   2: 'var(--color-text-2)',
        //   3: 'var(--color-text-3)',
        //   4: 'var(--color-text-4)',
        // },
      },
    },
  },
  plugins: [],
};
