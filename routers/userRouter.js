const { getAllUsers, getOneUser, updateUser, destroy, countUser } = require('../controllers/userController')

const UserRouter = require('express').Router()

UserRouter.get('/' , getAllUsers)
UserRouter.get('/count' , countUser)
UserRouter.get('/:id' , getOneUser)
UserRouter.put('/:id' , updateUser)
UserRouter.delete('/:id' , destroy)



module.exports = UserRouter