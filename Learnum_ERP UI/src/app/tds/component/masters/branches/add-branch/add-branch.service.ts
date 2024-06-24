import { Injectable } from '@angular/core';
import { BranchDetails } from './addbranch.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIService } from 'src/app/core/services/apiService';

@Injectable({
  providedIn: 'root'
})
export class AddBranchService {

  private urlbranchDetails: string = "BranchDetails/InsertBranchDetails";

  constructor(private http: HttpClient,private apiService: APIService) { }

  insertaddBranchData(branchDetails: BranchDetails){
    return this.apiService.postData(this.urlbranchDetails, branchDetails);
  }

}
