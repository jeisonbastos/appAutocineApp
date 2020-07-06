// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../_models';
import { UserService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private listTitles: any['Autocine'];
  location: Location;
  public currentUser: User;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    public authenticationService: AuthenticationService
  ) {
    this.location = location;
  }

  ngOnInit(): void {}

  login() {
    // this.authenticationService.currentUser.subscribe(
    //   (x) => (this.currentUser = x)
    // );
    this.router.navigate(['/user/login']);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/user/login']);
  }

  getTitle() {
    return 'Autocine';
  }
}
