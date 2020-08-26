import { IProductoTipo } from './producto-tipo';
import { IProductoClasificacion } from './producto-clasificacion';
import { IPivot } from '../reservacion/pivot';

export interface IProducto {
  id: number;
  nombre: string;
  descripcion: string;
  product_type_id: string;
  tamano_presentacion: number;
  precio: number;
  imagenURL: string;
  product_type: IProductoTipo;
  classifications: IProductoClasificacion[];
  pivot:IPivot[];
}
