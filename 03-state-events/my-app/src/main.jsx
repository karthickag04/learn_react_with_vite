import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BasicEffect from './BasicEffect'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <BasicEffect /> */}
  </StrictMode>,
)
