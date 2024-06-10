import { Injectable } from '@angular/core';
import { BranchDetails } from './addbranch.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddBranchService {

  private urlbranchDetails: string = "EmployeeDetails/insertEmployeeDetails";
  private urlGetBranch: string = "EmployeeDetails/insertEmployeeDetails";

  constructor(private http: HttpClient) { }

  insertBranchData(branchDetails: BranchDetails): Observable<any>{
    return this.http.post(this.urlbranchDetails, branchDetails);
  }

  getBranchDetails():Observable<any>{
    return this.http.get(this.urlGetBranch );
  }

}
