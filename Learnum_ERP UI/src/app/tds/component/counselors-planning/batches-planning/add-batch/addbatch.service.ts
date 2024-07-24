import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { BatchesDetailsReqModel } from './batchDetails.model';

@Injectable({
  providedIn: 'root'
})
export class AddbatchService extends BaseService {

  private httpClientWithoutInterceptor: HttpClient;

  private urlInsertbatchDetails: string = "AddBatch/AddBatchDetails";
  private urlgetbatchList: string = "AddBatch/getAllAddBatchList";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";
  private urlgetCourseList: string = "CourseDetails/getAllCourseList";


  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertBatchData(coursesDetails : any) {

    let batchDetailreqmodel: BatchesDetailsReqModel = new BatchesDetailsReqModel();
    // BatchesDetailsReqModel.batchesDetailsModel.addedBy = 1;
    // BatchesDetailsReqModel.BatchesDetailsModel.addedDate = new Date();
    // BatchesDetailsReqModel.BatchesDetailsModel.updatedBy = 1;
    // BatchesDetailsReqModel.BatchesDetailsModel.updatedDate = new Date();
    // BatchesDetailsReqModel.BatchesDetailsModel.batchId = 0;
    return this.apiService.postBlob(this.urlInsertbatchDetails,coursesDetails);
  }

  getBatchList() {
    return this.apiService.getData(this.urlgetbatchList);
  }
    
  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }

  getcourseList() {
    return this.apiService.getData(this.urlgetCourseList);
  }
}
