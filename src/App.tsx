import './index.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Portfolio from './components/Portfolio'
import ReactGA from "react-ga4";
import { ModalProvider } from './context/ModalProvider';

ReactGA.initialize(import.meta.env.VITE_GOOGLE_MEASUREMENT_ID);

function App() {

	ReactGA.send({ hitType: "pageview", page: window.location.pathname});

	return (
		<>
			<BrowserRouter>
				<ModalProvider>
					<Routes>
						<Route path='/' element={<Portfolio/>}/>
					</Routes>
				</ModalProvider>
			</BrowserRouter>
		</>
	)
}

export default App
