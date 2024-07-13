import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { BaseService } from 'src/app/core/services/baseService';
import { HttpBackend} from '@angular/common/http';
import { ClassroomModel } from './classroomDetails.model';


@Injectable({
  providedIn: 'root'
})
export class AddClassroomsService extends BaseService
{

  private urlInsertClassroomDetails: string = "ClassroomDetails/InsertClassroomDetails";
  private urlClassroomdetails: string = "ClassroomDetails/getAllClassroomList";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";


  constructor(private apiService: APIService, private httpBackend: HttpBackend) {
    super();
  }

  insertClassroomData(classroomDetails: ClassroomModel) {
    return this.apiService.postBlob(this.urlInsertClassroomDetails,classroomDetails);
  }

  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }

  getClassroomList() {
    return this.apiService.getData(this.urlClassroomdetails);
  }

}
