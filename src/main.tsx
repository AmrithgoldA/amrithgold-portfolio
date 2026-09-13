import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import Loader from './components/Loader';
import LoaderGate from './components/LoaderGate';
import './index.css'

// Kick off the chunk download immediately so it happens during the loader,
// not after it.
const appModule = import("./App.tsx");
const App = lazy(() => appModule);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoaderGate duration={3000} expandDuration={2200}>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </LoaderGate>
  </StrictMode>,
)
