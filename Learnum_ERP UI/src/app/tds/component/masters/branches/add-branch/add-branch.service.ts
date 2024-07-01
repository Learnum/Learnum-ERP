
import { BranchDetails } from './addbranch.model';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/core/services/baseService';

@Injectable({
  providedIn: 'root'
})
export class AddBranchService extends BaseService {

  private urlInsertBranchDetails: string = "BranchDetails/insertBranchDetails";

  constructor(private apiService: APIService) {
    super();
  }

  insertBranchData(branchDetails: BranchDetails) {
    return this.apiService.postData(this.urlInsertBranchDetails,branchDetails);
  }

  
}
