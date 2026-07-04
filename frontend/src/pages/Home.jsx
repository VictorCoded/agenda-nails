import { useEffect, useState } from 'react'
import {
  getAppointments,
  createAppointment,
  getServices,
} from '../services/api'

import { Hero } from '../components/Hero'
import { ServiceSelector } from '../components/ServiceSelector'
import { DateSelector } from '../components/DateSelector'
import { TimeSelector } from '../components/TimeSelector'

import './Home.css'

const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']

const manicurePhone = '5511980604175'

export function Home() {
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [appointments, setAppointments] = useState([])
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadAppointments()
    loadServices()

    const interval = setInterval(() => {
      loadAppointments()
      loadServices()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  async function loadAppointments() {
    const data = await getAppointments()
    setAppointments(data)
  }

  async function loadServices() {
    const data = await getServices()
    setServices(data)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!selectedService || !selectedDate || !selectedTime || !name || !phone) {
      alert('Preencha todos os campos.')
      return
    }

    try {
      const appointment = await createAppointment({
        name,
        phone,
        service: selectedService,
        day: new Date(selectedDate.split('/').reverse().join('-')).toLocaleDateString('pt-BR', {
          weekday: 'short',
        }),
        date: selectedDate,
        time: selectedTime,
      })

      setAppointments((prev) => [appointment, ...prev])
      setSuccess(true)
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao realizar agendamento.')
    }
  }

  function resetForm() {
    setSuccess(false)
    setSelectedService('')
    setSelectedDate('')
    setSelectedTime('')
    setName('')
    setPhone('')
  }

  if (success) {
    const whatsappMessage = encodeURIComponent(
      `Olá! Gostaria de confirmar meu agendamento:\n\n` +
      `👤 Cliente: ${name}\n` +
      `📱 WhatsApp: ${phone}\n` +
      `💅 Serviço: ${selectedService}\n` +
      `📅 Data: ${selectedDate}\n` +
      `⏰ Horário: ${selectedTime}`
    )

    return (
      <main className="home">
        <section className="success-card">
          <div className="success-icon">✅</div>
          <h1>Agendamento realizado!</h1>
          <p>Seu horário foi registrado com sucesso.</p>

          <div className="summary">
            <span><strong>Cliente:</strong> {name} </span>
            <span><strong>Serviço:</strong> {selectedService} </span>
            <span><strong>Data:</strong> {selectedDate} </span>
            <span><strong>Horário:</strong> {selectedTime} </span>
          </div>

          <a
            className="whatsapp"
            href={`https://wa.me/${manicurePhone}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
          >
            Confirmar com a manicure no WhatsApp
          </a>

          <button className="confirm" onClick={resetForm}>
            Fazer novo agendamento
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="home">
      <Hero />

      <form className="card" onSubmit={handleSubmit}>
        <ServiceSelector
          services={services}
          selectedService={selectedService}
          onSelect={setSelectedService}
        />

        <DateSelector
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />

        <TimeSelector
          times={times}
          selectedDay={selectedDate}
          selectedTime={selectedTime}
          appointments={appointments}
          onSelect={setSelectedTime}
        />

        <div className="form">
          <input
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Seu WhatsApp com DDD"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button className="confirm" type="submit">
            Confirmar agendamento
          </button>
        </div>
      </form>
    </main>
  )
}