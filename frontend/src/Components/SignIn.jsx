import { TextInput, Button, Alert, Spinner } from 'flowbite-react'
import { buttonThemeConfig, textInputThemeConfig } from '../configs/theme'
import { useState } from 'react'
import axios from 'axios'

function SignIn() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const [loading, setLoading] = useState(false)
	const handleSubmit = async (e) => {
		setError('')
		setSuccess('')
		e.preventDefault()
		if (!email || !password) {
			return setError('Todos os campos devem ser preenchidos')
		}
		try {
			setLoading(true)
			await axios.post('/api/auth/signin', { email, password })
			setError('')
		} catch (err) {
			console.log(err)
		} finally {
			setLoading(false)
		}
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
						type='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						placeholder='Email'
					></TextInput>
					<TextInput
						theme={textInputThemeConfig}
						className='mb-2'
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						placeholder='Senha'
					></TextInput>
					<Button
						theme={buttonThemeConfig}
						className='mb-2 w-full'
						onClick={handleSubmit}
						disabled={loading}
					>
						{' '}
						{loading ? <Spinner></Spinner> : 'Registrar'}
					</Button>
					{error && <Alert color='failure'>{error}</Alert>}
					{success && <Alert>{success}</Alert>}
				</form>
			</div>
		</>
	)
}

export default SignIn
