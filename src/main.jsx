import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import AppRouter from './router/AppRouter.jsx'
import { Provider } from 'react-redux'
import store from './store/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
      <AppRouter />
      </Provider>
    </AuthContextProvider>
  </StrictMode>,
)
