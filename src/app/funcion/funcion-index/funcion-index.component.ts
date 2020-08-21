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
import { IFuncion } from '../funcion';

@Component({
  templateUrl: './funcion-index.component.html',
  styleUrls: [
    './funcion-index.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',
  ],
})
export class FuncionIndexComponent implements OnInit {
  pageTitle = 'Funciones Disponibles';
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
    this.filteredFunciones = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.funciones;
  }

  filteredFunciones: IFuncion[] = [];
  funciones: IFuncion[] = [];
  total_generos: number;
  clasificacion_siglas: '';

  constructor(
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {}

  onRatingClicked(message: string): void {
    this.pageTitle = 'Funciones Disponibles: ' + message;
  }

  performFilter(filterBy: string): IFuncion[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.funciones.filter(
      (funcion: IFuncion) =>
        funcion.location.nombre.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.gService
      .list('funcion/')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (funciones: any) => {
          // console.log(funciones);
          this.funciones = funciones;
          this.filteredFunciones = this.funciones;
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
  //         // console.log(funciones);
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
