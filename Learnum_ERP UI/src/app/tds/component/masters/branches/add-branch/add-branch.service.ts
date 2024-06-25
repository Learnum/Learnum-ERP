import { Injectable } from '@angular/core';
import { BranchDetails } from './addbranch.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIService } from 'src/app/core/services/apiService';

@Injectable({
  providedIn: 'root'
})
export class AddBranchService {
  //private apiUrl = 'https://localhost:7189/api/'; // Replace with your API endpoint

  private urlbranchDetails: string = "BranchDetails/InsertBranchDetails";

  constructor(private http: HttpClient,private apiService: APIService) { }

  insertaddBranchData(branchDetails: BranchDetails){
    return this.apiService.postData(this.urlbranchDetails, branchDetails);

    // return this.http.post(this.apiUrl + this.urlbranchDetails, branchDetails, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // });
  }

}
