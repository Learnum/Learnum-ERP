import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { BatchesDetailsModel, BatchesDetailsReqModel, InstallMentDetailsModel } from './batchDetails.model';

@Injectable({
  providedIn: 'root'
})
export class AddBatchesService extends BaseService {

  private httpClientWithoutInterceptor: HttpClient;

  private urlInsertbatchDetails: string = "BatchesDetails/InsertBatchesDetails";
  private urlgetbatchList: string = "BatchesDetails/getAllBatchesList";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";
  private urlgetClassroomList: string = "ClassroomDetails/getAllClassroomList";
  private urlgetCourseList: string = "CourseDetails/getAllCourseList";
  private urlGetBatchDtails: string = "BranchDetails/getBranchDetails";

  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  insertBatchData(batchDetails: BatchesDetailsModel, installmentDetails: InstallMentDetailsModel[]) {

    const payload = {
      batchDetails,
      installmentDetails
    };
    let batchDetailreqmodel: BatchesDetailsReqModel = new BatchesDetailsReqModel();
    // BatchesDetailsReqModel.batchesDetailsModel.addedBy = 1;
    // BatchesDetailsReqModel.BatchesDetailsModel.addedDate = new Date();
    // BatchesDetailsReqModel.BatchesDetailsModel.updatedBy = 1;
    // BatchesDetailsReqModel.BatchesDetailsModel.updatedDate = new Date();
    // BatchesDetailsReqModel.BatchesDetailsModel.batchId = 0;
    return this.apiService.postBlob(this.urlInsertbatchDetails,payload);
  }

  getBatchList() {
    return this.apiService.getData(this.urlgetbatchList);
  }
  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }

  getClassroomList()
  {
    return this.apiService.getData(this.urlgetClassroomList);
  }

  getCourseList()
  {
    return this.apiService.getData(this.urlgetCourseList); 
  }
  getBatchDetails(batchId: number) {
    return this.apiService.getData(this.urlGetBatchDtails + '/' + batchId);
  }
}
