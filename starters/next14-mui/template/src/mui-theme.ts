'use client'

import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const cssVarsTheme = responsiveFontSizes(
  createTheme({
    cssVariables: true,
    spacing: 4,

    palette: {
      primary: {
        main: '#05a081',
      },
      secondary: {
        main: '#000',
      },
    },

    typography: {
      fontFamily: plusJakartaSans.style.fontFamily,
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },

      MuiIcon: {
        defaultProps: {
          baseClassName: 'material-symbols-rounded',
        },
      },
    },
  }),
)

export default cssVarsTheme