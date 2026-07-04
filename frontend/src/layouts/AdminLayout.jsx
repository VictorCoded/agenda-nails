import { Link, Outlet } from "react-router-dom"
import "./AdminLayout.css"

export function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>💅 Agenda Nails</h2>

        <nav>
          <Link to="/admin">🏠 Dashboard</Link>
          <Link to="/admin/calendar">📅 Agenda</Link>
          <Link to="/admin/clients">👩 Clientes</Link>
          <Link to="/admin/services">💼 Serviços</Link>
          <Link to="/admin/settings">⚙️ Configurações</Link>
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}