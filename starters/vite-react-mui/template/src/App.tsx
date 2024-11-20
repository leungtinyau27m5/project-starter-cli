import { CssBaseline, ThemeProvider } from '@mui/material'

import theme from './mui-theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>App Ready</h1>
    </ThemeProvider>
  )
}

export default App
