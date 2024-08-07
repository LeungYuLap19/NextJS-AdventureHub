import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        '3xl': '2250px',
        'xsm': '514px',
      },
      dropShadow: {
        default: '0px 0px 8px rgba(0, 0, 0, 0.10)'
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        ubuntu: ['var(--font-ubuntu)'],
      },

      maxWidth: {
        'details-custom': 'calc((100vh - 136px) * 0.7)'
      },
      maxHeight: {
        'details-custom': 'calc(100vh - 136px)',
        'planner-details-custom': 'calc(100vh - 126px)'
      },
      height: {
        'details-custom': 'calc(100vh - 136px)',
        'planner-details-custom': 'calc(100vh - 126px)'
      },
      
      colors: {
        customGreen: {
          100: '#A3CF6B',
          200: '#4F9572',
          300: '#128C55',
          400: '#2A7144',
          500: '#052617',
        },
        customWhite: {
          100: '#F5F9FC',
          200: '#FFFFFF',
        },
        customBlack: {
          100: '#adb5bd',
          200: '#495057',
          300: '#212529',
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config