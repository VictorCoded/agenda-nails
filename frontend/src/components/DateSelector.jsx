const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export function DateSelector({ selectedDate, onSelect }) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

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

  const monthName = today.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })

  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )

  function formatDate(day) {
    return new Date(year, month, day).toLocaleDateString('pt-BR')
  }

  return (
    <>
      <h2>Escolha a data</h2>

      <h3 className="month-title">{monthName}</h3>

      <div className="week-grid">
        {weekDays.map((day) => (
          <strong key={day}>{day}</strong>
        ))}
      </div>

      <div className="calendar-grid">
        {calendarDays.map((day, index) => {
          if (!day) return <div key={index} />

          const date = formatDate(day)
          const active = selectedDate === date
          const currentDate = new Date(year, month, day)
          const isPast = currentDate < todayOnly

          return (
            <button
              type="button"
              key={day}
              disabled={isPast}
              className={`calendar-day ${active ? 'selected' : ''}`}
              onClick={() => onSelect(date)}
            >
              {day}
            </button>
          )
        })}
      </div>
    </>
  )
}