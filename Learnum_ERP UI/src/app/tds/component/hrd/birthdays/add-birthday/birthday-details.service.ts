import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { BirthdayDetailsModel } from './BirthDayDetails.model';

@Injectable({
  providedIn: 'root'
})
export class BirthdayDetailsService extends BaseService{

  private httpClientWithoutInterceptor: HttpClient;

  private urlInsertBirthdayDetails: string = "BirthdayDetails/InsertBirthdayDetails";
  private urlBirthdayDetailsList: string = "BirthdayDetails/getAllBirthdayList";

  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertBirthdayData(BirthdayDetails: BirthdayDetailsModel) {
    return this.apiService.postBlob(this.urlInsertBirthdayDetails,BirthdayDetails);
  }
  
  getBirthdayList(){
    return this.apiService.getData(this.urlBirthdayDetailsList);
  }
}
