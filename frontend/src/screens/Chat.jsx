/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { TextInput, Button } from 'flowbite-react'
import { textInputThemeConfig, buttonThemeConfig } from '../configs/theme.js'

const Chat = ({ socket }) => {
	const [message, setMessage] = useState('')
	const [chat, setChat] = useState([])
	const handleMessage = () => {
		const d = new Date()
		socket.emit('sendMessage', { message: message, id: socket.id, date: d })
		setMessage('')
	}
	useEffect(() => {
		socket.on('chatLog', (data) => {
			const chatLog = data.reverse()
			console.log(chatLog)
			setChat(chatLog)
		})
		socket.on('receiveMessage', (data) => {
			setChat((prev) => [data, ...prev])
			console.log('receiveMessage')
		})
		return () => {
			socket.off('receiveMessage')
		}
	}, [socket])
	console.log(chat)
	return (
		<>
			<div className='flex flex-col m-auto w-full max-w-screen-lg'>
				<div className='flex flex-col w-full max-w-screen-lg p-3 mt-7 border border-red-600'>
					<div className='flex mb-3 h-[600px] flex-col-reverse border border-red-600 overflow-scroll'>
						{chat.map((chat, index) => (
							<div key={index}>
								{chat.date} / {chat.id} / {chat.message}
							</div>
						))}
					</div>
					<div className='flex w-full max-w-screen-lg mx-auto border border-green-600 gap-4 p-3 '>
						<TextInput
							theme={textInputThemeConfig}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className='resize-none'
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
