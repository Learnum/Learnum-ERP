import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { coursesDetailsModel } from './coursesDetails.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCoursesService extends BaseService{

  private httpClientWithoutInterceptor: HttpClient;

  private urlInsertCourseDetails: string = "CourseDetails/InsertCourseDetails";
  private urlgetCourseList: string = "CourseDetails/getAllCourseList";

  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertCourseData(coursesDetails: coursesDetailsModel) : Observable<any> {
     let coursesDetailsModel1 : coursesDetailsModel = new coursesDetailsModel()
     coursesDetailsModel1.courseName = coursesDetails.courseName ;
     coursesDetailsModel1.description = coursesDetails.description ;
     coursesDetailsModel1.isActive = coursesDetails.isActive ;

    const formData: FormData = new FormData();
    formData.append('CourseDetailsModel', JSON.stringify(coursesDetails));
   
    formData.append('File', coursesDetails.file[0]);
    console.log(formData);
    return this.apiService.postBlob(this.urlInsertCourseDetails,formData);
  } 

  getCourseList() {
    return this.apiService.getData(this.urlgetCourseList);
  }

  
}
