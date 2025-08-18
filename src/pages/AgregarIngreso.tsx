import { useState } from 'react'
import type { Ingreso } from '../types/Ingreso'
import { useNavigate, Link } from 'react-router-dom'

function AgregarIngreso() {
  const navigate = useNavigate()
  const toLocalDateInputValue = () => {
    const d = new Date()
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }
  const [formData, setFormData] = useState({
    descripcion: '',
    cantidad: '',
    tipo: 'propina',
    fecha: toLocalDateInputValue()
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.descripcion || formData.descripcion.trim().length < 3) {
      alert('La descripción debe tener al menos 3 caracteres.')
      return
    }

    const cantidadNum = parseFloat(formData.cantidad)
    if (isNaN(cantidadNum) || cantidadNum <= 0) {
      alert('La cantidad debe ser un número mayor a 0.')
      return
    }

    const nuevoIngreso: Ingreso = {
      id: Date.now().toString(),
      descripcion: formData.descripcion.trim(),
      cantidad: cantidadNum,
      tipo: formData.tipo as Ingreso['tipo'],
      fecha: formData.fecha
    }

    const ingresosGuardados = localStorage.getItem('ingresos')
    const ingresos = ingresosGuardados ? JSON.parse(ingresosGuardados) : []
    ingresos.push(nuevoIngreso)
    localStorage.setItem('ingresos', JSON.stringify(ingresos))

    alert('Ingreso agregado exitosamente!')
    navigate('/ingresos')
  }

  return (
    <div className="form-container">
      <h2>Agregar Ingreso</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <div className="form-grupo">
          <label>Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Ej: Propina de tutoría"
            required
          />
        </div>

        <div className="form-grupo">
          <label>Monto (S/.)</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            step="0.01"
            min="0.01"
            required
          />
        </div>

        <div className="form-grupo">
          <label>Tipo</label>
          <select name="tipo" value={formData.tipo} onChange={handleChange}>
            <option value="propina">Propina</option>
            <option value="salario">Salario</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        <div className="form-grupo">
          <label>Fecha</label>
          <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
        </div>

        <div className="form-acciones">
          <button type="submit" className="boton-principal">Guardar Ingreso</button>
          <Link to="/ingresos" className="boton-secundario">Ver Ingresos</Link>
        </div>
      </form>
    </div>
  )
}

export default AgregarIngreso
