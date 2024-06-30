import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { UserProfileService } from './core/services/user-profile.service';
import { AccessUserDetails } from './core/models/UserAccessDetails';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'POI';
  constructor(
    // private _userProfileService: UserProfileService,
    // private _cookieService: CookieService,
  ) {}

  ngOnInit() {
    // this.CheckAuthentication();
  }

  // CheckAuthentication() {
  //   var userData = this._cookieService.get(environment.AUTH_COOKIE_NAME);
  //   console.log('data >>>>>>>',userData)
  //   //token 
  //   if (!environment.production && !userData) {
  //     this._cookieService.set(
  //       environment.AUTH_COOKIE_NAME,
  //       '{"ComputerName":"DESKTOP-BPJ4AFB","EnableBackOffice":false,"RoleId":4,"IdentityUserId":null,"UserId":128991,"UserName":"demo5@gmail.com","PasswordHash":null,"Email":"demo5@gmail.com","EmailConfirmed":null,"SecurityStamp":null,"PhoneNumber":null,"PhoneNumberConfirmed":null,"TwoFactorEnabled":null,"LockoutEndDateUtc":"0001-01-01T00:00:00+05:30","LockoutEnabled":null,"AccessFailedCount":0,"SID":0,"IsActive":null,"URID":"00000000-0000-0000-0000-000000000000","ApplicationToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZW1vNUBnbWFpbC5jb20iLCJqdGkiOlsiZDM0Mzk2MzItMDdhOS00MjlmLTk0YmQtYTgxZWFlZWNiZWFmIiwiNGI4ZjE4M2ItNzFiNi00ZGJjLThlMDYtMTIyZjBkNWE5YWJiIl0sImlhdCI6IjE3LTEwLTIwMjIgMDE6MTc6MzUgUE0iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxMjg5OTEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZGVtbzVAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwOS8wOS9pZGVudGl0eS9jbGFpbXMvYWN0b3IiOiJBZG1pbiIsIlVzZXJJZCI6IjEyODk5MSIsIkVtYWlsSWQiOiJkZW1vNUBnbWFpbC5jb20iLCJleHAiOjE2NjYxMTcwNTUsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NjI3MDMvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo2MjcwMy8ifQ.JG9sDIlyYpUMSrMNuYycXOx6f4KOu5Lq3Si4P7MvbEM","AddedBy":null,"AddedDate":null,"UpdatedBy":null,"UpdatedDate":null}',
  //       { domain: environment.DOMAIN }
  //     );

  //     userData = this._cookieService.get(environment.AUTH_COOKIE_NAME);
  //   }

  //   if (userData) {
  //     this._userProfileService.SetUserData(JSON.parse(userData));
  //     this.InsertUserAccessDetails(JSON.parse(userData))
  //   } else {
  //     this._userProfileService.SetUserData(null);

  //     window.location.href = environment.WebsiteURL;
  //   }
  // }

  // InsertUserAccessDetails(userdata){
  //   let userAccessdetails = new AccessUserDetails()

  //   userAccessdetails.UserId = userdata.UserId;
  //   userAccessdetails.UserName = userdata.UserName;
  //   userAccessdetails.RoleId = userdata.RoleId; 
  //   userAccessdetails.ApplicationToken = userdata.ApplicationToken;
  //   userAccessdetails.IsActive = true;
  //   userAccessdetails.IdentityUserId = 0;
  //   userAccessdetails.AccessCount = 0;
  //   userAccessdetails.AccessUserDetailId = 0;
  //   userAccessdetails.AddedBy = userdata.UserId;
  //   userAccessdetails.AddedDate = new Date();
  //   userAccessdetails.UpdatedBy = userdata.UserId;
  //   userAccessdetails.UpdatedDate = new Date();

  //   this._userProfileService.InsertUserAccessDetails(userAccessdetails).subscribe(res =>{

  //   })
  // }
}
