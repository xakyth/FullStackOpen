import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { darkTheme } from './styles/themes'
import { GlobalStyles } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={darkTheme}>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles
          styles={{
            body: { backgroundColor: 'lightyellow' },
          }}
        ></GlobalStyles>
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
)
