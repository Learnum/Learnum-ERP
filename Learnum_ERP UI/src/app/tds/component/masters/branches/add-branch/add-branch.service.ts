
import { BranchDetailsModel } from './addbranch.model';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/core/services/baseService';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { ConfigurationSettings } from 'src/app/core/models/configuration';

@Injectable({
  providedIn: 'root'
})
export class AddBranchService extends BaseService {
 
  private httpClientWithoutInterceptor: HttpClient;

  private urlInsertBranchDetails: string = "BranchDetails/InsertBranchDetails";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";

  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertBranchData(branchDetails: BranchDetailsModel) {
    return this.apiService.postBlob(this.urlInsertBranchDetails,branchDetails);
  }

  

  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }
}
