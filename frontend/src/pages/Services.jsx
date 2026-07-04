import { useEffect, useState } from 'react'
import { api } from '../services/api'
import './Services.css'

export function Services() {
  const [services, setServices] = useState([])
  const [name, setName] = useState('')
  const [duration, setDuration] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    loadServices()
  }, [])

  async function loadServices() {
    const response = await api.get('/services')
    setServices(response.data)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const response = await api.post('/services', {
      name,
      duration: Number(duration),
      price: Number(price),
    })

    setServices((prev) => [response.data, ...prev])
    setName('')
    setDuration('')
    setPrice('')
  }

  async function handleDelete(id) {
    if (!window.confirm('Excluir serviço?')) return

    await api.delete(`/services/${id}`)
    setServices((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <section className="services-page">
      <h1>💼 Serviços</h1>
      <p>Cadastre os serviços oferecidos pela manicure.</p>

      <form className="service-form" onSubmit={handleSubmit}>
        <input
          placeholder="Nome do serviço"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Duração em minutos"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <input
          placeholder="Preço"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="confirm">Cadastrar serviço</button>
      </form>

      <div className="service-list">
        {services.map((service) => (
          <div className="service-item" key={service.id}>
            <div>
              <strong>{service.name}</strong>
              <span>{service.duration} min • R$ {service.price}</span>
            </div>

            <button onClick={() => handleDelete(service.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </section>
  )
}