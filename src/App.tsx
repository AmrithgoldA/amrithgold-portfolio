import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Portfolio from './components/Portfolio'

function App() {

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
