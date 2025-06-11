import { useState, useEffect } from 'react'
import type { Gasto } from '../types/Gasto'
import GastoItem from '../components/GastoItem'

function ListaGastos() {
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas')

  useEffect(() => {
    const gastosGuardados = localStorage.getItem('gastos')
    if (gastosGuardados) {
      setGastos(JSON.parse(gastosGuardados))
    }
  }, [])

  const eliminarGasto = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este gasto?')) {
      const nuevosGastos = gastos.filter(gasto => gasto.id !== id)
      setGastos(nuevosGastos)
      localStorage.setItem('gastos', JSON.stringify(nuevosGastos))
    }
  }
  const limpiarTodosLosGastos = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar todos los gastos?')) {
      localStorage.removeItem('gastos')
      setGastos([])
    }
  }
  const ordenarGastos = (criterio: 'fecha' | 'cantidad') => {
    const gastosOrdenados = [...gastos].sort((a, b) => {
      if (criterio === 'fecha') {
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      } else {
        return b.cantidad - a.cantidad
      }
    })
    setGastos(gastosOrdenados)
  }
  const gastosFiltrados = gastos.filter(
    gasto => categoriaFiltro === 'todas' || gasto.categoria === categoriaFiltro
  )

  return (
    <div className="lista-gastos-container">
      <h2>Lista de Gastos</h2>
      {gastos.length === 0 ? (
        <div className="sin-gastos">
          <p>No hay gastos registrados todavía.</p>
          <p>¡Comienza agregando tu primer gasto!</p>
        </div>
      ) : (
        <>
        <div className="filtro-categorias">
        <label htmlFor="categoriaFiltro">Filtrar por categoría: </label>
        <select
          id="categoriaFiltro"
          value={categoriaFiltro}
          onChange={e => setCategoriaFiltro(e.target.value)}
        >
          <option value="todas">Todas</option>
          <option value="comida">Comida</option>
          <option value="transporte">Transporte</option>
          <option value="entretenimiento">Entretenimiento</option>
          <option value="estudios">Estudios</option>
          <option value="salud">Salud</option>
          <option value="otros">Otros</option>
        </select>
      </div>
          <div className="controles-lista">
            <p>Total de gastos: {gastos.length}</p>
            <div className="botones-orden">
              <button onClick={() => ordenarGastos('fecha')} className="boton-pequeño">
                Ordenar por fecha
              </button>
              <button onClick={() => ordenarGastos('cantidad')} className="boton-pequeño">
                Ordenar por cantidad
              </button>
              <button onClick={limpiarTodosLosGastos} className="boton-pequeño" style={{ backgroundColor: '#e74c3c', color: 'white' }}>
                Limpiar Todos los Gastos
              </button>
            </div>
          </div>

          <div className="lista-gastos">
            {gastosFiltrados.map(gasto => (
              <GastoItem 
                key={gasto.id}
                gasto={gasto}
                onEliminar={eliminarGasto}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ListaGastos