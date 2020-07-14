import { IProductoTipo } from './producto-tipo';
import { IProductoClasificacion } from './producto-clasificacion';

export interface IProducto {
  id: number;
  nombre: string;
  descripcion: string;
  product_type_id: string;
  tamano_presentacion: number;
  precio: number;
  imagenURL: string;
  tipo_producto: IProductoTipo;
  classifications: IProductoClasificacion[];
}
