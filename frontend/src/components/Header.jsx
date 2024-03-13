/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Button, TextInput } from 'flowbite-react'

const Header = ({ socket }) => {
	const [user, setUser] = useState('')
	const [nick, setNick] = useState('')

	const handleChangeUsername = (e) => {
		e.preventDefault
		if (e == '') {
			return
		}
		setNick(e)
	}
    const handleChangeUsernameSubmit = () => {
        
    }

	useEffect(() => {
		socket.on('userId', (data) => {
			setUser(data)
		})
	})

	return (
		<header className='border border-yellow-600'>
			<div className=''>
				<form>
					<TextInput
						value={user}
						onChange={(e) => handleChangeUsername(e.target.value)}
					/>
                    <Button onClick={handleChangeUsernameSubmit}>Alterar</Button>
				</form>
			</div>
		</header>
	)
}

export default Header
