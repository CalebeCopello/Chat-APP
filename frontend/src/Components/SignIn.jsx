import { TextInput, Button, Alert, Spinner } from 'flowbite-react'
import { buttonThemeConfig, textInputThemeConfig } from '../configs/theme'
import { useState } from 'react'
import axios from 'axios'
import { signInStart, signInSuccess, signInFailure } from '../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'

function SignIn() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const {loading, error} = useSelector(state => state.user)
	const dispatch = useDispatch()
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!email || !password) {
			return dispatch(signInFailure('Todos os campos devem ser preenchidos'))
		}
		dispatch(signInStart())
		try {
			const data = await axios.post('/api/auth/signin', { email, password })
			console.log(data.data.rest)
			dispatch(signInSuccess(data.data.rest))
		} catch (err) {
			const errorMessageHTML = err.response.data
			const errorMatch = errorMessageHTML.match(/Error: (.*?)(?=<br>)/)
			const errorMessage = errorMatch ? errorMatch[1] : 'Erro desconhecido'
			console.log(err.response.data)
			console.log(errorMessage)
			dispatch(signInFailure(errorMessage))
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
				</form>
			</div>
		</>
	)
}

export default SignIn
