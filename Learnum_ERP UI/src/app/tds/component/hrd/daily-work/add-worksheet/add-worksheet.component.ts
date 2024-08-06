import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { WorksheetDetailsModel } from './worksheetdetails.model';
import { AddWorksheetservices } from './add-worksheetservices.service';

@Component({
  selector: 'app-add-worksheet',
  templateUrl: './add-worksheet.component.html',
  styleUrls: ['./add-worksheet.component.scss']
})
export class AddWorksheetComponent implements OnInit {
  form = new FormGroup({});
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  tdsReturnList: any;
  NowDate: any = new Date();
  worksheetDetails: WorksheetDetailsModel = new WorksheetDetailsModel();
  editData: any;
 
 
  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private addWorksheetservices: AddWorksheetservices,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
    
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.WorkId) {
      this.getWorksheetDetails(this.editData.WorkId);
    }
  }
 
setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-',
        
        fieldGroup: [

           {
            key:'WorkId',
           },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'Name',
            templateOptions: {
              placeholder: 'Enter Name',
              type: 'text',
              label: "Name",
              required: true,
              pattern: '^[A-Za-z]+$',
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
            className: 'col-md-6',
            type: 'input',
            key: 'Email',
            props: {
              placeholder: 'Email',
              type: 'text',
              label: "Email",
              required: true,
            },
            validation: {
              messages: {
                required: 'Email is required',
                pattern: 'Please enter a valid Email',
              },
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            },
          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'Date',
            templateOptions: {
              label: 'Date',
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
            className: 'col-md-6',
            type: 'select',
            key: 'Role',
            props: {
              placeholder: 'select',
              type: 'text',
              label: "Role",
              required: true,
              options: [
                { value: 1, label: 'Developer' },
                { value: 2, label: 'Manager' }
              ]
            },
            validation: {
              messages: {
                required: 'Role is required',
              },
            },
          },
          {
            className: 'col-md-6',
            type: 'textarea',
            key: 'TodaysWork',
            props: {
              placeholder: 'Type here',
              type: 'text',
              label: "Today's work",
              required: true,
              rows:5,
              style: {
                height: '150px', 
                width: '100%',   
              },
            },
            validation: {
              messages: {
                required: 'Todays work is required',
              },
            },
          },
        ],
      },
    ]
  }

  onCancleClick() {
    this.router.navigateByUrl("tds/hrd/daily-work"); 
  }

  get f()
  {
    return this.form.controls;
  }

 
  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertAddWorksheet();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
    
  }

  insertAddWorksheet() {
   // Assuming worksheetDetails is a property in your component that holds the worksheet data
    this.worksheetDetails.addedBy = 1;
    this.worksheetDetails.addedDate = new Date();
    this.worksheetDetails.updatedBy = 1;
    this.worksheetDetails.updatedDate = new Date();
    this.worksheetDetails.workId = 0;
  
    this.addWorksheetservices.insertWorksheetData(this.worksheetDetails).subscribe(
      (result: any) => {
        let serviceResponse = result.Value;
        if (result.Value === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl("tds/hrd/daily-work"); 
        }
        else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl("tds/hrd/daily-work"); 
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

  getWorksheetDetails(WorkId: number) {
    this.addWorksheetservices.getWorksheetDetails(WorkId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.worksheetDetails = result.Value.Item1;

          this.worksheetDetails.Date = this.addWorksheetservices.formatDate(this.worksheetDetails.Date);


          this.setParameter();
          console.error('No data found for ContentWriterId: ' + WorkId);
        }
      },
      (error: any) => {
        console.error('Error retrieving Content Writer details:', error);

      }
    );
  }
  

}



