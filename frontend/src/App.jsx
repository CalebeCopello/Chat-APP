import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import axios from 'axios'
function App() {
	axios.defaults.baseURL = 'http://localhost:3077'
	axios.defaults.withCredentials = true
	return (
		<>
			<div className='bg-bg0_lm'>
				<BrowserRouter>
					<Routes>
						<Route
							path='/'
							element={<SignUp />}
						/>
						<Route
							path='/signin'
							element={<SignIn />}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		</>
	)
}

export default App
