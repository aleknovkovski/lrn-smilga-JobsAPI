const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

async function register(req, res) {
    const user = await User.create({...req.body})
    const token = jwt.sign({userId: user._id.toString(), name: user.name}, 'jwtSecret')
    res.status(StatusCodes.CREATED).json({message: 'Register route', submitted: req.body, user, user: { name: user.name }, token } )
}

async function login(req, res) {
    res.send('Login route')
}

module.exports = {
    register,
    login
}