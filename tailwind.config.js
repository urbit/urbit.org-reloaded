/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      // 'mono': ["...", 'Courier New', 'monospace', 'mono'],
      'custom-font': ["custom font", 'Courier New', 'monospace', 'mono'],
      'variable': [
        "variable",
        {
          fontFeatureSettings: '"ss01"',
          // fontVariationSettings: '"opsz" 32'
        },
      ],
    },
    extend: {
      spacing: {
        '16px': '1rem',
        '20px': '1.25rem',
        '28px': '1.75rem',
        'header': 'var(--header-height)',
      },
      borderRadius: {
        '16px': '1rem',
      },
      fontSize: {
        '16px': '1rem',
        '20px': '1.25rem',
      },
      lineHeight: {
        "100": "100%",
        "120": "120%",
        // "130": "130%",
      },
      transitionTimingFunction: {
        'springy': "var(--ease-springy)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "gray": {
          "87": "#878787",
        },
        "off-white": "var(--off-white)", 
      }
    },
  },
  plugins: [],
};

