const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
	cors: {
		origin: ['http://127.0.0.1:5155', 'http://localhost:5155', 'http://192.168.2.105:5155'],
	},
})
const PORT = process.env.PORT || 3070

app.use(cors())


io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`)
    socket.on('sendMessage', (data) => {
        socket.emit('receiveMessage', data)
        socket.broadcast.emit('receiveMessage', data)
    })
})

httpServer.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
	res.send('Hello there!')
})
