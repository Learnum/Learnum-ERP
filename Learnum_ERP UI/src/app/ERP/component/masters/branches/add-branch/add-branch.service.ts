
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

  private urlInsertBranchDetails: string = "BranchDetails/InsertBranchDetails";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";
  private urlGetBranch: string = "BranchDetails/getBranchDetails";
  private getAllStatesURL : string = "ApplicationMaster/GetAllStates";
  //private getAllCityURL : string = "ApplicationMaster/LoadStateWiseCities";
 

  constructor(private apiService: APIService, private httpBackend: HttpBackend,private http: HttpClient) {
    super();
  }

  insertBranchData(branchDetails: BranchDetailsModel) {
    return this.apiService.postBlob(this.urlInsertBranchDetails,branchDetails);
  }
  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }
  getBranchDetails(branchId: number) {
    return this.apiService.getData(this.urlGetBranch + '/' + branchId);
  }

  getAllStates(){
    return this.apiService.getData(this.getAllStatesURL);
   }

 

   checkBranchNameExists(branchName: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/branches/exists?name=${branchName}`);
  }
}
