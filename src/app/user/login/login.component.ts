// // import { Component, OnInit } from '@angular/core';

// // @Component({
// //   selector: 'app-login',
// //   templateUrl: './login.component.html',
// //   styleUrls: ['./login.component.css']
// // })
// // export class LoginComponent implements OnInit {

// //   constructor() { }

// //   ngOnInit() : void{
// //   }

// // }
// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { first } from 'rxjs/operators';
// import { HeaderComponent } from '../../core/header/header.component';
// import { AuthenticationService } from '../../_services';
// //import { authenticationService } from '../core/header/header.component'

// @Component({ templateUrl: './login.component.html' })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   loading = false;
//   submitted = false;
//   returnUrl: string;
//   error = '';

//   constructor(
//     private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private authenticationService: AuthenticationService
//   ) {
//     //redirect to home if already logged in
//     if (this.authenticationService.currentUserValue) {
//       this.router.navigate(['/home']);
//     }
//   }

//   ngOnInit() {
//     this.loginForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required],
//     });

//     // get return url from route parameters or default to '/'
//     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//   }

//   // convenience getter for easy access to form fields
//   get f() {
//     return this.loginForm.controls;
//   }

//   onSubmit() {
//     this.submitted = true;

//     // stop here if form is invalid
//     if (this.loginForm.invalid) {
//       return;
//     }

//     this.loading = true;
//     this.authenticationService
//       .login(this.f.username.value, this.f.password.value)
//       .pipe(first())
//       .subscribe(
//         (data) => {
//           this.router.navigate([this.returnUrl]);
//         },
//         (error) => {
//           this.error = error;
//           this.loading = false;
//         }
//       );
//   }

//   // constructor() { }

//   // ngOnInit() {
//   // }

//   // onSubmit() {
//   //   //this.router.navigate(['/home']);
//   // }
// }

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { NotificacionService } from 'src/app/shared/notificacion.service';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: [
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  user: any;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificacion: NotificacionService
  ) {
    //     //redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  reactiveForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.reactiveForm();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
    this.authenticationService.loginUser(this.loginForm.value).subscribe(
      (respuesta: any) => {
        (this.user = respuesta), this.router.navigate(['peliculas/']);
      },
      (error: any) => {
        this.error = error;
        this.notificacion.msjValidacion(this.error);
      }
    );
  }

  onReset() {
    this.loginForm.reset();
  }

  public errorHandling = (control: string, error: string) => {
    return this.loginForm.controls[control].hasError(error);
  };
}
