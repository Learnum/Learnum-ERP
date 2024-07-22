import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { StudentLeadDetails } from './studentleads.model';

@Injectable({
  providedIn: 'root'
})
export class StudentleadsService {

  private urlInsertStudentLeadsDetails: string = "StudentLeadDetails/InsertStudentLeadDetails";
  private urlStudentLeadsdetails: string = "StudentLeadDetails/getAllStudentLeadList";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";
  private urlgetCollegesList: string = "AddColleges/getAllCollegesList";

  constructor(private apiService: APIService) { }

  insertStudentLeads(studentLeadDetails: StudentLeadDetails) {
    return this.apiService.postBlob(this.urlInsertStudentLeadsDetails,studentLeadDetails);
  }
  getStudentLeads() {
    return this.apiService.getData(this.urlStudentLeadsdetails);
  }
   getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }
  getCollegeList() {
    return this.apiService.getData(this.urlgetCollegesList);
  }

}
