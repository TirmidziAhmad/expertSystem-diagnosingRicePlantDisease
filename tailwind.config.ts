import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#352802',
        beige: '#BEAA71',
        olive: '#9B8B5E',
        sand: '#A0977C',
        brick: '#8E342B',
        gold: '#C6A031',
        green: '#7CA086',
        blue: '#7187BE',
      },
    },
  },
  plugins: [],
} satisfies Config;
