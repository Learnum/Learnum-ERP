import { Injectable } from '@angular/core';
import { IdentityUser } from 'src/app/core/models/identty-user.model';
import { APIService } from 'src/app/core/services/apiService';
import { UserProfileService } from 'src/app/core/services/user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  tokenValid: boolean;
    constructor(private apiService: APIService, private userProfileService: UserProfileService) { }

    loginURL: string = "/Authentication/Account/Login";
    logOutURL: string = "/Account/LogOut";
    changePasswordURL: string = "/Account/ChangePassword";
    forgotPasswordURL: string = "/Account/ForgotPassword/";

    Login(loginModel: any) {
        let a = JSON.stringify(loginModel)
        console.log("-------------This loginModel ---------------" + a);
        return this.apiService.postData(this.loginURL, loginModel);
    }

    LogOff(UserID: number) {
        return this.apiService.getData(this.logOutURL + "?UserID=" + UserID)
    }

    setSession(authResult: IdentityUser) {
        this.userProfileService.SetUserData(authResult);
    }

    ChangePassword(loginModel: any) {
        return this.apiService.postData(this.changePasswordURL, loginModel);
    }

    ForgotPassword(loginModel: any) {
        return this.apiService.postData(this.forgotPasswordURL, loginModel);
    }

}
