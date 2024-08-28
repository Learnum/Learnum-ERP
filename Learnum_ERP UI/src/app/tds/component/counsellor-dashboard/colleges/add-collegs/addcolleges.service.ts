import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { AddcollegesDetails, CollegeContactDetails } from './addcolleges.model';

@Injectable({
  providedIn: 'root'
})
export class AddcollegesService {

  
  private urlInsertCollegesDetails: string = "AddColleges/InsertCollegesDetails";
  private urlgetAddColleges: string = "AddColleges/getAllCollegeList";
  private urlgetCollegesDetailsByCollegeId: string = "AddColleges/getCollegeDetailsByCollegeId";
  private urlgetJobRoleList: string = "ApplicationMaster/GetAllJobrole";
  private urlgetCollegeList: string = "ApplicationMaster/GetAllColleges";
  private getAllStatesURL: string = "ApplicationMaster/GetAllStates";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";

  constructor(private apiService: APIService) { }

  insertCollegesData(data: any) {
    return this.apiService.postData(this.urlInsertCollegesDetails,data);
  }
  getroleList() {
    return this.apiService.getData(this.urlgetJobRoleList);
  }
  getCollegeList() {
    return this.apiService.getData(this.urlgetCollegeList);
  }
  getAllStates() {
    return this.apiService.getData(this.getAllStatesURL);
  }
  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }
  AddCollegesList() {
    return this.apiService.getData(this.urlgetAddColleges);
  }
  getCollegesDetailsByCollegeId(collegeId: number) {
    return this.apiService.getData(this.urlgetCollegesDetailsByCollegeId + '/' + collegeId);
  }
}
