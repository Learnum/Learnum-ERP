import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';

@Injectable({
  providedIn: 'root'
})
export class AddcollegesService {

  
 // private urlInsertBranchDetails: string = "BranchDetails/InsertBranchDetails";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";

  constructor(private apiService: APIService) { }

  // insertBranchData(branchDetails: BranchDetailsModel) {
  //   return this.apiService.postBlob(this.urlInsertBranchDetails,branchDetails);
  // }

  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }
}
