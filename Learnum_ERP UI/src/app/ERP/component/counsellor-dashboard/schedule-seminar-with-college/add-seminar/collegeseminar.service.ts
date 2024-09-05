import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import {SeminarDetailsModel } from './collegeseminar.model';
import { BaseService } from 'src/app/core/services/baseService';


@Injectable({
  providedIn: 'root'
})
export class CollegeseminarService  {
 

  private urlInsertSeminarDetails: string = "ScheduleSeminarDetails/InsertScheduleSeminarDetails";
  private getSeminarList: string = "ScheduleSeminarDetails/getAllScheduleSeminarList";
  private urlGetSeminar: string = "ScheduleSeminarDetails/getSeminarDetails";
  private urlgetCollegesList: string = "AddColleges/getAllCollegeList";

  constructor(private apiService: APIService) {
    
  }
  insertSeminarDetails(scheduleSeminarDetails: SeminarDetailsModel) {
    return this.apiService.postBlob(this.urlInsertSeminarDetails,scheduleSeminarDetails);
  }
  getCollegeSeminarList() {
    return this.apiService.getData(this.getSeminarList);
  }
  getCollegeList() {
    return this.apiService.getData(this.urlgetCollegesList);
  }
  getSeminarDetails(seminarId: number) {
    return this.apiService.getData(this.urlGetSeminar + '/' + seminarId);
  }
}
