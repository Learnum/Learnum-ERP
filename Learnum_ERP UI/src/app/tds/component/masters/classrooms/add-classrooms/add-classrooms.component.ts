import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { AddClassroomsService } from './add-classrooms.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ClassroomModel } from './classroomDetails.model';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-add-classrooms',
  templateUrl: './add-classrooms.component.html',
  styleUrls: ['./add-classrooms.component.scss']
})
export class AddClassroomsComponent implements OnInit {

  classroomDetails: ClassroomModel = new ClassroomModel();
  
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  form = new FormGroup({});
  branchDetails: any;
  
  
constructor(
    private router: Router,
    private addclassroomService: AddClassroomsService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setParameter();
   this.getBranchDetails();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.ClassroomId) {
      this.getClassroomDetails(this.editData.ClassroomId);
    }
  }
  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            key: 'classroomId',
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'BranchId',
            templateOptions: {
              placeholder: 'Branch Name',
              type: 'text',
              label: "Branch Name",
              required: true,
              options: this.branchDetails ? this.branchDetails.map(branch => ({ label: branch.BranchName, value: branch.BranchId })) : [],
            
            },   
            validation: {
              messages: {
                required: 'Branch Name is required',

              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'ClassroomName',
            props: {
              placeholder: 'Classroom Name',
              type: 'text',
              label: "Classroom Name",
              required: true,
               pattern: '^[A-Za-z]+$',
              // options: this.classroomDetails ? this.classroomDetails.map(classroom => ({ label: classroom.classroomName, value: classroom.classroomId })) : [],
            
            },
            validation: {
              messages: {
                required: 'Classroom Name is required',

              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'StudentCapacity',
            props: {
              placeholder: 'Student Capacity',
              required: true,
              type: 'text',
              pattern: '^[0-9]+$',
              label: "Student Capacity",
            },

            validation: {
              messages: {
                required: 'Student Capacity is required',

              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'IsActive',
            props: {
              placeholder: 'Classroom Status',
              type: 'text',
              label: "Classroom Status",
              required: true,
              options: [
                { value: true, label: 'Active' },
                { value: false, label: 'InActive' }
              ],
             
            },
            validation: {
              messages: {
                required: 'Classroom Status is required',

              },
            },
          }
        ],
      },
    ];
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/masters/classrooms');
  }
  onResetClick() {
    this.form.reset();
  }
  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertClassroom();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  insertClassroom() {
    this.classroomDetails.addedBy = 1;
    this.classroomDetails.addedDate = new Date();
    this.classroomDetails.updatedBy = 1;
    this.classroomDetails.updatedDate = new Date();
    //this.classroomDetails.classroomId = 0;

    this.addclassroomService.insertClassroomData(this.classroomDetails).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
    this.router.navigateByUrl('tds/masters/classrooms');
  }
  getBranchDetails() {
    this.addclassroomService.getBranchList().subscribe(
      (data: any) => {
        this.branchDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getClassroomDetails(ClassroomId: number) {
    this.addclassroomService.getClassroomDetails(ClassroomId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.classroomDetails = result.Value.Item1;
          this.setParameter();
          console.error('No data found for ClassroomId: ' + ClassroomId);
        }
      },
      (error: any) => {
        console.error('Error retrieving classroom details:', error);

      }
    );
  }
  
}


