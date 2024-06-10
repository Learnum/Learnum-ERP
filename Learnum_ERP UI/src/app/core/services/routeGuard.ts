import { Injectable, OnDestroy } from "@angular/core";
import {
  CanActivate,
  NavigationEnd,
  NavigationStart,
  Router,
} from "@angular/router";

import { Subscription } from "rxjs";
import { UserProfileService } from "./user-profile.service";

@Injectable({ providedIn: "root" })
export class RouteGuard implements CanActivate {
  private routerSubscription: Subscription;

  constructor(
   private userService: UserProfileService,
    private route: Router) { }

    canActivate() 
    {
        console.log("Gaurd invoked")
        var userData = this.userService.CurrentUserValue;
        if (userData != null && userData != undefined) 
        {
            console.log("Valid User")
            return true;
        }
        else {
            return false;
        }
        return true;
    }
  
}
