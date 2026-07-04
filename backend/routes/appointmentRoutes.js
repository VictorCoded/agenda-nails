const express = require('express')

const {
  listAppointments,
  createAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController')

const routes = express.Router()

routes.get('/appointments', listAppointments)
routes.post('/appointments', createAppointment)
routes.delete('/appointments/:id', deleteAppointment)

module.exports = routes