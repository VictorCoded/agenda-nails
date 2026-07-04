export function DaySelector({ days, selectedDay, onSelect }) {
  return (
    <>
      <h2>Escolha o dia</h2>

      <div className="days">
        {days.map((day) => (
          <button
            type="button"
            key={day}
            className={selectedDay === day ? 'selected' : ''}
            onClick={() => onSelect(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </>
  )
}