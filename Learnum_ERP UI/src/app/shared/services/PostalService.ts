import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn:'root'
})
export class PostelService{
    constructor(private http:HttpClient){}
    

    getData(pincode){
      let url= "https://api.postalpincode.in/pincode/" + pincode;
      return this.http.get(url);
    }
}