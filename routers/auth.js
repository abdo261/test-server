const { register, loginUser } = require('../controllers/authController')

const authRouter = require('express').Router()


authRouter.post('/create',register)
authRouter.post('/login',loginUser)

module.exports = authRouter