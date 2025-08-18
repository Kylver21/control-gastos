export interface Ingreso {
	id: string;
	descripcion: string;
	cantidad: number;
	tipo: 'propina' | 'salario' | 'otros';
	fecha: string; 
}

