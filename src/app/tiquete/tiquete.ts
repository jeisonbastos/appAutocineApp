import { IPivot } from '../reservacion/pivot';
import { ITiqueteTipo } from './tiquete-tipo';
export interface ITiquete {
  id: number;
  ticket_type_id: number;
  show_id: number;
  tipo_tiquete:ITiqueteTipo;
  pivot:IPivot;
}
