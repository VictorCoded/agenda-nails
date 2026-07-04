const supabase = require('../config/supabase')

async function listServices(req, res) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ message: error.message })

  return res.json(data)
}

async function createService(req, res) {
  const { name, duration, price } = req.body

  if (!name || !duration || !price) {
    return res.status(400).json({ message: 'Preencha todos os campos.' })
  }

  const { data, error } = await supabase
    .from('services')
    .insert({
      name,
      duration,
      price,
    })
    .select()
    .single()

  if (error) return res.status(500).json({ message: error.message })

  return res.status(201).json(data)
}

async function deleteService(req, res) {
  const { id } = req.params

  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)

  if (error) return res.status(500).json({ message: error.message })

  return res.status(204).send()
}

module.exports = {
  listServices,
  createService,
  deleteService,
}