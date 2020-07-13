import { IClasificacion } from './clasificacion';
import { IGenero } from './genero';

export interface IPelicula {
  id: number;
  nombre: string;
  habilitada: boolean;
  clasification_id: number;
  sinopsis: string;
  puntuacion: number;
  imagenURL: string;
  classification: IClasificacion; 
  genders: IGenero[];
}
