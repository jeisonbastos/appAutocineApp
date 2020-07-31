import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';
import { NotificacionService } from 'src/app/shared/notificacion.service';
import { IUser } from '../usuario';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/plugins.css',
  ]
})
export class UserProfileComponent implements OnInit {
  signInForm: FormGroup;
  changePwdForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  public currentUser: any;
  usuario: IUser = undefined;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificacion: NotificacionService
  ) {
    this.authenticationService.currentUser.subscribe((x) => (this.currentUser = x));
  }
ngOnInit(){

};

}
