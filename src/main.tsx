import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import LoaderGate from './components/LoaderGate';
import './index.css'

// Kick off the chunk download immediately so it happens during the loader,
// not after it.
const appModule = import("./App.tsx");
const App = lazy(() => appModule);

// LoaderGate owns the only loader on screen. A Loader fallback here would
// mount a second full-screen loader over the expanding one and flash its glow.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoaderGate duration={2000} expandDuration={2200}>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </LoaderGate>
  </StrictMode>,
)
