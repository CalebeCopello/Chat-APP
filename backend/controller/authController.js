import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import errorHandler from '../utils/errorHandler.js'

const signup = async (req, res, next) => {
	const { username, email, password } = req.body
	const usernameTrimmed = username ? username.trim() : username
	const emailTrimmed = email ? email.trim() : email

	if (
		!username ||
		!email ||
		!password ||
		usernameTrimmed === '' ||
		emailTrimmed === '' ||
		password == ''
	) {
		next(errorHandler(400, 'Todos os campos devem ser preenchidos'))
	}
	//TODO: encrypt password
	const newUser = new User({
		username: usernameTrimmed,
		email: emailTrimmed,
		password,
	})
	try {
		await newUser.save()
		res.json({ message: `${usernameTrimmed} cadastrado com sucesso` })
	} catch (error) {
		res.status(500).json({ message: `Erro: ${error}` })
		next(error)
	}
}

const signin = async (req, res, next) => {
	const { email, password } = req.body
	const emailTrimmed = email ? email.trim() : email
    if (email === emailTrimmed) {
        console.log('same')
    }
    console.log(emailTrimmed, email, password)
	if (!emailTrimmed || !password || emailTrimmed === '' || password === '') {
		next(errorHandler(400, 'Todos os campos devem ser preenchidos'))
	}
	try {
		const validUSer = await User.findOne({ email: emailTrimmed })
		if (!validUSer) {
			return next(errorHandler(400, 'Email ou senha incorretos'))
		}
		//TODO: decrypt password
		if (password !== validUSer.password) {
			return next(errorHandler(400, 'Email ou senha incorretos'))
		}
		const token = jwt.sign({ id: validUSer._id }, process.env.JWT_SECRET, {
			expiresIn: '30 days',
		})
		const { password: psw, ...rest } = validUSer._doc
		res.status(200).cookie('access_token', token, { httpOnly: true }).json({rest})
	} catch (error) {
        next(error)
    }
}

export { signup, signin }
