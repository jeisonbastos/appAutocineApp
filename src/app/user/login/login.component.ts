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
  currentUser : any;
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
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
    this.reactiveForm();
  }

  reactiveForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  mensajes() {
    let register = false;
    let auth = false;
    // Mensajes
    this.route.queryParams.subscribe((params) => {
      register = params.register || false;
      auth = params.auth || false;
    });
    if (register) {
      this.notificacion.mensaje(
        'Usuario',
        'Registro de usuario satisfactorio! Por favor especifique las credenciales para ingresar!',
        'success'
      );
    }
    if (auth) {
      this.notificacion.mensaje(
        'Usuario',
        'Usuario no autorizado para ingresar al recurso solicitado',
        'warning'
      );
    }
  }
  ngOnInit(): void {
    this.mensajes();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
    this.authenticationService.loginUser(this.loginForm.value).subscribe(
      (respuesta: any) => {
        (this.user = respuesta), window.location.href = '';
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
