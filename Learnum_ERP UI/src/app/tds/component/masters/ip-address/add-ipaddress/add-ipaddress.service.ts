import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { IPAddressDetailsModel } from './Ipaddress.model';

@Injectable({
  providedIn: 'root'
})
export class AddIpaddressService extends BaseService {

  private urlIPDetails: string = "LocationDetails/InsertLocationDetails";
  private urlGetipdetails: string = "LocationDetails/getAllLocationList";

  constructor(private apiService: APIService,private http: HttpClient) {
    super();
   }

  insertIPAddress(locationDetails: IPAddressDetailsModel) {
    return this.apiService.postBlob(this.urlIPDetails,locationDetails);
  }

  getLocationList() {
    return this.apiService.getData(this.urlGetipdetails);
  }


}
