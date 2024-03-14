/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Button, TextInput } from 'flowbite-react'

const Header = ({ socket }) => {
	const [user, setUser] = useState('')
	const [nick, setNick] = useState('')
    const [totalUsers, setTotalUsers] = useState('')

	const handleChangeUsername = (e) => {
		e.preventDefault
		if (e == '') {
			return
		}
		setNick(e)
	}
    const handleChangeUsernameSubmit = () => {
        socket.emit('changeNick', nick)
    }

	useEffect(() => {
		socket.on('userId', (data) => {
			setUser(data)
		})
        socket.on('usersUpdate', (data) => {
            setTotalUsers(data)
        })
	}, [socket])
	return (
		<header className='border border-yellow-600'>
			<div className=''>
				<form>
					<TextInput
						value={nick}
                        placeholder={user}
						onChange={(e) => handleChangeUsername(e.target.value)}
					/>
                    <Button onClick={handleChangeUsernameSubmit}>Alterar</Button>
				</form>
			</div>
            <div className="">
                Total de Usuários: {Object.keys(totalUsers).length}
            </div>
		</header>
	)
}

export default Header
