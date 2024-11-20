import { createTheme, responsiveFontSizes } from '@mui/material'

const theme = responsiveFontSizes(
  createTheme({
    cssVariables: true,
    palette: {
      primary: { main: '#556cd6' },
    },
  }),
)

export default theme
