import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private urlgetCourseList: string = "BranchDetails/getAllBranchList";

  constructor(private apiService: APIService) {
  }

  getCourseList(){
    return this.apiService.getData(this.urlgetCourseList);
  }
}
