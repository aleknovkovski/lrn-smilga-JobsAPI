const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {BadRequestError, UnauthenticatedError} = require("../errors");

async function register(req, res) {
    const user = await User.create({...req.body})
    const token = jwt.sign({userId: user._id.toString(), name: user.name}, 'jwtSecret')
    res.status(StatusCodes.CREATED).json({
        message: 'Register route',
        submitted: req.body, user,
        user: { name: user.name },
        token: user.getJWTToken() } )
}

async function login(req, res) {
    const {email, password} = req.body

    if(!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({email})

    if(!user) {
        throw new UnauthenticatedError('User not found')
    }

    const isPasswordCorrect = await user.comparePasswords(password)
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Wrong password')
    }

    res.status(StatusCodes.OK).json({
        message: 'Login route',
        submitted: req.body,
        user: { name: user.name },
        token: user.getJWTToken() } )
}

module.exports = {
    register,
    login
}