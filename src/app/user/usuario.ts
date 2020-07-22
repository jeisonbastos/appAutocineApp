// import { IProductoTipo } from './producto-tipo';
// import { IProductoClasificacion } from './producto-clasificacion';

import { IRole } from './rol';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role_id: number;
  role: IRole;
}
