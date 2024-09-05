
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
  private urlgeBusinesstList: string = "BusinessLeadDetails/GetAllBusinessLeadDetails";
  private urlGetBusinessDetails: string = "BusinessLeadDetails/getBusinessLeadDetails";
  private getAllStatesURL: string = "ApplicationMaster/GetAllStates";
  private getAllCountriesURL: string = "ApplicationMaster/getAllCountry";

  constructor(private apiService: APIService) { }

  InsertBusinessDetails(businessLeadDetails: BusinessDetails) {
    return this.apiService.postBlob(this.urlInsertBusinessDetails, businessLeadDetails);
  }
  getBusinessList() {
    return this.apiService.getData(this.urlgeBusinesstList);
  }
  getBusinessDetails(BusinessId: number) {
    return this.apiService.getData(this.urlGetBusinessDetails + '/' + BusinessId);
  }
  getAllStates() {
    return this.apiService.getData(this.getAllStatesURL);
  }
  getAllCountries() {
    return this.apiService.getData(this.getAllCountriesURL);
  }
}
