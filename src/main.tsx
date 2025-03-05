import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <Toaster richColors position="top-center" />
      <App />
    </NextUIProvider>
  </StrictMode>,
)
