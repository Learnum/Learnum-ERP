import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
//import { ForgetPasswordService } from '../forgot-password/forgot-password.service';
//import { UserProfileService } from 'app/core/services/user-profile.service';
//import { ChangePasswordModel } from './ChangePasswordModel';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('changePasswordForm', { static: true }) ngForm: any;
  changePasswordForm: FormGroup;
  passwordTextType = false;
  newpasswordTextType = false;
  confirmNewpasswordTextType = false;
  submitted = false;
  isValidating = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    ///private forgetPasswordService: ForgetPasswordService,
    //private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      NewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      PasswordHash: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  toggleNewPasswordTextType() {
    this.newpasswordTextType = !this.newpasswordTextType;
  }

  toggleConfirmNewPasswordTextType() {
    this.confirmNewpasswordTextType = !this.confirmNewpasswordTextType;
  }

  notAllowSpace(event: KeyboardEvent) {
    if (event.charCode == 32) {
      event.preventDefault();
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.changePasswordForm.invalid) {
      return;
    }

    const newPasswordControl = this.f.NewPassword;
    const oldPasswordControl = this.f.PasswordHash;
    const confirmPasswordControl = this.f.confirmNewPassword;

    if (!newPasswordControl.value || !oldPasswordControl.value || !confirmPasswordControl.value) {
      this.alertService.ShowErrorMessage("All fields are mandatory.");
      return;
    }

    if (newPasswordControl.value !== confirmPasswordControl.value) {
      this.alertService.ShowWarningMessage("Both New and Re-Enter Password are not matched.");
      return;
    }

    // const changePasswordModel: ChangePasswordModel = {
    //   ...this.changePasswordForm.value,
    //   UserId: this.userProfileService.getUserId(),
    //   AddedBy: this.userProfileService.getUserId(),
    //   AddedDate: new Date(),
    //   UpdatedBy: this.userProfileService.getUserId(),
    //   UpdatedDate: new Date()
    // };

    this.isValidating = true;

    // this.forgetPasswordService.ChangePassword(changePasswordModel).subscribe(
    //   (result: any) => {
    //     this.isValidating = false;
    //     if (result.Value === 10004) {
    //       this.alertService.ShowErrorMessage("Please Enter Correct Old Password");
    //     } else {
    //       this.alertService.ShowSuccessMessage("Password change Successfully");
    //       this.userProfileService.SetUserData(null);
    //       this.router.navigateByUrl('/login');
    //     }
    //   },
    //   (error: any) => {
    //     this.isValidating = false;
    //     this.alertService.ShowError(error, "Failed to proceed due to unknown error");
    //   }
    // );
  }
}
