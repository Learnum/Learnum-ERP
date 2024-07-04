
import { BranchDetails } from './addbranch.model';
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

  private urlInsertBranchDetails: string = "BranchDetails/insertBranchDetails";

  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertBranchData(branchDetails: BranchDetails) {
    const URL = ConfigurationSettings.BASE_API_URL;
    return this.httpClientWithoutInterceptor.post(URL + this.urlInsertBranchDetails,branchDetails);
  }

  
}
