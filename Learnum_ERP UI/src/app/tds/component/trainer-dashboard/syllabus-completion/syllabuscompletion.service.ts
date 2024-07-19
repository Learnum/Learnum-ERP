import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { syllabusDetails } from './syllabus.model';

@Injectable({
  providedIn: 'root'
})
export class SyllabuscompletionService {

  private urlInsertsyllabusDetails: string = "SyllabusStatus/AddSyllabusStatuses";
  private urlgetSyllabusStatusList: string = "SyllabusStatus/getAllSyllabusStatusesListList";
  private urlgetBranchList: string = "BranchDetails/getAllBranchList";


  constructor(private apiService: APIService) { }

  insertProblemAnswer(syllabusStatus: syllabusDetails) {
    return this.apiService.postBlob(this.urlInsertsyllabusDetails,syllabusStatus);
  }

  getSyllabusList() {
    return this.apiService.getData(this.urlgetSyllabusStatusList);
  }

  getBranchList() {
    return this.apiService.getData(this.urlgetBranchList);
  }
}
