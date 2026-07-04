const express = require('express')

const {
  listServices,
  createService,
  deleteService,
} = require('../controllers/serviceController')

const routes = express.Router()

routes.get('/services', listServices)
routes.post('/services', createService)
routes.delete('/services/:id', deleteService)

module.exports = routes