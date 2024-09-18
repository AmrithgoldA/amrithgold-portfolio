import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { lazy } from 'react';
const App = lazy(() => import("./App.tsx"));
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
