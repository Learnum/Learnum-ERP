import { Injectable } from "@angular/core";
import { StateService } from "./state-service.service";
import { BehaviorSubject, Observable } from 'rxjs';

import { CookieService } from "ngx-cookie-service";
import { IdentityUser } from "../models/identty-user.model";
import { StateKeys } from "../models/state-keys.model";
import { environment } from "src/environments/environment";
import { APIService } from "./apiService";

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  
    //public
    public currentUser: Observable<IdentityUser>;

    public currentUserSubject: BehaviorSubject<IdentityUser>;
    private urlInsertUserAccessDetails: string = "ApplicationMaster/insertUserAccessDetils";

    constructor(private stateService: StateService,
                private cookieService: CookieService,
                private apiService: APIService
                ) {

        this.currentUserSubject = new BehaviorSubject<IdentityUser>(this.stateService.getData(StateKeys.UserData));
        this.currentUser = this.currentUserSubject.asObservable();
    

     }

     public get CurrentUserValue(): IdentityUser {
        return this.currentUserSubject.value;
      }

    // SetUserData(userData: IdentityUser) {
    //     this.stateService.SetData(StateKeys.UserData, userData);
    //     this.currentUserSubject.next(userData);
    // }

    SetUserData(userData: IdentityUser) {
      this.stateService.SetData(StateKeys.UserData, userData);
      if (userData != undefined && userData != null) {
        this.cookieService.set(
          environment.AUTH_COOKIE_NAME,
          JSON.stringify(userData),
          { domain: environment.DOMAIN }
        );
        // if (userData.EnableBackOffice) {
        //   window.location.href = environment.CRM_APP_URL;
        // }
      } else {
        this.cookieService.delete(environment.AUTH_COOKIE_NAME,"/",environment.DOMAIN);
        this.cookieService.delete(environment.AUTH_COOKIE_NAME,"/");
      }
  
      this.currentUserSubject.next(userData);
      //this.postCrossDomainMessage(APPNames.CRM,environment.CRM_APP_URL,userData);
    }
  

    
    GetUserData() {
      return this.stateService.getData(StateKeys.UserData);
    }


    getUserId(): number {
      let userId : number ;
      if(this.CurrentUserValue)
      {
        userId  = this.CurrentUserValue.UserId;
      }
      return userId;
    }

    InsertUserAccessDetails(userAccessdetails){
    return this.apiService.postData(this.urlInsertUserAccessDetails,userAccessdetails);

    }
    

    logout() {
      this.SetUserData(null);
      window.location.href = environment.WebsiteURL;
    }
}