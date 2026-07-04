import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:3333",
})

export async function getAppointments() {
  const response = await api.get("/appointments")
  return response.data
}

export async function createAppointment(body) {
  const response = await api.post("/appointments", body)
  return response.data
}

export async function deleteAppointment(id) {
  await api.delete(`/appointments/${id}`)
}

export async function getServices() {
  const response = await api.get("/services")
  return response.data
}