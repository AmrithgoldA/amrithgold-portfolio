import './index.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import ReactGA from "react-ga4";
import { ModalProvider } from './context/ModalProvider';
import { lazy, Suspense, useEffect } from 'react';
import { whenIdle } from './lib/whenIdle';

// Preloaded like App in main.tsx, so it is ready before LoaderGate reveals the page.
const portfolioModule = import("./components/Portfolio");
const Portfolio = lazy(() => portfolioModule);

function App() {

	// Analytics pulls in a large third-party script, so keep it off the first screen's critical path
	useEffect(() => whenIdle(() => {
		ReactGA.initialize(import.meta.env.VITE_GOOGLE_MEASUREMENT_ID);
		ReactGA.send({ hitType: "pageview", page: window.location.pathname });
	}, 4000), []);

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
