import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { AddClassroomsService } from './add-classrooms.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { classroomDetails } from '../add-classroom.model';

@Component({
  selector: 'app-add-classrooms',
  templateUrl: './add-classrooms.component.html',
  styleUrls: ['./add-classrooms.component.scss']
})
export class AddClassroomsComponent implements OnInit {

  classroomDetails: classroomDetails = new classroomDetails();
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  form: any;
  branchDetails: any;

  constructor(
    private router: Router,
    private addclassroomService: AddClassroomsService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      // EMPID: ['', Validators.required], 
      // Location: ['', Validators.required], 
      // LocationIP: ['', Validators.required], 
      // IPStatus: ['', Validators.required], 
    });

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
            key: 'Branch Name',
            templateOptions: {
              placeholder: 'Enter Branch Name',
              type: 'text',
              label: "Branch Name",
              required: true,

            },

          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'Classroom Name',
            props: {
              placeholder: 'Enter Classroom NameP',
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
            key: 'Student Capacity',
            props: {
              placeholder: 'Enter Student Capacity',
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
            key: 'Classroom Status',
            props: {
              placeholder: 'Enter Classroom Status',
              type: 'text',
              label: "Classroom Status",
              required: true,

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

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // this.insertBranch();
      //this.getBranchDetails();
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
}


