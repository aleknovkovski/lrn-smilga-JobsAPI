async function register(req, res) {
    res.send('Register route')
}

async function login(req, res) {
    res.send('Login route')
}

module.exports = {
    register,
    login
}