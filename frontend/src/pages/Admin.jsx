import { useEffect, useState } from "react"
import { getAppointments, deleteAppointment } from "../services/api"
import "./Admin.css"

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

export function Admin() {
  const [appointments, setAppointments] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    loadAppointments()

    const interval = setInterval(loadAppointments, 3000)

    return () => clearInterval(interval)
  }, [])

  async function loadAppointments() {
    const data = await getAppointments()
    setAppointments(data)
  }

  async function handleDelete(id) {
    if (!window.confirm("Cancelar esse agendamento?")) return

    await deleteAppointment(id)
    setAppointments((prev) => prev.filter((item) => item.id !== id))
  }

  const year = selectedDate.getFullYear()
  const month = selectedDate.getMonth()

  const todayLabel = new Date().toLocaleDateString("pt-BR")
  const selectedDayLabel = selectedDate.toLocaleDateString("pt-BR")

  const monthName = selectedDate.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  })

  const todayAppointments = appointments.filter(
    (item) => item.date?.trim() === todayLabel
  )

  const monthAppointments = appointments.filter((item) => {
    if (!item.date) return false

    const [day, itemMonth, itemYear] = item.date.split("/")

    return Number(itemMonth) === month + 1 && Number(itemYear) === year
  })

  const nextAppointment = todayAppointments
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time))[0]

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const daysInMonth = lastDay.getDate()
  const startWeekDay = firstDay.getDay()

  const calendarDays = []

  for (let i = 0; i < startWeekDay; i++) {
    calendarDays.push(null)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const selectedAppointments = appointments.filter(
    (item) => item.date?.trim() === selectedDayLabel
  )

  function selectDay(day) {
    setSelectedDate(new Date(year, month, day))
  }

  function previousMonth() {
    setSelectedDate(new Date(year, month - 1, 1))
  }

  function nextMonth() {
    setSelectedDate(new Date(year, month + 1, 1))
  }

  return (
    <main className="admin-page">
      <section className="admin-header">
        <span className="badge">💅 Agenda Nails</span>
        <h1>Painel da Manicure</h1>
        <p>Resumo da agenda e atendimentos do mês.</p>
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-card">
          <span>Clientes hoje</span>
          <strong>{todayAppointments.length}</strong>
        </div>

        <div className="dashboard-card">
          <span>Agendamentos no mês</span>
          <strong>{monthAppointments.length}</strong>
        </div>

        <div className="dashboard-card">
          <span>Próximo horário</span>
          <strong>{nextAppointment ? nextAppointment.time : "--:--"}</strong>
        </div>

        <div className="dashboard-card">
          <span>Total geral</span>
          <strong>{appointments.length}</strong>
        </div>
      </section>

      <section className="admin-content">
        <div className="calendar-card">
          <div className="calendar-header">
            <button onClick={previousMonth}>←</button>
            <h2>{monthName}</h2>
            <button onClick={nextMonth}>→</button>
          </div>

          <div className="week-grid">
            {weekDays.map((day) => (
              <strong key={day}>{day}</strong>
            ))}
          </div>

          <div className="calendar-grid">
            {calendarDays.map((day, index) => {
              if (!day) return <div key={index} />

              const dateLabel = new Date(year, month, day).toLocaleDateString("pt-BR")

              const count = appointments.filter(
                (item) => item.date?.trim() === dateLabel
              ).length

              const active = selectedDayLabel === dateLabel

              return (
                <button
                  type="button"
                  key={day}
                  className={`calendar-day ${active ? "active-day" : ""}`}
                  onClick={() => selectDay(day)}
                >
                  <span>{day}</span>
                  <small>{count > 0 ? `${count} agend.` : "Livre"}</small>
                </button>
              )
            })}
          </div>
        </div>

        <div className="day-card">
          <h2>Agenda de {selectedDayLabel}</h2>

          {selectedAppointments.length === 0 ? (
            <p>Nenhum agendamento nesse dia.</p>
          ) : (
            selectedAppointments.map((item) => (
              <div className="appointment" key={item.id}>
                <strong>{item.time}</strong>
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
        </div>
      </section>
    </main>
  )
}