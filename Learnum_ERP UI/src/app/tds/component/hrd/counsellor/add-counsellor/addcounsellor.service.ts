import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { CounsellorsPlaningModel } from './addcounsellor.model';

@Injectable({
  providedIn: 'root'
})
export class AddcounsellorService extends BaseService{

  private httpClientWithoutInterceptor: HttpClient;

  private urlInsertBranchManagerDetails: string = "BranchCounsellorDetails/InsertBranchCounsellorDetails";
  private urlgetcounsellorList: string = "BranchCounsellorDetails/getAllBranchCounsellorList";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";


  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertcounsellorData(branchCounsellorDetails: CounsellorsPlaningModel) {
    return this.apiService.postBlob(this.urlInsertBranchManagerDetails,branchCounsellorDetails);
  }

  getcounsellorList(){
    return this.apiService.getData(this.urlgetcounsellorList);
  }

  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }
}
