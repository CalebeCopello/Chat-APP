import Header from './components/Header.jsx'
import Chat from './screens/Chat.jsx'
import io from 'socket.io-client'

const socket = io.connect('http://192.168.2.105:3070')

const App = () => {
	return (
		<>
			<Header socket={socket} />
			<Chat socket={socket} />
		</>
	)
}

export default App
