import { IProducto } from '../producto/producto';
import { IFuncion } from '../funcion/funcion';

export interface ITiquete {
  id: number;
  ticket_type_id: number;
  show_id: number;
  show: IFuncion;
}
