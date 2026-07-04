import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { Admin } from './pages/Admin'
import { AdminLayout } from './layouts/AdminLayout'
import { Services } from './pages/Services'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin" element={<AdminLayout />}>
        <Route path="services" element={<Services />} />
          <Route index element={<Admin />} />
          <Route path="calendar" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App