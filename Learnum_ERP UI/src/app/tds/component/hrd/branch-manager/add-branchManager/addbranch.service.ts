import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { branchManagerDetailsModel } from './branchManagerDetailsModel';

@Injectable({
  providedIn: 'root'
})
export class AddbranchManagerService extends BaseService{

  private httpClientWithoutInterceptor: HttpClient;

  private urlInsertBranchManagerDetails: string = "BranchManagerDetails/InsertBranchManagerDetails";
  private urlgetBranchManagerList: string = "BranchManagerDetails/getAllBranchManagerList";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";
  private urlGetBranchManager: string = "BranchManagerDetails/getBranchManagerDetails";



  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertBranchManagerData(branchManagerDetails: branchManagerDetailsModel) {
    //const URL = ConfigurationSettings.BASE_API_URL;
    return this.apiService.postBlob(this.urlInsertBranchManagerDetails,branchManagerDetails);
  }

  getBranchManagerList(){
    return this.apiService.getData(this.urlgetBranchManagerList);
  }

  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }

  getBranchManagerDetails(BranchManagerId: number) {
    return this.apiService.getData(this.urlGetBranchManager+ '/' + BranchManagerId);
  }
}
