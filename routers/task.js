const taskRouter = require('express').Router()
const {getAll,create,destroy,getOne,update,countTasks} = require('../controllers/taskController')


taskRouter.get('/' , getAll)
taskRouter.get('/count' , countTasks)
taskRouter.post('/' , create)
taskRouter.get('/:id' , getOne)
taskRouter.put('/:id' , update)
taskRouter.delete('/:id' , destroy)


module.exports = taskRouter