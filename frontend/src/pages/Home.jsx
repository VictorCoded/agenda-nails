import { useEffect, useState } from 'react'
import {
  getAppointments,
  createAppointment,
  deleteAppointment,
  getServices,
} from '../services/api'

import { Hero } from '../components/Hero'
import { ServiceSelector } from '../components/ServiceSelector'
import { DateSelector } from '../components/DateSelector'
import { TimeSelector } from '../components/TimeSelector'

import './Home.css'

const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']

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

    async function handleDelete(id) {
        if (!window.confirm('Cancelar esse agendamento?')) return

        await deleteAppointment(id)

        setAppointments((prev) => prev.filter((item) => item.id !== id))
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
        return (
            <main className="home">
                <section className="success-card">
                    <div className="success-icon">✅</div>
                    <h1>Agendamento realizado!</h1>
                    <p>Seu horário foi confirmado com sucesso.</p>

                    <div className="summary">
                        <span><strong>Cliente:</strong> {name}</span>
                        <span><strong>Serviço:</strong> {selectedService}</span>
                        <span><strong>Data:</strong> {selectedDate}</span>
                        <span><strong>Horário:</strong> {selectedTime}</span>
                    </div>

                    <a
                        className="whatsapp"
                        href={`https://wa.me/55${phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                            `Olá! Agendei meu horário:\n\nNome: ${name}\nServiço: ${selectedService}\nData: ${selectedDate}\nHorário: ${selectedTime}`
                        )}`}
                        target="_blank"
                    >
                        Enviar confirmação no WhatsApp
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
                        placeholder="WhatsApp com DDD"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <button className="confirm" type="submit">
                        Confirmar agendamento
                    </button>
                </div>

                <section className="admin-preview">
                    

                    {appointments.length === 0 ? (
                        <p>Nenhum agendamento ainda.</p>
                    ) : (
                        appointments.map((item) => (
                            <div className="appointment" key={item.id}>
                                <strong>{item.day} às {item.time}</strong>
                                <span>{item.client_name} - {item.service}</span>
                                <small>{item.phone}</small>

                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        ))
                    )}
                </section>
            </form>
        </main>
    )
}