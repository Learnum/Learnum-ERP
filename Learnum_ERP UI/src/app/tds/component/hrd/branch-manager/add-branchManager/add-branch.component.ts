import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { branchManagerDetailsModel } from './branchManagerDetailsModel';
import { AddbranchManagerService } from './addbranch.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit {

  form = new FormGroup({});
  branchManagerDetails:branchManagerDetailsModel = new branchManagerDetailsModel();
  reasonList: any[] = [];
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  NowDate: any = new Date();
  
 
  constructor(
     private addbranchManagerService: AddbranchManagerService,
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setParameter();
    //this.createForm();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.EmployeeDetailId) {
     
    }
    
  }

setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [

          {
            className: 'col-md-3',
            type: 'select',
            key: 'BranchManagerName',
            templateOptions: {
              placeholder: 'select',
              type: 'text',
              label: "Branch Manager Name",
              required: true,
              options: [
                { value: 'mr ganesh Agre', label: 'mr ganesh agre' },
                { value: 'raj', label: 'raj' }
              ],
          
            },
            },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'BranchName',
            props: { 
              placeholder: 'select',
              type: 'text',
              label: "BranchName",
              required: true,
              options: [
                { value: 'cpat', label: 'cpat' },
                { value: 'taxblock', label: 'taxblock' }
              ],
            },
          },
         {
            className: 'col-md-3',
            type: 'select',
            key: 'status',
            props: {
              placeholder: 'Select',
              required: true,
              valueProp: 'value',
              labelProp: 'label',
              label: "status",
              options: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'InActive' }
              ],
            },
          }, 
         ],
      },
    ]
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/tds-return/employee');
  }

  get f()
  {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertBranchManager();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  insertBranchManager() {
    this.branchManagerDetails.addedBy = 1;
    this.branchManagerDetails.addedDate = new Date();
    this.branchManagerDetails.updatedBy = 1;
    this.branchManagerDetails.updatedDate = new Date();
    this.branchManagerDetails.isActive = true;

    this.addbranchManagerService.insertBranchManagerData(this.branchManagerDetails).subscribe(
      (result: any) => {
        let serviceResponse = result.Value
        if (result.Value === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);

        }
        else if (serviceResponse == ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
        }
        else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage("Enter all required fields");
      }
    )
    this.router.navigateByUrl('tds/hrd/daily-work');
  }




}
