import { useState, useEffect } from 'react'
import { Textarea, Button } from 'flowbite-react'
import io from 'socket.io-client'
import { textareaThemeConfig, buttonThemeConfig } from '../configs/theme.js'

const socket = io.connect('http://192.168.2.105:3070')

const Chat = () => {
	const [message, setMessage] = useState('')
	const [chat, setChat] = useState([])
	const handleMessage = () => {
		const d = new Date()
		socket.emit('sendMessage', { message: message, id: socket.id, date: d })
		// setMessage('')
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
		<>
			<div className='flex flex-col h-dvh'>
				<div className='flex flex-col p-7 border border-red-600'>
					<div className='flex flex-col mb-3 h-[600px] border border-red-600 overflow-scroll'>
						{chat.map((chat, index) => (
							<div key={index}>
								{chat.date} / {chat.id} / {chat.message}
							</div>
						))}
					</div>
					<div className='flex mx-auto border border-red-600 w-2/4 gap-4 p-3'>
						<Textarea
							theme={textareaThemeConfig}
							value={message}
							rows={5}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<Button
							theme={buttonThemeConfig}
							onClick={() => handleMessage()}
						>
							message
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Chat
