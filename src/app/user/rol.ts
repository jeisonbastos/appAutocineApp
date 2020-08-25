import { IUser } from './usuario';

export interface IRole {
  id: number;
  nombre: string;
  users: IUser;
}
