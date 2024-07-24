const assignementRouter = require('express').Router()
const {getAll,create,destroy,update, countAssingnement} = require('../controllers/assignementController')


assignementRouter.get('/' , getAll)
assignementRouter.get('/count' , countAssingnement)
assignementRouter.post('/' , create)
// assignementRouter.get('/:id' , getOne)
assignementRouter.put('/:id' , update)
assignementRouter.delete('/:id' , destroy)


module.exports = assignementRouter