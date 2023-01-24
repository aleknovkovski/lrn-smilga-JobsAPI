const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

async function register(req, res) {
    const {name, email, password} = req.body

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const tempUser = {name, email, password: hashedPassword}

    const user = await User.create({...tempUser})
    res.status(StatusCodes.CREATED).json({message: 'Register route', submitted: req.body, user} )
}

async function login(req, res) {
    res.send('Login route')
}

module.exports = {
    register,
    login
}