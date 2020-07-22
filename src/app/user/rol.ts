// import { IProductoTipo } from './producto-tipo';
// import { IProductoClasificacion } from './producto-clasificacion';

import { IUser } from './usuario';

export interface IRole {
  id: number;
  nombre: string;
  users: IUser;
}
