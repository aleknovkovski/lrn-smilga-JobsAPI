const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')

async function register(req, res) {
    const user = await User.create({...req.body})
    res.status(StatusCodes.CREATED).json({message: 'Register route', submitted: req.body, user} )
}

async function login(req, res) {
    res.send('Login route')
}

module.exports = {
    register,
    login
}