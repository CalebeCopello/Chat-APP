import { TextInput, Button } from 'flowbite-react'
import { buttonThemeConfig, textInputThemeConfig } from '../configs/theme'
import { useState } from 'react'

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
	return (
		<>
			<div className='h-screen flex items-center '>
				<form
					action=''
					className='w-64 mx-auto mb-12'
				>
					<TextInput
						theme={textInputThemeConfig}
						className='mb-2'
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        placeholder='username'
					></TextInput>
					<TextInput
						theme={textInputThemeConfig}
						className='mb-2'
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder='password'
					></TextInput>
					<Button
						theme={buttonThemeConfig}
						className='mb-2 w-full'
					>
						Registrar
					</Button>
				</form>
			</div>
		</>
	)
}

export default Register
