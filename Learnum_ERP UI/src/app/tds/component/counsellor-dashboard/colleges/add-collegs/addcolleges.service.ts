import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { AddcollegesDetails, CollegeContactDetails } from './addcolleges.model';

@Injectable({
  providedIn: 'root'
})
export class AddcollegesService {

  
  private urlInsertCollegesDetails: string = "AddColleges/InsertCollegesDetails";
  private urlgetJobRoleList: string = "ApplicationMaster/GetAllJobrole";
  private urlgetCollegeList: string = "ApplicationMaster/GetAllColleges";
  private getAllStatesURL: string = "ApplicationMaster/GetAllStates";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";


  constructor(private apiService: APIService) { }

  insertCollegesData(collegeContactDetails: CollegeContactDetails) {
    return this.apiService.postData(this.urlInsertCollegesDetails,collegeContactDetails);
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
}
