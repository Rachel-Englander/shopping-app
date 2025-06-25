import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store.ts'

// יצירת cache ל-RTL
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
})

// יצירת theme עם RTL
const theme = createTheme({
  direction: 'rtl',
})

document.body.dir = 'rtl'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}> {/* עוטף את כל האפליקציה ב-Provider */}
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  </Provider>
  // </React.StrictMode>
)
