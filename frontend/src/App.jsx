import { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3070')

const App = () => {
  const handleMessage = () => {
    socket.emit()
  }
	return <div>
  <input type="text" />
  <button onClick={handleMessage}>message</button>
  </div>
}

export default App
