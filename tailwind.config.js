/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    // transform: [

    // ]
  },
  darkMode: "selector",

  theme: {
    fontFamily: {
      sans: ["Urbit Sans"],
      mono: ["Urbit Sans", { fontVariationSettings: '"xtab" 500' }],
      serif: ["Urbit Serif Italic"],
      // 'mono': ["...", 'Courier New', 'monospace', 'mono'],
      "custom-font": ["custom font", "Courier New", "monospace", "mono"],
      variable: [
        "variable",
        {
          fontFeatureSettings: '"ss01"',
          // fontVariationSettings: '"opsz" 32'
        },
      ],
    },
    screens: {
      xs: "380px",
      sm: "640px",
      md: "768px",
      lg: "900px",
      xl: "1288px",
      "2xl": "1536px",
      "3xl": "1900px",
    },
    extend: {
      spacing: {
        "12px": ".75rem",
        "18px": "1rem",
        "20px": "1.11rem",
        "21px": "1.3125rem",
        "28px": "1.55",
        header: "var(--header-height)",
        "footer-height": "var(--footer-height)",
      },
      letterSpacing: {
        "02": "0.024em",
        "01": "0.01%",
      },
      borderRadius: {
        "5px": ".3125rem",
        "16px": "1rem",
      },
      fontSize: {
        "16px": "1rem",
        "20px": "1.25rem",
        "21px": "1.3125rem",
        "25px": "1.5625rem",
        "40px": "2.5rem",
      },
      lineHeight: {
        100: "100%",
        120: "120%",
        // "130": "130%",
      },
      transitionTimingFunction: {
        springy: "var(--ease-springy)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        black: "var(--background)",
        white: "var(--foreground)",
        gray: {
          "5a": "#5a5a55",
          87: "#878787",
          d9: "#d9d9d9",
          f5: "#f5f5f5",
        },
        white: "var(--foreground)",
        "off-white": "var(--off-white)",
      },
    },
  },
  plugins: [],
};
