module.exports = {
  theme: {
    purge: {
      content: [
        './src/components/**/*',
        './src/pages/**/*',
        './src/models/**/*',
      ],
      options: {
        whitelist: ['bg-red-500', 'px-4'],
        whitelistPatternsChildren: [/carousel/, /html/],
      },
    },
    screens: {
      sm: '640px',
      md: '960px',
      lg: '1280px',
      xl: '1600px',
    },
    container: {
      center: true,
      padding: {
        default: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    extend: {
      colors: {
        themeGray: {
          default: 'EDEFF0',
          100: '#f5f5f5',
          200: '#f2f2f2',
          300: '#c0c0c0',
          400: '#e3e3e3',
          500: '#808080',
          600: '#555555',
          700: '#444444',
          800: '#333333',
        },
      },
    },
  },
  variants: {
    borderWidth: ['responsive', 'hover', 'focus', 'last'],
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
