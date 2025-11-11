import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.tsx'

if (typeof __APP_COMMIT_INFO__ !== 'undefined') {
  console.info(`Build commit: ${__APP_COMMIT_INFO__}`)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
