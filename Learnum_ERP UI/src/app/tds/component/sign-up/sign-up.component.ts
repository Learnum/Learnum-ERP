import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  NgForm,
} from '@angular/forms';
import { SignUpService } from './sign-up.service';
import { AlertService } from 'src/app/core/services/alertService';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
//import { RegistrationMaster } from './registration-master.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  EnterOTP: string;
  isVerifyOTP: boolean = false;
  signUP: boolean = true;
  createPass: boolean = false;
  //registrationModel = new RegistrationMaster();
  isShake: boolean = false;
  passwordTextType: boolean = false;
  repasswordTextType: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
   // private signUpService: SignUpService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    this.signUpForm = this.formBuilder.group({
      UserName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
      EmailId: ['', [Validators.required, Validators.email]],
      MobileNo: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  onlyAlphabetKey(event) {
    return (
      (event.charCode > 64 && event.charCode < 91) ||
      (event.charCode > 96 && event.charCode < 123) ||
      event.charCode == 8 || // Backspace
      event.charCode == 32 // Space
    );
  }

  notallospace(event) {
    return (
      (event.charCode >= 65 && event.charCode <= 90) || // Uppercase letters
      (event.charCode >= 97 && event.charCode <= 122) || // Lowercase letters
      (event.charCode >= 48 && event.charCode <= 57) || // Numbers
      (event.charCode >= 33 && event.charCode <= 47) || // Special characters (!"#$%&'()*+,-./)
      (event.charCode >= 58 && event.charCode <= 64) || // Special characters (:;<=>?@)
      (event.charCode >= 91 && event.charCode <= 96) || // Special characters ([\]^_`)
      (event.charCode >= 123 && event.charCode <= 126) // Special characters ({|}~)
    );
  }

  Home_Page() {
    this.router.navigate(['/home']);
  }

  onSignInClick() {
    this.router.navigate(['/login']);
  }

  onNextClick() {
    // if (this.signUpForm.valid) {
    //   let signUpFromData = this.signUpForm.value;
    //   //this.registrationModel.userName = signUpFromData.UserName;
    //   //this.registrationModel.emailId = signUpFromData.EmailId;
    //  // this.registrationModel.mobileNo = signUpFromData.MobileNo;
    //  // this.signUpService.Register(this.registrationModel).subscribe((result: any) => {
    //    // let serviceResponse = result.Value;
    //     //if (serviceResponse.ResponseCode == ResponseCode.Success) {
    //       this.registrationModel.userId = serviceResponse.UserId;
    //       this.alertService.ShowSuccessMessage('Successfully Registered');
    //       this.isVerifyOTP = true;
    //       this.signUP = false;
    //     }
    //   },
    //   (error: any) => {
    //     this.alertService.ShowErrorMessage(error.error);
    //   });
    // }
  }

  backToSignUp() {
    this.signUP = true;
    this.EnterOTP = '';
  }

  backToOTP() {
    this.isVerifyOTP = true;
    this.signUP = false;
    this.createPass = false;
  }

  onClickVerifyOTP() {
    // if (this.EnterOTP) {
    //   this.signUpService.VerifyOTP(this.registrationModel.userId, this.EnterOTP).subscribe(
    //     (result: any) => {
    //       let serviceResponse = result.Value;
    //       if (serviceResponse == ResponseCode.Success) {
    //         this.alertService.ShowSuccessMessage('OTP Verified Successfully');
    //         this.createPass = true;
    //         this.isVerifyOTP = false;
    //         this.signUP = false;
    //       } else if (serviceResponse == ResponseCode.NotFound) {
    //         this.isShake = true;
    //         setTimeout(() => {
    //           this.isShake = false;
    //         }, 300);
    //         this.alertService.ShowErrorMessage("Invalid OTP");
    //       }
    //     },
    //     (error: any) => {
    //       this.alertService.ShowErrorMessage(error.error);
    //     });
    // } else {
    //   this.isShake = true;
    //   setTimeout(() => {
    //     this.isShake = false;
    //   }, 300);
    //   this.alertService.ShowErrorMessage("Please enter OTP");
    // }
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  toggleRePasswordTextType() {
    this.repasswordTextType = !this.repasswordTextType;
  }

  setPassword(setPasswordForm: NgForm) {
    // if (setPasswordForm) {
    //   let password = setPasswordForm.value.password;
    //   let confirmPassword = setPasswordForm.value.confirmPassword;

    //   if (password.trim().length > 0 && confirmPassword.trim().length > 0) {
    //     if (password === confirmPassword) {
    //       if (password.length >= 8) {
    //         this.registrationModel.passwordHash = password;
    //         this.signUpService.SetPassword(this.registrationModel).subscribe(
    //           (result: any) => {
    //             let serviceResponse = result.Value;
    //             if (serviceResponse.Item1 == ResponseCode.Success) {
    //               this.alertService.ShowSuccessMessage('Password Saved Successfully');
    //               this.loginService.setSession(serviceResponse.Item2);
    //               document.getElementById('afterSignUp').click();
    //             }
    //           },
    //         );
    //       } else {
    //         this.alertService.ShowErrorMessage("Please ensure your password contains at least 8 characters.");
    //       }
    //     } else {
    //       this.alertService.ShowErrorMessage("Password & Re-Enter Password must be matched");
    //     }
    //   } else {
    //     this.alertService.ShowErrorMessage("Please enter the given fields.");
    //   }
    // } else {
    //   this.alertService.ShowErrorMessage("Please enter the given fields.");
    // }
  }

  validateNumber(event) {
    return (event.charCode >= 48 && event.charCode <= 57); // Numbers
  }

}
