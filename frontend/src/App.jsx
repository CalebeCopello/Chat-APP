/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Chat from './screens/Chat.jsx'
import io from 'socket.io-client'

const socket = io.connect('http://192.168.2.105:3070')

const App = () => {
	const [users, setUsers] = useState()
	useEffect(() => {
		socket.on('usersUpdate', (data) => {
            setUsers(data)
        })
		return () => {
			socket.off('usersUpdate')
		}
	}, [socket])
	return (
		<>
			<Header socket={socket} users={users} />
			<Chat socket={socket} users={users} />
		</>
	)
}

export default App
