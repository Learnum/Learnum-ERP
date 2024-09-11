import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';

@Injectable({
  providedIn: 'root'
})
export class AddsyllabusService {

  private urlInsertSyllabusDetails: string = "SyllabusDetails/InsertSyllabusDetails";
  private urlgetAddSyllabusDetailsById: string = "SyllabusDetails/getSyllabusDetailsById";
  private urlgetSyllabusList: string = "SyllabusDetails/getSyllabusDetails";
  private urlgetCourseList: string = "CourseDetails/getAllCourseList";
  private urlgetSubjectList: string = "SubjectDetails/getAllSubjectList";

  constructor(private apiService: APIService) {}

  insertSyllabusData(data: any) {
    return this.apiService.postData(this.urlInsertSyllabusDetails,data);
  }

  getAddSyllabusDetailsById(syllabusId: number) {
    return this.apiService.getData(this.urlgetAddSyllabusDetailsById + '/' + syllabusId);
  }

  
  getSyllabusDetails()
 {
   return this.apiService.getData(this.urlgetSyllabusList);
 }


  getcourseList() {
    return this.apiService.getData(this.urlgetCourseList);
  }
  getsubjectList() {
    return this.apiService.getData(this.urlgetSubjectList);
  }
}
