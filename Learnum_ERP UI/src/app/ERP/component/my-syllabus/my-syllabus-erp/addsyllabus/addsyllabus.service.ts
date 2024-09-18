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

  // insertSyllabusData( syllabusListModel:SyllabusListModel) : Observable<any> {
  
   
  //   const formData: FormData = new FormData();
  //   formData.append('topicInformationModel', JSON.stringify(syllabusListModel));
  //   formData.append('syllabusDetailsModel', JSON.stringify(syllabusListModel));

  //   formData.append('File', TopicInformationModel.File[0]);
  //   console.log(formData);
  //   return this.apiService.postData(this.urlInsertSyllabusDetails,FormData);
  // }
  insertSyllabusData(syllabusListModel: SyllabusListModel): Observable<any> {
    const formData: FormData = new FormData();

    // Append the syllabus details as a JSON string
    formData.append('syllabusDetailsModel', JSON.stringify(syllabusListModel.syllabusDetailsModel));

    // Check if topicInformationModel exists and is an array
    if (Array.isArray(syllabusListModel.topicInformationModel)) {
        syllabusListModel.topicInformationModel.forEach((topic, index) => {
            // Check that each property exists before appending
            if (topic.TopicId !== undefined) {
                formData.append(`topicInformationModel[${index}].TopicId`, topic.TopicId.toString());
            }
            if (topic.Heading) {
                formData.append(`topicInformationModel[${index}].Heading`, topic.Heading);
            }
            if (topic.Content) {
                formData.append(`topicInformationModel[${index}].Content`, topic.Content);
            }
            if (topic.Reference) {
                formData.append(`topicInformationModel[${index}].Reference`, topic.Reference);
            }
            if (topic.SubTopic) {
                formData.append(`topicInformationModel[${index}].SubTopic`, topic.SubTopic);
            }

            // Append file if present
            if (topic.File) {
                formData.append(`topicInformationModel[${index}].File`, topic.File, topic.File.name);
            }
        });
    } else {
        console.error("topicInformationModel is not an array or is undefined", syllabusListModel.topicInformationModel);
    }

    // Send the formData object via HTTP POST request
    return this.apiService.postData(this.urlInsertSyllabusDetails, formData);
}

  
  getAddSyllabusDetailsById(syllabusId: number) {
    return this.apiService.getData(this.urlgetAddSyllabusDetailsById + '/' + syllabusId);
  }

  
  getSyllabusDetails()
 {
   return this.apiService.getData(this.urlgetSyllabusList);
 }


  getcourseList() {
    return this.apiService.getData(this.urlgetCourseList);
  }
  getsubjectList() {
    return this.apiService.getData(this.urlgetSubjectList);
  }
}
