import './index.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Portfolio from './components/Portfolio'
import ReactGA from "react-ga4";

ReactGA.initialize(import.meta.env.VITE_GOOGLE_MEASUREMENT_ID);

function App() {

	ReactGA.send({ hitType: "pageview", page: window.location.pathname});

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Portfolio/>}/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
