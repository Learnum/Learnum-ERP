import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';

@Component({
  selector: 'app-add-accountant',
  templateUrl: './add-accountant.component.html',
  styleUrls: ['./add-accountant.component.scss']
})
export class AddAccountantComponent implements OnInit {

  form = new FormGroup({});
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  GetEmployeeList: any;
  coOwners: any;
  NowDate: any = new Date();
   employeeDetails: any;
   onReset: any;
 
  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
  
    this.createForm();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.EmployeeDetailId) {
   
    }
    
  }
  createForm(): void {
    this.form = this.fb.group({
      AccountantName: ['', Validators.required], 
      BranchName: ['', Validators.required], 
      Status: ['', Validators.required], 
      
    });
  }

setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        // key: 'ITDPreEmploymentSalModel',
        fieldGroup: [

          {
            className: 'col-md-4',
            type: 'select',
            key: 'Accountant Name',
            templateOptions: {
              placeholder: 'Enter Accountant Name',
              type: 'text',
              label: "Accountant Name",
              required: true,
    

            },
            },
            {
              className: 'col-md-4',
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
                className: 'col-md-4',
                type: 'select',
                key: 'Status',
                templateOptions: {
                  placeholder: 'Enter Status',
                  type: 'text',
                  label: "Status",
                  required: true,
                 },
                },
        ],
      },
    ]
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/hrd/accountant');
  }

  get f()
  {
    return this.form.controls;
  }

  onSubmit():void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
    //  this.insertAddEmployee();
      this.GetEmployeeList();
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
}



