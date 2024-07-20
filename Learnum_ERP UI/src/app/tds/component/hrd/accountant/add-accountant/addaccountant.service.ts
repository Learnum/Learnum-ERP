import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { BranchAccountantDetailsModel } from './accountantdetails.model';

@Injectable({
  providedIn: 'root'
})
export class AddaccountantService extends BaseService{

  
  private httpClientWithoutInterceptor: HttpClient;

  private urlBranchAccountantDetails: string = "BranchAccountantDetails/InsertBranchAccountantDetails";
  private urlgetBranchAccountantList: string = "BranchAccountantDetails/getAllBranchAccountantList";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";

  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertBranchAccountantData(BranchAccountantDetails: BranchAccountantDetailsModel) {
    //const URL = ConfigurationSettings.BASE_API_URL;
    return this.apiService.postBlob(this.urlBranchAccountantDetails,BranchAccountantDetails);
  }
 
  getbranchaccountantList(){
    return this.apiService.getData(this.urlgetBranchAccountantList);
  }
  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }

}
