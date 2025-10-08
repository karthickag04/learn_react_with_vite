import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Create from './Create.jsx'
import SelectData from './SelectData.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}

    <div className="app-container">
      <Create />
      <SelectData />
    </div>
  </StrictMode>,
)
