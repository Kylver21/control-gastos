import type { Gasto } from '../types/Gasto'

interface GastoItemProps {
  gasto: Gasto
  onEliminar: (id: string) => void
}

function GastoItem({ gasto, onEliminar }: GastoItemProps) {
  const formatearFecha = (fecha: string) => {
    // Parse 'YYYY-MM-DD' as local date to avoid UTC shift
    const parts = fecha.split('-').map(Number)
    let date: Date
    if (parts.length === 3 && parts.every(n => !Number.isNaN(n))) {
      const [y, m, d] = parts
      date = new Date(y, m - 1, d)
    } else {
      date = new Date(fecha)
    }
    return date.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }
  // Colores de fondo por categoría
  const categoriaColors: Record<string, string> = {
    comida: '#ffe5e0',
    transporte: '#e0f7fa',
    entretenimiento: '#f3e5f5',
    estudios: '#e8f5e9',
    salud: '#fff9c4',
    otros: '#ececec'
  }
  // Clase especial para gastos mayores a S/. 50
  const esGastoAlto = gasto.cantidad > 50

  const obtenerEmoji = (categoria: string) => {
    const emojis = {
      comida: '🍔', 
      transporte: '🚌',
      entretenimiento: '🎮',
      estudios: '📚',
      salud: '🧑‍⚕️',
      otros: '📌'
    }
    return emojis[categoria as keyof typeof emojis] || '📌'
  }

   return (
    <div
      className={`gasto-item${esGastoAlto ? ' gasto-alto' : ''}`}
      style={{ backgroundColor: categoriaColors[gasto.categoria] || '#ececec' }}
    >
      <div className="gasto-info">
        <div className="gasto-header">
          <span className="gasto-emoji">{obtenerEmoji(gasto.categoria)}</span>
          <h3>{gasto.descripcion}</h3>
        </div>
        <div className="gasto-detalles">
          <span className="gasto-categoria">{gasto.categoria}</span>
          <span className="gasto-fecha">{formatearFecha(gasto.fecha)}</span>
        </div>
      </div>
      <div className="gasto-acciones">
        <span className="gasto-cantidad">S/. {gasto.cantidad.toFixed(2)}</span>
        <button
          onClick={() => onEliminar(gasto.id)}
          className="boton-eliminar"
          title="Eliminar gasto"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default GastoItem