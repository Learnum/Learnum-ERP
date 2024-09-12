import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { SyllabusDetailsModel, TopicInformationModel } from './syllabusDetailsModel';
import { Observable } from 'rxjs';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddsyllabusService {

  private urlInsertSyllabusDetails: string = "SyllabusDetails/InsertSyllabusDetails";
  private urlgetAddSyllabusDetailsById: string = "SyllabusDetails/getSyllabusDetailsById";
  private urlgetSyllabusList: string = "SyllabusDetails/getSyllabusDetails";
  private urlgetCourseList: string = "CourseDetails/getAllCourseList";
  private urlgetSubjectList: string = "SubjectDetails/getAllSubjectList";
  httpClientWithoutInterceptor: any;

  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
  
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertSyllabusData( data:any) {

   
    const formData: FormData = new FormData();
    formData.append('topicInformationModel', JSON.stringify(data.topicInformationModel));
    formData.append('syllabusDetailsModel', JSON.stringify(data.syllabusDetailsModel));

    // formData.append('File', TopicInformationModel.file[0]);
    // console.log(formData);
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
