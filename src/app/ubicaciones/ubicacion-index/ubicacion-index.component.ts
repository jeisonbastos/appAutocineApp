import { Component, OnInit } from '@angular/core';
import { GenericService } from 'src/app/shared/generic.service';
import { NotificacionService } from 'src/app/shared/notificacion.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUbicacion } from '../ubicacion';

@Component({
  templateUrl: './ubicacion-index.component.html',
  styleUrls: [
    './ubicacion-index.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',
  ],
})
export class UbicacionIndexComponent implements OnInit {
  pageTitle = 'Ubicaciones Habilitadas';
  imageWidth = 50;
  imageMargin = 2;
  imageUrl = '';
  showImage = true;
  error: any;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  filterForm: FormGroup;

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredUbicaciones = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.ubicaciones;
  }

  filteredUbicaciones: IUbicacion[] = [];
  ubicaciones: IUbicacion[] = [];
  total_generos: number;
  clasificacion_siglas: '';

  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {}

  onRatingClicked(message: string): void {
    this.pageTitle = 'Ubicaciones Habilitadas: ' + message;
  }

  performFilter(filterBy: string): IUbicacion[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.ubicaciones.filter(
      (ubicacion: IUbicacion) =>
        ubicacion.nombre.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.gService
      .list('ubicacion/')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (ubicaciones: any) => {
          // console.log(ubicaciones);
          this.ubicaciones = ubicaciones;
          this.filteredUbicaciones = this.ubicaciones;
          // this.getGenders();
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }

  // getGenders(): void {
  //   this.gService
  //     .list('genero/all')
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(
  //       (generos: any) => {
  //         // console.log(ubicaciones);
  //         this.generos = generos;
  //         // this.total_generos = generos.count();
  //       },
  //       (error: any) => {
  //         this.notificacion.mensaje(error.message, error.name, 'error');
  //       }
  //     );
  // }

  updateChkbxArray(id, isChecked, key) {
    const chkArray = <FormArray>this.filterForm.get(key);
    if (isChecked.target.checked) {
      chkArray.push(new FormControl(id));
    } else {
      let idx = chkArray.controls.findIndex((x) => x.value == id);
      chkArray.removeAt(idx);
    }
  }
}
