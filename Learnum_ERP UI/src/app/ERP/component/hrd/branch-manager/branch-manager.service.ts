import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';

@Injectable({
  providedIn: 'root'
})
export class BranchManagerService extends BaseService 
{

  private httpClientWithoutInterceptor: HttpClient;

  private urlInsertBranchManagerDetails: string = "BranchManagerDetails/InsertBranchManagerDetails";

  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  // insertBranchManagerData(branchDetails: BranchDetailsModel) {
  //   //const URL = ConfigurationSettings.BASE_API_URL;
  //   return this.apiService.postBlob(this.urlInsertBranchDetails,branchDetails);
  // }
}