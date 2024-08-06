import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { addfeesModel } from './addfeesmodel';

@Injectable({
  providedIn: 'root'
})
export class AddFeesService extends BaseService{
 
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";
  private urlgetCourseList: string = "CourseDetails/getAllCourseList";
  private urlgetSubjectList: string = "SubjectDetails/getAllSubjectList";
  private urlgetBatchList: string = "BatchesDetails/getAllBatchesList";
  private urlInsertfeesDetails: string = "OfflineFeesDetails/InsertOfflineFeesDetails";
  private urlGetofflineFeesList: string = "OfflineFeesDetails/getOfflineFeesDetailsList";


   constructor(private apiService: APIService) {
    super();
  }

  insertfeesDetails(OfflineFessDetails: addfeesModel) {
    return this.apiService.postBlob(this.urlInsertfeesDetails,OfflineFessDetails);
  }

  getOfflineFessDetails(offlineFeesPaymentId:number){
    return this.apiService.getData(this.urlGetofflineFeesList+ '/' + offlineFeesPaymentId);
  }

  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }
  getcourseList() {
    return this.apiService.getData(this.urlgetCourseList);
  }

  getBatchList(){
    return this.apiService.getData(this.urlgetBatchList);
  }
}
