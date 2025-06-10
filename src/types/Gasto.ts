export interface Gasto {
  id: string;
  descripcion: string;
  cantidad: number;
  categoria: 'comida' | 'transporte' | 'entretenimiento' | 'estudios' | 'otros';
  fecha: string;
}

