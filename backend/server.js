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

io.on('connection', (socket) => {
	console.log(`User Connected: ${socket.id}`)
	socket.emit('userId', socket.id)
	if (chatLog.length > 0) {
		socket.emit('chatLog', chatLog)
	}

	socket.on('sendMessage', (data) => {
		io.emit('receiveMessage', data)
		if (chatLog.length > 50) {
			chatLog.pop()
		}
		chatLog.unshift(data)
	})
})

httpServer.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
	res.send('Hello there!')
})
