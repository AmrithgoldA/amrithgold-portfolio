import './index.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import ReactGA from "react-ga4";
import { ModalProvider } from './context/ModalProvider';
import { lazy, Suspense } from 'react';

// Preloaded like App in main.tsx, so it is ready before LoaderGate reveals the page.
const portfolioModule = import("./components/Portfolio");
const Portfolio = lazy(() => portfolioModule);

ReactGA.initialize(import.meta.env.VITE_GOOGLE_MEASUREMENT_ID);

function App() {

	ReactGA.send({ hitType: "pageview", page: window.location.pathname});

	return (
		<>
			<BrowserRouter>
				<ModalProvider>
					{/* no Loader fallback - LoaderGate already shows the only loader */}
					<Suspense fallback={null}>
						<Routes>
							<Route path='/' element={<Portfolio/>}/>
						</Routes>
					</Suspense>
				</ModalProvider>
			</BrowserRouter>
		</>
	)
}

export default App
