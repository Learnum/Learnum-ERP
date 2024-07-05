import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-add-worksheet',
  templateUrl: './add-worksheet.component.html',
  styleUrls: ['./add-worksheet.component.scss']
})
export class AddWorksheetComponent implements OnInit {
  form = new FormGroup({});
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  coOwners: any;
  NowDate: any = new Date();
  worksheetDetails: any;
  addWorksheetService: any;
 
  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
    
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.EmployeeDetailId) {
    }
    
  }
 
setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-',
        
        fieldGroup: [

          {
            className: 'col-md-6',
            type: 'input',
            key: 'Name',
            templateOptions: {
              placeholder: 'Enter  Name',
              type: 'text',
              label: "Name",
              required: true,
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
                pattern: 'Please enter a valid Email ',
              },
            },
          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'DateofBirth',
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
            className: 'col-md-6',
            type: 'select',
            key: 'Role',
            props: {
              placeholder: 'select',
              type: 'text',
              label: "Role",
              required: true,
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
            key: 'TodayWork',
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
    this.router.navigateByUrl('tds/hrd/counsellor');
  }

  get f()
  {
    return this.form.controls;
  }

  onSubmit():void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
    //  this.insertAddEmployee();
      
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  insertAddWorksheet() {
    // Assuming worksheetDetails is a property in your component that holds the worksheet data
    this.worksheetDetails.AddedBy = 1;
    this.worksheetDetails.AddedDate = new Date();
    this.worksheetDetails.UpdatedBy = 1;
    this.worksheetDetails.UpdatedDate = new Date();
    this.worksheetDetails.IsActive = true;
  
    this.addWorksheetService.insertWorksheetData(this.worksheetDetails).subscribe(
      (result: any) => {
        let serviceResponse = result.Value;
        if (result.Value === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
        }
        else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        }
        else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage("Enter all required fields");
      }
    );
    this.router.navigateByUrl('tds/worksheet/employee'); 
  }
  
 
 


}



