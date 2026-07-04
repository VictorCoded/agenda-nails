const express = require('express')
const cors = require('cors')

const appointmentRoutes = require('./routes/appointmentRoutes')
const settingsRoutes = require('./routes/settingsRoutes')

const app = express()
const PORT = 3333

const serviceRoutes = require('./routes/serviceRoutes')

app.use(cors())
app.use(express.json())

app.use(appointmentRoutes)
app.use(settingsRoutes)

app.use(serviceRoutes)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})