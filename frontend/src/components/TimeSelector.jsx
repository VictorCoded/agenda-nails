export function TimeSelector({
  times,
  selectedDay,
  selectedTime,
  appointments,
  onSelect,
}) {
  return (
    <>
      <h2>Horários disponíveis</h2>

      <div className="times">
        {times.map((time) => {
          const booked = appointments.some(
            (item) => item.date === selectedDay && item.time === time
          )

          return (
            <button
              type="button"
              key={time}
              disabled={!selectedDay || booked}
              className={selectedTime === time ? 'selected' : ''}
              onClick={() => onSelect(time)}
            >
              {booked ? 'Ocupado' : time}
            </button>
          )
        })}
      </div>
    </>
  )
}