import { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://192.168.2.105:3070')

const App = () => {
	const [message, setMessage] = useState('')
	const [chat, setChat] = useState([])
	const handleMessage = () => {
		const d = new Date()
		socket.emit('sendMessage', { message: message, id: socket.id, date: d })
		setMessage('')
	}
	useEffect(() => {
		socket.on('receiveMessage', (data) => {
			console.log(data)
			setChat((prev) => [...prev, data])
		})
		return () => {
			socket.off('receiveMessage')
		}
	}, [socket])
	return (
		<div>
			<input
				type='text'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button onClick={() => handleMessage()}>message</button>
			<div>
				{chat.map((chat, index) => (
					<div key={index}>{chat.date} / {chat.id} / {chat.message}</div>
				))}
			</div>
		</div>
	)
}

export default App
