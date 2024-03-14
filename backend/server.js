const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
	cors: {
		origin: [
			'http://127.0.0.1:5155',
			'http://localhost:5155',
			'http://192.168.2.105:5155',
		],
	},
})
const PORT = process.env.PORT || 3070

app.use(cors())

const chatLog = []
const users = {}

io.on('connection', (socket) => {
	const changeUsers = () => {
		for (let i = 0; i < chatLog.length; i++) {
			Object.keys(users).forEach((key) => {
				if (key === chatLog[i].id) {
					chatLog[i].id = users[key]
				}
			})
		}
	}
	users[socket.id] = socket.id
	socket.emit('userId', socket.id)
	io.emit('usersUpdate', users)
	if (chatLog.length > 0) {
		socket.emit('chatLog', chatLog)
	}
	// console.log('users:', users)
	socket.on('sendMessage', (data) => {
		io.emit('receiveMessage', data)
		if (chatLog.length > 5) {
			chatLog.pop()
		}
		chatLog.unshift(data)
		changeUsers()
		// console.log(chatLog)
	})

	socket.on('changeNick', (data) => {
		users[socket.id] = data
		changeUsers()
		io.emit('usersUpdate', users)
		io.emit('updateMessage', chatLog)
	})

	socket.on('disconnect', () => {
		// console.log(`User Disconnected: ${socket.id}`)
		delete users[socket.id]
		io.emit('usersUpdate', users)
	})
})

httpServer.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
	res.send('Hello there!')
})
