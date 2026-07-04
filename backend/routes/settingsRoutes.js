const express = require("express")

const {
  getSettings,
  saveSettings,
} = require("../controllers/settingsController")

const routes = express.Router()

routes.get("/settings", getSettings)
routes.post("/settings", saveSettings)

module.exports = routes