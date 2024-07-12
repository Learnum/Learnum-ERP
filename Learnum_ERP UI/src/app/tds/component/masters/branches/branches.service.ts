import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  private urlgetBranchList: string = "BranchDetails/getAllBranchList";

  constructor(private apiService: APIService) {
  }

  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }
}
