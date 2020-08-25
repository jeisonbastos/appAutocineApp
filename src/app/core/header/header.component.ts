import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { NotificacionService } from 'src/app/shared/notificacion.service';
import { GenericService } from 'src/app/shared/generic.service';
import { IUser } from 'src/app/user/usuario';
import { IRole } from 'src/app/user/rol';
import { takeUntil, ignoreElements } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',
  ],
})
export class HeaderComponent implements OnInit {
  pageTitle = 'Autocine';
  currentUser: any;
  usuario: IUser = undefined;
  rol: IRole;
  logged = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private gService: GenericService,
    private notificacion: NotificacionService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (
        (this.currentUser = x), this.getUserRole(this.currentUser.user.id)
      )
    );
  }

  ngOnInit(): void {
    if (this.currentUser != null && !this.logged) {
      //window.location.reload();
      this.logged = true;
    }
  }

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

  getUserRole(id: number) {
    this.gService
      .get('role', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (role: any) => {
          console.log(role);
          this.rol = role[0];
        },
        (error: any) => {
          this.notificacion.msjValidacion(error);
        }
      );
  }

  public errorHandling = (error: string) => {
    return error;
  };
}
