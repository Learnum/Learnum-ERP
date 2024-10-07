import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { SyllabusDetailsModel, SyllabusListModel, TopicInformationModel } from './syllabusDetailsModel';
import { Observable } from 'rxjs';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddsyllabusService {

  private urlInsertSyllabusDetails: string = "SyllabusDetails/InsertSyllabusDetails";
  private urlgetAddSyllabusDetailsById: string = "SyllabusDetails/getSyllabusDetailsById";
  private urlgetSyllabusList: string = "SyllabusDetails/getSyllabusDetails";
  private urlgetCourseList: string = "CourseDetails/getAllCourseList";
  private urlgetSubjectList: string = "SubjectDetails/getAllSubjectList";
  httpClientWithoutInterceptor: any;

  constructor(private apiService: APIService, private httpBackend: HttpBackend) {

    this.httpClientWithoutInterceptor = new HttpClient(httpBackend);
  }

  //   insertSyllabusData(syllabusListModel: SyllabusListModel): Observable<any> {
  //     const formData: FormData = new FormData();

  //     formData.append('topicInformationModel', JSON.stringify(syllabusListModel.topicInformationModel));
  //     formData.append('syllabusDetailsModel', JSON.stringify(syllabusListModel.syllabusDetailsModel));

  //     // Ensure that File is selected and appended
  //     if (syllabusListModel.topicInformationModel[0].File) {
  //         formData.append('File', syllabusListModel.topicInformationModel[0].File[0]);
  //     } else {
  //         console.error("File is not selected.");
  //     }

  //     return this.apiService.postData(this.urlInsertSyllabusDetails, syllabusListModel);
  // }

  insertSyllabusData(syllabusListModel: SyllabusListModel): Observable<any> {
    const formData: FormData = new FormData();

    // Append the syllabusDetailsModel as JSON
    formData.append('syllabusDetailsModel', JSON.stringify(syllabusListModel.syllabusDetailsModel));

    // Append each TopicInformationModel's data
    syllabusListModel.topicInformationModel.forEach((topic, index) => {
      formData.append(`topicInformationModel[${index}].Heading`, topic.Heading);
      formData.append(`topicInformationModel[${index}].Content`, topic.Content);
      formData.append(`topicInformationModel[${index}].Reference`, topic.Reference);
      formData.append(`topicInformationModel[${index}].SubTopic`, topic.SubTopic);

      // Append the file (check if it's a valid file object)
      if (topic.File && topic.File instanceof File) {
        formData.append(`topicInformationModel[${index}].File`, topic.File);
      } else {
        console.error("No valid file selected.");
      }
    });

    return this.apiService.postData(this.urlInsertSyllabusDetails, syllabusListModel);
  }

  getAddSyllabusDetailsById(syllabusId: number) {
    return this.apiService.getData(this.urlgetAddSyllabusDetailsById + '/' + syllabusId);
  }

  getSyllabusDetails() {
    return this.apiService.getData(this.urlgetSyllabusList);
  }

  getcourseList() {
    return this.apiService.getData(this.urlgetCourseList);
  }
  getsubjectList() {
    return this.apiService.getData(this.urlgetSubjectList);
  }
}
