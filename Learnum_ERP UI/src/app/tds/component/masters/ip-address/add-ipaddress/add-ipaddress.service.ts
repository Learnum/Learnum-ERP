import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddIpaddressService {

  private urlIPDetails: string = "EmployeeDetails/insertEmployeeDetails";
  private urlGetipdetails: string = "EmployeeDetails/insertEmployeeDetails";

  constructor(private http: HttpClient) { }

  // insertIPData(IpDetails: IPDetails): Observable<any> {
  //   return this.http.post(this.urlIPDetails, IpDetails);

  // }
  // getipDetails(): Observable<any> {
  //   return this.http.get(this.urlGetipdetails);
  // }


}
