import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { BirthdayDetailsService } from './birthday-details.service';
import { BirthdayDetailsModel } from './BirthDayDetails.model';

@Component({
  selector: 'app-add-birthday',
  templateUrl: './add-birthday.component.html',
  styleUrls: ['./add-birthday.component.scss']
})
export class AddBirthdayComponent implements OnInit {

  form = new FormGroup({});
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  NowDate: any = new Date();
  birthdayDetails: BirthdayDetailsModel = new BirthdayDetailsModel();

 
  constructor(
    private birthdayDetailsService: BirthdayDetailsService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.BirthId) {
      this.getBirthdayDetails(this.editData.BirthId);
    }
    }


  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',

        fieldGroup: [

           {
            key:'BirthId',
           },
            {
            className: 'col-md-4',
            type: 'input',
            key: 'Name',
            templateOptions: {
              placeholder: 'Enter Name',
              type: 'text',
              label: "Name",
              required: true,
              pattern: "^[A-Za-z]+( [A-Za-z]+)*$",
              title: 'Only characters are allowed',
            },
            validation: {
              messages: {
                required: 'Name is required',
                pattern: 'Please enter a valid name ',
              },
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'Email',
            props: {
              placeholder: 'Email',
              type: 'text',
              label: 'Email',
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            },
            validation: {
              messages: {
                required: 'Email is required',
                pattern: 'Please enter a valid Email',
              },
             
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'Date',
            templateOptions: {
              label: 'Date of Birth',
              placeholder: 'Date',
              type: 'date',
              required: true,
              attributes: {
                max: formatDate(this.NowDate, 'YYYY-MM-dd', 'en-IN'),
              },
            },
            validation: {
              messages: {
                required: 'This field is required',
              },
            },
          },
          {
            className: 'col-md-4',
            type: 'input',
            key: 'Role',
            templateOptions: {
              label: 'Role',
              placeholder: 'Select Role',
              required: true,
             
            },
            validation: {
              messages: {
                required: 'Role is required',
              },
            },
          },
         
          {
            className: 'col-md-4',
            type: 'select',
            key: 'IsActive',
            templateOptions: {
              label: 'Status',
              //placeholder: 'Select Status',
              required: true,
              options: [
                { value: null, label: 'Select Status', disabled: true },  
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' }
              ],
            },
            defaultValue: null,  
            validation: {
              messages: {
                required: 'Please select a  status',
              },
            },
          },
        ],
      },
    ]
  }
 
  onReset()
  {
    this.form.reset();
  }
  onCancleClick() {
    this.router.navigateByUrl('tds/hrd/birthdays');
  }

  navigate()
  {
    this.router.navigateByUrl('tds/hrd/birthdays');
  }

  get f()
  {
    return this.form.controls;
  }

  onSubmit():void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
    this.insertAddBirthday();
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  insertAddBirthday() {
    this.birthdayDetails.addedBy = 1;
    this.birthdayDetails.addedDate = new Date();
    this.birthdayDetails.updatedBy = 1;
    this.birthdayDetails.updatedDate = new Date();
    this.birthdayDetails.birthId = 0;

    this.birthdayDetailsService.insertBirthdayData(this.birthdayDetails).subscribe(
      (result: any) => {
        let serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('tds/hrd/birthdays');
        }
         else if (serviceResponse == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('tds/hrd/birthdays');
        } 
        else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage("Enter all required fields");
      }
    );
    
  }

  getBirthdayDetails(BirthId: number) {
    this.birthdayDetailsService.getBirthdayDetails(BirthId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.birthdayDetails = result.Value.Item1;

          this.birthdayDetails.Date = this.birthdayDetailsService.formatDate(this.birthdayDetails.Date);


          this.setParameter();
          console.error('No data found for BirthId: ' + BirthId);
        }
      },
      (error: any) => {
        console.error('Error retrieving birthday details:', error);

      }
    );
  }
  

}
