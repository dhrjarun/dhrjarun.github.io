/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    container: {
      padding: '1rem',
      center: true,
    },

    extend: {},
  },
  plugins: [],
};

// screens: {
// 	sm: '640px',
// 	md: '768px',
// 	lg: '1024px',
// 	xl: '1280px',
// 	'2xl': '1536px',
// },
