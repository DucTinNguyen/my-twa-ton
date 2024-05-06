import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from 'store/index.ts'

const manifestUrl =
  'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 3000
        }}
      />
    </TonConnectUIProvider>
  </Provider>
)
