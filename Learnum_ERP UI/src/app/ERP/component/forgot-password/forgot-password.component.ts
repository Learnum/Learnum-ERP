import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { LoginModel } from './loginModel';
import { ActivatedRoute, Router } from '@angular/router';
//import { ForgetPasswordService } from './forgot-password.service';
import { AlertService } from 'src/app/core/services/alertService';
//import { UserProfileService } from 'app/core/services/user-profile.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @ViewChild('forgotPasswordForm', { static: true }) forgotPasswordForm: NgForm;
  //loginModel: LoginModel;
  EnterOtp: boolean = false;
  UserData: any;

  constructor(
    private router: Router,
   // private forgetPasswordService: ForgetPasswordService,
    private alertService: AlertService,
    //private userService: UserProfileService
  ) {}

  ngOnInit() {
    //this.loginModel = new LoginModel();
  }

  onSubmit(forgotPasswordForm: NgForm): void {
    // if (forgotPasswordForm.valid) {
    //   const userName = this.loginModel.UserName;
    //   this.forgetPasswordService.VerifyAccount(userName).subscribe(
    //     (result: any) => {
    //       this.UserData = result.Value;
    //       this.alertService.ShowSuccessMessage("OTP sent on your registered Email ID");
    //       this.EnterOtp = true;
    //     },
    //     (error: any) => {
    //       this.alertService.ShowError(error, "Failed to send OTP due to unknown error");
    //     }
    //   );
    // } else {
    //   this.alertService.ShowErrorMessage("Validation Failed");
    // }
  }

  ConfirmOTP(forgotPasswordForm: NgForm): void {
    // if (forgotPasswordForm.valid) {
    //   const otpData = { ...this.loginModel, UserId: this.UserData.UserId };
    //   this.forgetPasswordService.VerifyOTP(otpData).subscribe(
    //     (result: any) => {
    //       if (result.Value === 10004) {
    //         this.alertService.ShowErrorMessage("Please Enter Valid OTP");
    //         forgotPasswordForm.reset();
    //       } else {
    //         this.alertService.ShowSuccessMessage("OTP Verified Successfully");
    //         this.router.navigate(['/reset-password'], { queryParams: { UserId: this.UserData.UserId, UserName: this.UserData.UserName } });
    //       }
    //     },
    //     (error: any) => {
    //       this.alertService.ShowError(error, "Failed to proceed due to unknown error");
    //     }
    //   );
    // } else {
    //   this.alertService.ShowErrorMessage("Validation Failed.");
    // }
  }

  resendOTP(): void {
    // const userName = this.loginModel.UserName;
    // this.forgetPasswordService.VerifyAccount(userName).subscribe(
    //   (result: any) => {
    //     this.UserData = result.Value;
    //     this.alertService.ShowSuccessMessage("OTP sent on your registered Email ID");
    //   },
    //   (error: any) => {
    //     this.alertService.ShowError(error, "Failed to send OTP due to unknown error");
    //   }
    // );
  }

  SendOTP(forgotPasswordForm: NgForm): void {
    if (forgotPasswordForm && forgotPasswordForm.valid) {
      // let userName = this.loginModel.UserName;
  //     this.forgetPasswordService.VerifyAccount(userName).subscribe(
  //       (result: any) => {
  //      let data = result.Value;
  //      this.UserData = data
  //         this.alertService.ShowSuccessMessage("OTP sent on your register Email ID");
  //         this.EnterOtp=true
  //       },
  //       (error:any) => {
  //         this.alertService.ShowError(error,"Failed to send OTP due to unknown error");
  //  }
  //     );
    }
    else {
      this.alertService.ShowErrorMessage("Validation Failed");
    }
  }

  Home_Page(): void {
    this.router.navigate(['/home']);
  }

  onSignInClick(): void {
    this.router.navigate(['/login']);
  }

  validateNumber(event: KeyboardEvent): boolean {
    const charCode = event.charCode;
    return charCode >= 48 && charCode <= 57; // Numbers only
  }

}
