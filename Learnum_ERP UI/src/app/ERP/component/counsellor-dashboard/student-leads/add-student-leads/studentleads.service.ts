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
  private urlgetCollegesList: string = "AddColleges/getAllCollegeList";
  private urlGetStudentList: string = "StudentLeadDetails/getStudentDetails";
  private getAllStatesURL : string = "ApplicationMaster/GetAllStates";

  
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
  getStudentDetails(studentId: number) {
    return this.apiService.getData(this.urlGetStudentList + '/' + studentId);
  }

  getAllStates(){
    return this.apiService.getData(this.getAllStatesURL);
   }
}
