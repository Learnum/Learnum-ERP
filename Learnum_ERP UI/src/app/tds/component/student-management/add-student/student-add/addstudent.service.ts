import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { coursesDetailsModel } from '../../../masters/courses/add-courses/coursesDetails.model';
import { Observable } from 'rxjs';
import { studentDetailsModel } from './addstudent.model';

@Injectable({
  providedIn: 'root'
})
export class AddstudentService {
 
  private urlInsertStudentDetails: string = "StudentDetails/InsertStudentDetails";
  private urlgetAddStudentList: string = "StudentDetails/getAllStudentList";
  private urlGetStudentList: string = "StudentDetails/getStudentDetails";

  constructor(private apiService: APIService) { }

  insertStudentDetails(studentDetails: studentDetailsModel) : Observable<any> {
    let studentDetailsModel1 : studentDetailsModel = new studentDetailsModel()
    studentDetailsModel1.studentName = studentDetails.studentName ;
    studentDetailsModel1.studentEmail = studentDetails.studentEmail ;
    studentDetailsModel1.studentPhone = studentDetails.studentPhone ;
    studentDetailsModel1.aadharNumber = studentDetails.aadharNumber ;
    studentDetailsModel1.dateofBirth = studentDetails.dateofBirth ;
    studentDetailsModel1.education = studentDetails.education ;
    studentDetailsModel1.bloodGroup = studentDetails.bloodGroup ;
    studentDetailsModel1.gender = studentDetails.gender ;
    studentDetailsModel1.town = studentDetails.town ;
    studentDetailsModel1.city = studentDetails.city ;
    studentDetailsModel1.state = studentDetails.state ;
    studentDetailsModel1.postalCode = studentDetails.postalCode ;
    studentDetailsModel1.fatherName = studentDetails.fatherName ;
    studentDetailsModel1.fatherOccupation = studentDetails.fatherOccupation ;
    studentDetailsModel1.fatherPhone = studentDetails.fatherPhone ;
    studentDetailsModel1.motherName = studentDetails.motherName ;
    studentDetailsModel1.motherOccupation = studentDetails.motherOccupation ;
    studentDetailsModel1.motherPhone = studentDetails.motherPhone ;
    studentDetailsModel1.studentRole = studentDetails.studentRole ;
    studentDetailsModel1.isActive = studentDetails.isActive ;

   const formData: FormData = new FormData();
   formData.append('studentDetailsModel', JSON.stringify(studentDetails));
  
   formData.append('File', studentDetails.file[0]);
   console.log(formData);
   return this.apiService.postBlob(this.urlInsertStudentDetails,formData);
 } 

  getAddStudentList() {
    return this.apiService.getData(this.urlgetAddStudentList);
  }

  getStudentList(studentId: number) {
    return this.apiService.getData(this.urlGetStudentList + '/' + studentId);
  }
}
