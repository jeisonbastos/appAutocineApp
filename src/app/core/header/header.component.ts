import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { IUser } from 'src/app/user/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',],
})
export class HeaderComponent implements OnInit {
  pageTitle  = 'Autocine';
  currentUser: any = null;
  usuario: IUser = undefined;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe((x) => (this.currentUser = x));
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
}
