const supabase = require('../config/supabase')

async function listAppointments(req, res) {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ message: error.message })

  return res.json(data)
}

async function createAppointment(req, res) {
  const { name, phone, service, day, date, time } = req.body

  if (!name || !phone || !service || !date || !time) {
    return res.status(400).json({ message: 'Preencha todos os campos.' })
  }

  const { data: alreadyBooked, error: checkError } = await supabase
    .from('appointments')
    .select('*')
    .eq('date', date)
    .eq('time', time)
    .eq('status', 'confirmado')

  if (checkError) return res.status(500).json({ message: checkError.message })

  if (alreadyBooked.length > 0) {
    return res.status(409).json({ message: 'Esse horário já está ocupado.' })
  }

  const { data, error } = await supabase
    .from('appointments')
    .insert({
      client_name: name,
      phone,
      service,
      day,
      date,
      time,
      status: 'confirmado',
    })
    .select()
    .single()

  if (error) return res.status(500).json({ message: error.message })

  return res.status(201).json(data)
}

async function deleteAppointment(req, res) {
  const { id } = req.params

  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id)

  if (error) return res.status(500).json({ message: error.message })

  return res.status(204).send()
}

module.exports = {
  listAppointments,
  createAppointment,
  deleteAppointment,
}