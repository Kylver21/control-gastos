import { useState, useEffect } from 'react'
import type { Gasto } from '../types/Gasto'

interface ResumenCategoria {
  categoria: string
  total: number
  cantidad: number
}

function Resumen() {
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [resumenCategorias, setResumenCategorias] = useState<ResumenCategoria[]>([])
  const [totalGeneral, setTotalGeneral] = useState(0)

  useEffect(() => {
    const gastosGuardados = localStorage.getItem('gastos')
    if (gastosGuardados) {
      const gastosData = JSON.parse(gastosGuardados)
      setGastos(gastosData)
      calcularResumen(gastosData)
    }
  }, [])

  const calcularResumen = (gastosData: Gasto[]) => {
    const resumen: { [key: string]: ResumenCategoria } = {}
    let total = 0

    gastosData.forEach(gasto => {
      if (resumen[gasto.categoria]) {
        resumen[gasto.categoria].total += gasto.cantidad
        resumen[gasto.categoria].cantidad += 1
      } else {
        resumen[gasto.categoria] = {
          categoria: gasto.categoria,
          total: gasto.cantidad,
          cantidad: 1
        }
      }
      total += gasto.cantidad
    })

    setResumenCategorias(Object.values(resumen))
    setTotalGeneral(total)
  }

  const calcularPorcentaje = (cantidad: number) => {
    return totalGeneral > 0 ? ((cantidad / totalGeneral) * 100).toFixed(1) : '0'
  }

  const obtenerGastoMayor = () => {
    if (gastos.length === 0) return null
    return gastos.reduce((prev, current) => 
      prev.cantidad > current.cantidad ? prev : current
    )
  }

  const gastoMayor = obtenerGastoMayor()
  // Calcula el promedio de gastos, evitando división por cero
  const promedioGastos = gastos.length > 0 ? totalGeneral / gastos.length : 0

  return (
    <div className="resumen-container">
      <h2>Resumen de Gastos</h2>

      {gastos.length === 0 ? (
        <div className="sin-gastos">
          <p>No hay gastos para mostrar en el resumen.</p>
        </div>
      ) : (
        <>
          <div className="resumen-total">
            <h3>Total General</h3>
            <p className="total-cantidad">S/. {totalGeneral.toFixed(2)}</p>
            <p className="total-promedio">Gasto promedio: S/. {promedioGastos.toFixed(2)}</p>
            <p className="total-gastos">Total de gastos registrados: {gastos.length}</p>
          </div>

          <div className="resumen-categorias">
            <h3>Gastos por Categoría</h3>
            {resumenCategorias.map(categoria => (
              <div key={categoria.categoria} className="categoria-item">
                <div className="categoria-info">
                  <span className="categoria-nombre">{categoria.categoria}</span>
                  <span className="categoria-cantidad">
                    {categoria.cantidad} {categoria.cantidad === 1 ? 'gasto' : 'gastos'}
                  </span>
                </div>
                <div className="categoria-monto">
                  <span className="monto">S/. {categoria.total.toFixed(2)}</span>
                  <span className="porcentaje">{calcularPorcentaje(categoria.total)}%</span>
                </div>
                <div className="barra-progreso">
                  <div 
                    className="barra-fill"
                    style={{ width: `${calcularPorcentaje(categoria.total)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {gastoMayor && (
            <div className="gasto-mayor">
              <h3>Gasto más alto</h3>
              <p className="gasto-descripcion">{gastoMayor.descripcion}</p>
              <p className="gasto-monto">S/. {gastoMayor.cantidad.toFixed(2)}</p>
              <p className="gasto-fecha">
                Fecha: {new Date(gastoMayor.fecha).toLocaleDateString('es-PE')}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Resumen