import { Injectable } from '@angular/core';
//import { ConfigurationSettings } from 'app/core/models/configuration';
//import { SignUpModel } from 'app/core/models/SignUpModel';
import { APIService } from 'src/app/core/services/apiService';
//import { UserProfileService } from 'src/app/core/services/user-profile.service.ts';
import { RegistrationMaster } from './registration-master.model';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { SignUpModel } from '../../model/SignUpModel';
import { ConfigurationSettings } from 'src/app/core/models/configuration';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  signUpURL: string = '/Authentication/Account/registration';
  urlGetDisclaimer: string = '/Masters/EmployeeMaster/search-organization';
  setPasswordURL: string = '/Authentication/Account/UpdatePassword';
  verifyOTPURL: string = '/Authentication/Account/VerifyOTP';
 
  constructor(
    private apiService: APIService,
    private userProfileService: UserProfileService
  ) { }

  Register(registrationModel: RegistrationMaster) {
    let a = JSON.stringify(registrationModel)
    console.log("-------------This SignUpMODEL ---------------" + a);
    return this.apiService.postData(this.signUpURL, registrationModel);
  }

  VerifyOTP(UserId: number, EnteredOTP : number) {
    return this.apiService.getData(this.verifyOTPURL + "/" + UserId + "/" + EnteredOTP);
  }
  GetDisclaimer() {
    return this.apiService.getData(this.urlGetDisclaimer);
  }
  SetPassword(registrationModel: RegistrationMaster) {
    let b = JSON.stringify(registrationModel)
    console.log("==========Create PAssword============"+b);
    return this.apiService.postData(this.setPasswordURL, registrationModel);
  }
}
