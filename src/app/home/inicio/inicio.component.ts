import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../_models';
import { UserService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: [
    './inicio.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',
  ],
})
export class InicioComponent {
  pageTitle = 'Autocine';
  ngOnInit(): void {}
}


// // export class InicioComponent {
//   loading = false;
//   users: User[];

//   constructor(protected userService: UserService) {}

//   ngOnInit() {
//     this.loading = true;
//     this.userService
//       .getAll()
//       .pipe(first())
//       .subscribe((users) => {
//         this.loading = false;
//         this.users = users;
//       });
//   }
// }

