/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2979FF",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FF80AB",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#FF6D00",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'first': 'first 8s infinite',
        'second': 'second 8s infinite',
        'third': 'third 8s infinite',
        'fourth': 'fourth 8s infinite',
        'fifth': 'fifth 8s infinite',
        'meteor-effect': 'meteor 5s linear infinite',
        "text-shimmer": "text-shimmer 2.5s ease-out infinite alternate",
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'first': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-50px, 50px) scale(1.2)' },
          '66%': { transform: 'translate(50px, -50px) scale(0.8)' },
          '100%': { transform: 'translate(0, 0) scale(1)' }
        },
        'second': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(50px, -50px) scale(1.2)' },
          '66%': { transform: 'translate(-50px, 50px) scale(0.8)' },
          '100%': { transform: 'translate(0, 0) scale(1)' }
        },
        'third': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-50px, -50px) scale(1.2)' },
          '66%': { transform: 'translate(50px, 50px) scale(0.8)' },
          '100%': { transform: 'translate(0, 0) scale(1)' }
        },
        'fourth': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(50px, 50px) scale(1.2)' },
          '66%': { transform: 'translate(-50px, -50px) scale(0.8)' },
          '100%': { transform: 'translate(0, 0) scale(1)' }
        },
        'fifth': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-50px, 50px) scale(1.2)' },
          '66%': { transform: 'translate(50px, -50px) scale(0.8)' },
          '100%': { transform: 'translate(0, 0) scale(1)' }
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
        "text-shimmer": {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};