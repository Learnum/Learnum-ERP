import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
              label: "Branch Name",
              //placeholder: 'Select Branch',  
              required: true,
              options: [
                { value: null, label: 'Select Branch', disabled: true },
                ...this.branchDetails ? this.branchDetails.map(branch => ({
                  label: branch.BranchName,
                  value: branch.BranchId
                })) : [],
              ]
            },
            defaultValue: null,
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Branch selection is required',
              },
            },
            validation: {
              messages: {
                required: 'Branch selection is required',
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
              label: 'Classroom Name',
              required: true,
              pattern: '^[A-Za-z0-9 ]+$', // Updated pattern to allow letters, numbers, and spaces
            },
            validation: {
              messages: {
                required: 'Classroom Name is required',
                pattern: 'Classroom Name must contain only letters, numbers, and spaces', // Updated validation message
              },
            },
            hooks: {
              onInit: (field) => {
                const formControl = field.formControl;
                formControl.valueChanges.subscribe(value => {
                  if (value) {
                    let sanitizedValue = value.replace(/[^A-Za-z0-9\s]/g, '');
                    sanitizedValue = sanitizedValue.replace(/\b\w/g, char => char.toUpperCase());
                    formControl.setValue(sanitizedValue, { emitEvent: false });
                  }
                });
              }
            }
          },
          
          
          {
            className: 'col-md-3',
            type: 'input',
            key: 'StudentCapacity',
            props: {
              placeholder: 'Student Capacity',
              required: true,
              type: 'number',
              label: 'Student Capacity',

            },
            validation: {
              messages: {
                required: 'Student Capacity is required',
                pattern: 'Please enter a valid positive number for Student Capacity',
              },
            },
            hooks: {
              onInit: (field) => {
                const formControl = field.formControl;
                formControl.valueChanges.subscribe(value => {
                  if (value) {
                    // Remove any non-digit characters 
                    const sanitizedValue = value.toString().replace(/[^0-9]/g, '');
                    formControl.setValue(sanitizedValue ? parseInt(sanitizedValue, 10) : '', { emitEvent: false });
                  }
                });
              }
            }
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'IsActive',
            templateOptions: {
              label: 'Classroom Status',
              //placeholder: 'Select Branch Status',
              required: true,
              options: [
                { value: null, label: 'Select Classroom Status', disabled: true },
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' }
              ],
            },
            defaultValue: null,
            validation: {
              messages: {
                required: 'Please select a classroom status',
              },
            },
          }
        ],
      },
    ];
  }

  navigate() {
    this.router.navigateByUrl('erp/masters/classrooms');
  }

  onCancleClick() {
    this.router.navigateByUrl('erp/masters/classrooms');
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
    this.classroomDetails.AddedBy = 1;
    this.classroomDetails.AddedDate = new Date();
    this.classroomDetails.UpdatedBy = 1;
    this.classroomDetails.UpdatedDate = new Date();
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
    this.router.navigateByUrl('erp/masters/classrooms');
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


