import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { TrainerDetailsModel } from './trainerdetails.model';


@Injectable({
  providedIn: 'root'
})
export class AddtrainerService extends BaseService {

  private httpClientWithoutInterceptor: HttpClient;

  private urlInsertTrainerDetails: string = "TrainerDetails/InsertTrainerDetails";
  private urlgetTrainerList: string = "TrainerDetails/getAllTrainerList";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";
  private urlgetCourseList: string = "CourseDetails/getAllCourseList";
  private urlgetSubjectList: string = "SubjectDetails/getAllSubjectList";
  private urlgetBatchList: string = "BatchesDetails/getAllBatchesList";


  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertTrainerData(TrainerDetails: TrainerDetailsModel) {
    //const URL = ConfigurationSettings.BASE_API_URL;
    return this.apiService.postBlob(this.urlInsertTrainerDetails,TrainerDetails);
  }

  getTrainerList() {
    return this.apiService.getData(this.urlgetTrainerList);
  }

  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }

  getcourseList() {
    return this.apiService.getData(this.urlgetCourseList);
  }

  getsubjectList() {
    return this.apiService.getData(this.urlgetSubjectList);
  }


  getBatchList(){
    return this.apiService.getData(this.urlgetBatchList);
  }
}
