import { TextInput, Button } from 'flowbite-react'
import { buttonThemeConfig, textInputThemeConfig } from '../configs/theme'
import { useState } from 'react'
import axios from 'axios'

function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
	const handleSubmit = async (e) => {
		e.preventDefault()
		await axios.post('/api/auth/signup', {username, email, password})
	}
	return (
		<>
			<div className='h-screen flex items-center '>
				<form
					onSubmit={handleSubmit}
					className='w-64 mx-auto mb-12'
				>
					<TextInput
						theme={textInputThemeConfig}
						className='mb-2'
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        placeholder='Username'
					></TextInput>
					<TextInput
						theme={textInputThemeConfig}
						className='mb-2'
                        type='email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        placeholder='Email'
					></TextInput>
					<TextInput
						theme={textInputThemeConfig}
						className='mb-2'
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder='Password'
					></TextInput>
					<Button
						theme={buttonThemeConfig}
						className='mb-2 w-full'
						onClick={handleSubmit}
					>
						Registrar
					</Button>
				</form>
			</div>
		</>
	)
}

export default Register
