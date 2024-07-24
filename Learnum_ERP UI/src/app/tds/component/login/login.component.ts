import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alertService';
//import { LoginModel } from 'app/core/models/LoginModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { LoginModel } from './login.model';
import { LoginService } from './login.service';
//import { LoginService } from './login.service';
//import { RedirectService } from 'app/core/services/redirect.service';
//import { environment } from 'environments/environment';
//import { ResponseCode} from 'app/core/models/ServiceResponse.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //loginModel = new LoginModel();
  loginModel = new LoginModel();
  signIn_Form: any;
  showPassword: boolean = false;

  signInForm = new FormGroup({
    emailId: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
   // private redirectService: RedirectService,
    private _router: Router,
  ) {}

  ngOnInit(): void {}

  get emailId(): FormControl {
    return this.signInForm.get("emailId") as FormControl;
  }

  get password(): FormControl {
    return this.signInForm.get("password") as FormControl;
  }

  onSignIn_Click() {
    console.log(this.signInForm);
    if (this.signInForm.valid) {
      let signInFormData = this.signInForm.value;
      this.loginModel.emailId = signInFormData.emailId;
      this.loginModel.PasswordHash = signInFormData.password;
      this.loginService.Login(this.loginModel).subscribe(
        (result: any) => {
          let serviceResponse = result.Value;
          if (serviceResponse.Item1 == ResponseCode.Success) {
            this.loginService.setSession(serviceResponse.Item2);
            document.getElementById('afterLogin')?.click();
          } else if (serviceResponse.Item1 == ResponseCode.AccountDoesNotExists) {
            this.alertService.ShowErrorMessage('This Account does not exist!');
          } else if (serviceResponse.Item1 == ResponseCode.InvalidUserNameOrPassword) {
            this.alertService.ShowErrorMessage('Invalid Email ID Or Password');
          } else if (serviceResponse.Item1 == ResponseCode.UserDeactivated) {
            this.alertService.ShowErrorMessage('Your account is currently deactivated by Administrator');
          }
        },
        (error: any) => {
          this.alertService.ShowErrorMessage('Invalid Email ID Or Password');
        }
      );
    }
  }

  onSignUpClick() {
    this._router.navigate(['/sign-up']);
  }

  Home_Page() {
    this._router.navigate(['/home']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
