import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddClassroomsService 
{
  // insertIPData(IpDetails: IPDetails): Observable<any> {
  //   return this.http.post(this.urlIPDetails, IpDetails);

  // }
  // insertIPData(branchDetails: any) {
  //   throw new Error('Method not implemented.');
  // }

  constructor(private http: HttpClient) { }
}
