// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { GenericService } from 'src/app/shared/generic.service'
import { NotificacionService } from 'src/app/shared/notificacion.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUser } from 'src/app/user/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',],
})
export class HeaderComponent implements OnInit {
  private listTitles: any['Autocine'];
  public currentUser: IUser;
  usuario: IUser = undefined;
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.currentUser = this.authenticationService.currentUserValue;
    }
  }

  ngOnInit(): void {}

  login() {
    this.router.navigate(['/user/login']);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  getTitle() {
    return 'Autocine';
  }

  getUsuario(id: number) {
    this.gService
      .get('usuario', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (pelicula: any) => {
          this.usuario = pelicula[0];
        },
        (error: any) => {
          this.notificacion.mensaje(error.message, error.name, 'error');
        }
      );
  }
}
