export function ServiceSelector({ services, selectedService, onSelect }) {
  return (
    <>
      <h2>Escolha o serviço</h2>

      <div className="services">
        {services.map((service) => (
          <button
            type="button"
            key={service.id}
            className={selectedService === service.name ? 'selected' : ''}
            onClick={() => onSelect(service.name)}
          >
            {service.name}
          </button>
        ))}
      </div>
    </>
  )
}