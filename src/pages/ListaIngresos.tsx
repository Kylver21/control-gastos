import { useEffect, useState } from 'react'
import type { Ingreso } from '../types/Ingreso'
import { Link } from 'react-router-dom'

function ListaIngresos() {
  const [ingresos, setIngresos] = useState<Ingreso[]>([])

  useEffect(() => {
    const datos = localStorage.getItem('ingresos')
    if (datos) setIngresos(JSON.parse(datos))
  }, [])

  const eliminarIngreso = (id: string) => {
    if (confirm('¿Eliminar este ingreso?')) {
      const nuevos = ingresos.filter(i => i.id !== id)
      setIngresos(nuevos)
      localStorage.setItem('ingresos', JSON.stringify(nuevos))
    }
  }

  const toLocalDate = (yyyymmdd: string) => {
    const [y, m, d] = yyyymmdd.split('-').map(Number)
    return (y && m && d) ? new Date(y, m - 1, d) : new Date(yyyymmdd)
  }

  const ordenar = (criterio: 'fecha' | 'cantidad') => {
    const ordenados = [...ingresos].sort((a, b) =>
      criterio === 'fecha'
        ? toLocalDate(b.fecha).getTime() - toLocalDate(a.fecha).getTime()
        : b.cantidad - a.cantidad
    )
    setIngresos(ordenados)
  }

  return (
    <div className="lista-gastos-container">
      <h2>Lista de Ingresos</h2>
      <div className="controles-lista">
        <p>Total de ingresos: {ingresos.length}</p>
        <div className="botones-orden">
          <button onClick={() => ordenar('fecha')} className="boton-pequeño">Ordenar por fecha</button>
          <button onClick={() => ordenar('cantidad')} className="boton-pequeño">Ordenar por cantidad</button>
          <Link to="/agregar-ingreso" className="boton-principal">Agregar ingreso</Link>
        </div>
      </div>

      {ingresos.length === 0 ? (
        <p>No hay ingresos registrados.</p>
      ) : (
        <ul className="lista-simple">
          {ingresos.map(i => (
            <li key={i.id} className="item-simple">
              <div>
                <strong>{i.descripcion}</strong>
                <div className="meta-simple">{toLocalDate(i.fecha).toLocaleDateString('es-PE')}</div>
              </div>
              <div className="acciones-simple">
                <span>S/. {i.cantidad.toFixed(2)}</span>
                <button onClick={() => eliminarIngreso(i.id)} className="boton-eliminar">✕</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListaIngresos
