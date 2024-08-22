import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { problemDetailsModel } from './ProblemDetails.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PracticalProblemsStudentsService {

  private urlInsertProblemDetails: string = "PracticalProblemSubform/AddPracticalProblem";
  private urlgetPracticalProblemList: string = "PracticalProblemSubform/getAllPracticalProblemList";
  private urlGetPractical: string = "PracticalProblemSubform/getAddPracticalDetails";

  constructor(private apiService: APIService) {
  }

  insertProblemDetails(practicalProblemSubform: problemDetailsModel) : Observable<any> {
     let problemDetailsModel1 : problemDetailsModel = new problemDetailsModel()
     problemDetailsModel1.question = practicalProblemSubform.question ;
     problemDetailsModel1.modelAnswer = practicalProblemSubform.modelAnswer ;
     problemDetailsModel1.marks=practicalProblemSubform.marks
     problemDetailsModel1.isActive = practicalProblemSubform.isActive ;

    const formData: FormData = new FormData();
    formData.append('PracticalProblemsSubform', JSON.stringify(practicalProblemSubform));
   
    formData.append('File', practicalProblemSubform.FilePath[0]);
    console.log(formData);
    return this.apiService.postBlob(this.urlInsertProblemDetails,formData);
  } 

  getPracticalProblemList() {
    return this.apiService.getData(this.urlgetPracticalProblemList);
  }
  getPracticalDetails(questionId: number) {
    return this.apiService.getData(this.urlGetPractical + '/' + questionId);
  }
}
