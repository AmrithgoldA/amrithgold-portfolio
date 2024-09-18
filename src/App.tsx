import './index.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import ReactGA from "react-ga4";
import { ModalProvider } from './context/ModalProvider';
import { lazy, Suspense } from 'react';
const Portfolio = lazy(() => import("./components/Portfolio"));

ReactGA.initialize(import.meta.env.VITE_GOOGLE_MEASUREMENT_ID);

function App() {

	ReactGA.send({ hitType: "pageview", page: window.location.pathname});

	return (
		<>
			<BrowserRouter>
				<ModalProvider>
					<Suspense fallback = {<h1>...Loading</h1>}>
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
