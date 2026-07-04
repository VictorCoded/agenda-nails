const supabase = require("../config/supabase")

async function getSettings(req, res) {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .limit(1)
    .single()

  if (error && error.code !== "PGRST116") {
    return res.status(500).json({ message: error.message })
  }

  return res.json(data || {})
}

async function saveSettings(req, res) {
  const {
    start_time,
    end_time,
    break_start,
    break_end,
    slot_duration,
    working_days,
  } = req.body

  const { data: existing } = await supabase
    .from("settings")
    .select("*")
    .limit(1)

  if (existing.length > 0) {
    const { data, error } = await supabase
      .from("settings")
      .update({
        start_time,
        end_time,
        break_start,
        break_end,
        slot_duration,
        working_days,
      })
      .eq("id", existing[0].id)
      .select()
      .single()

    if (error)
      return res.status(500).json({ message: error.message })

    return res.json(data)
  }

  const { data, error } = await supabase
    .from("settings")
    .insert({
      start_time,
      end_time,
      break_start,
      break_end,
      slot_duration,
      working_days,
    })
    .select()
    .single()

  if (error)
    return res.status(500).json({ message: error.message })

  return res.json(data)
}

module.exports = {
  getSettings,
  saveSettings,
}