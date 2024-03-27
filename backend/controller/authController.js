import User from '../models/userModel.js'
import jwt  from 'jsonwebtoken'
import errorHandler from '../utils/errorHandler.js'

const signup = async (req, res, next) => {
    const {username, email, password} = req.body
    const usernameTrimmed = username ? username.trim() : username
    const emailTrimmed = email ? email.trim() : email

    if (!username || !email || !password || usernameTrimmed === '' || emailTrimmed === '' || password == '') {
        next(errorHandler(400, 'Todos os campos devem ser preenchidos'))
    }
    //TODO: encrypt password
    const newUser = new User({
        username: usernameTrimmed,
        email: emailTrimmed,
        password
    })
    try {
        await newUser.save()
        res.json({message: `${usernameTrimmed} cadastrado com sucesso`})
    } catch (error) {
        next(error)
    }
}

export { signup }
