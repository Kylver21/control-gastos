import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

import Inicio from './pages/Inicio'
import AgregarGasto from './pages/AgregarGasto'
import ListaGastos from './pages/ListaGastos'
import Resumen from './pages/Resumen'

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Mi Gestor de Gastos Personales</h1>
          <nav>
            <ul className="nav-menu">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/agregar">Agregar Gasto</Link></li>
              <li><Link to="/lista">Ver Gastos</Link></li>
              <li><Link to="/resumen">Resumen</Link></li>
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/agregar" element={<AgregarGasto />} />
            <Route path="/lista" element={<ListaGastos />} />
            <Route path="/resumen" element={<Resumen />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>Aplicación de Control de Gastos © 2025</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
