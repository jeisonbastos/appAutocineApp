import { IPelicula } from '../pelicula/pelicula';
import { IUbicacion } from '../ubicaciones/ubicacion';

export interface IFuncion {
  id: number;
  fecha: string;
  hora: string;
  movie_id: number;
  location_id: number;
  visible_cartelera: boolean;
  disponible_venta: boolean;
  cantidad_espacios: number;
  movie: IPelicula;
  location: IUbicacion;
}
