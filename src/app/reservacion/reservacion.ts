import { IProducto } from '../producto/producto';
import { ITiquete } from '../tiquete/tiquete';

export interface IReservacion {
  id: number;
  user_id: string;
  subtotal: number;
  iva: number;
  total: number;
  products: IProducto[];
  tickets: ITiquete[];
}
