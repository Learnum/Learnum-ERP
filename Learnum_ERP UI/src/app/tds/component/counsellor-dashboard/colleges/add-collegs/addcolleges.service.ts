import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { AddcollegesDetails, CollegeContactDetails } from './addcolleges.model';

@Injectable({
  providedIn: 'root'
})
export class AddcollegesService {

  
  private urlInsertCollegesDetails: string = "AddColleges/InsertCollegesDetails";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";

  constructor(private apiService: APIService) { }

  insertCollegesData(collegeContactDetails: CollegeContactDetails) {
    return this.apiService.postData(this.urlInsertCollegesDetails,collegeContactDetails);
  }

  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }
}
