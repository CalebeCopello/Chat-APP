import Register from './Components/Register'
import axios from 'axios'
function App() {
	axios.defaults.baseURL = 'http://localhost:3077'
	axios.defaults.withCredentials = true
	return (
		<>
			<div className='bg-bg0_lm'>
				<Register />
			</div>
		</>
	)
}

export default App
