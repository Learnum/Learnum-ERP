
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/core/services/baseService';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { ConfigurationSettings } from 'src/app/core/models/configuration';
import { BusinessDetails } from './businessdetails.model';


@Injectable({
  providedIn: 'root'
})
export class AddBusinessLeadService {

  private urlInsertBusinessDetails: string = "BusinessLeadDetails/InsertBusinessLeadDetails";
  private urlgeBusinesstList: string = "BusinessLeadDetails/getAllBusinessList";
  private urlGetBusinessDetails: string = "BusinessLeadDetails/getBuisnessDetails";
  private urlGetStateList: string = "ApplicationMaster/GetAllStates";

  constructor(private apiService: APIService) {}

  InsertBusinessDetails(businessLeadDetails: BusinessDetails) {
    return this.apiService.postBlob(this.urlInsertBusinessDetails,businessLeadDetails);
  }
  getBusinessList() {
    return this.apiService.getData(this.urlgeBusinesstList);
  }
  getBusinessDetails(BusinessId: number) {
    return this.apiService.getData(this.urlGetBusinessDetails + '/' + BusinessId);
  }
  getStateList() {
    return this.apiService.getData(this.urlGetStateList);
  }
}
