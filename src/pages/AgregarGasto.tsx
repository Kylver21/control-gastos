import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Gasto } from '../types/Gasto'

function AgregarGasto() {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    descripcion: '',
    cantidad: '',
    categoria: 'comida' as Gasto['categoria'],
    fecha: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    //validacion descipcion 
    if (!formData.descripcion || formData.descripcion.trim().length < 3) {
    alert('La descripción debe tener al menos 3 caracteres.');
    return;
    }
    if (formData.descripcion && formData.cantidad) {
      const nuevoGasto: Gasto = {
        id: Date.now().toString(),
        descripcion: formData.descripcion,
        cantidad: parseFloat(formData.cantidad),
        categoria: formData.categoria,
        fecha: formData.fecha
      }
      
      // Validación de cantidad
    const cantidadNum = parseFloat(formData.cantidad);
    if (isNaN(cantidadNum) || cantidadNum <= 0) {
      alert('La cantidad debe ser un número mayor a 0.');
      return;
    }
      const gastosGuardados = localStorage.getItem('gastos')
      const gastos = gastosGuardados ? JSON.parse(gastosGuardados) : []
      gastos.push(nuevoGasto)
      localStorage.setItem('gastos', JSON.stringify(gastos))
      
      alert('Gasto agregado exitosamente!')
      navigate('/lista')
    } 
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="agregar-gasto-container">
      <h2>Agregar Nuevo Gasto</h2>
      <form onSubmit={handleSubmit} className="formulario-gasto">
        <div className="campo-formulario">
          <label htmlFor="descripcion">Descripción del gasto:</label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Ej: Almuerzo en la universidad"
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="cantidad">Cantidad (S/.):</label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            step="0.01"
            min="0"
            placeholder="0.00"
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="comida">Comida</option>
            <option value="transporte">Transporte</option>
            <option value="entretenimiento">Entretenimiento</option>
            <option value="estudios">Estudios</option>
            <option value="salud">Salud</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        <div className="campo-formulario">
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />
        </div>

        <div className="botones-formulario">
          <button type="submit" className="boton-principal">
            Agregar Gasto
          </button>
          <button type="button" onClick={() => navigate('/')} className="boton-secundario">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default AgregarGasto