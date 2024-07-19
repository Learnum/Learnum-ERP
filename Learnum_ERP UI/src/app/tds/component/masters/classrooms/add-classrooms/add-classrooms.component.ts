import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { AddClassroomsService } from './add-classrooms.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ClassroomModel } from './classroomDetails.model';


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
  }

  reset() {
    throw new Error('Method not implemented.');
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [

          {
            className: 'col-md-6',
            type: 'select',
            key: 'BranchId',
            templateOptions: {
              placeholder: 'Branch Name',
              type: 'text',
              label: "Branch Name",
              required: true,
              options: this.branchDetails ? this.branchDetails.map(branch => ({ label: branch.BranchName, value: branch.BranchId })) : [],
            },

          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'ClassroomName',
            props: {
              placeholder: 'Classroom Name',
              type: 'text',
              label: "Classroom Name",
              required: true,

            },
            validation: {
              messages: {
                required: 'Classroom Name is required',

              },
            },
          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'StudentCapacity',
            props: {
              placeholder: 'Student Capacity',
              required: true,
              type: 'text',
              label: "Student Capacity",

            },

            validation: {
              messages: {
                required: 'Student Capacity* is required',

              },
            },
          },
          {
            className: 'col-md-6',
            type: 'select',
            key: 'isActive',
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

  onSubmit() {
    // if (this.form.valid) {
      this.insertClassroom();
    // }
  }

  insertClassroom() {
    this.classroomDetails.addedBy = 1;
    this.classroomDetails.addedDate = new Date();
    this.classroomDetails.updatedBy = 1;
    this.classroomDetails.updatedDate = new Date();
    this.classroomDetails.classroomId = 0;

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
  
}


