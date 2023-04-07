import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import {LayoutContext} from "./LayoutContext/LayoutContext";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LayoutContext>
      <App />
    </LayoutContext>
  </React.StrictMode>,
)
