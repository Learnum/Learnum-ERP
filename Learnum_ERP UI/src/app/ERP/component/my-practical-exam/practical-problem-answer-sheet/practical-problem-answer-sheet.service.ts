import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { PracticalProblemDetails } from './practicalproblem.model';

@Injectable({
  providedIn: 'root'
})
export class PracticalProblemAnswerSheetService {

  private urlInsertProblemAnswerDetails: string = "MyPracticalExam/StudentAnswerDetails";
  private urlgetPracticalList: string = "MyPracticalExam/getAllStudentAnswerList";
  private urlGetPracticalAnswer: string = "MyPracticalExam/getPracticalExamDetails";

  constructor(private apiService: APIService) { }

  insertProblemAnswer(myPracticalExam: PracticalProblemDetails) {
    return this.apiService.postBlob(this.urlInsertProblemAnswerDetails,myPracticalExam);
  }
  getPracticalList() {
    return this.apiService.getData(this.urlgetPracticalList);
  }
  getPracticalAnswerDetails(studentId: number) {
    return this.apiService.getData(this.urlGetPracticalAnswer + '/' + studentId);
  }
}
