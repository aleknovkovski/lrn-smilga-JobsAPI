async function register(req, res) {
    res.json({message: 'Register route', submitted: req.body} )
}

async function login(req, res) {
    res.send('Login route')
}

module.exports = {
    register,
    login
}