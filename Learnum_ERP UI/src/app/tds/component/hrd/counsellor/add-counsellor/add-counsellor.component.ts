import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { CounsellorsPlaningModel } from './addcounsellor.model';
import { AddcounsellorService } from './addcounsellor.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-add-counsellor',
  templateUrl: './add-counsellor.component.html',
  styleUrls: ['./add-counsellor.component.scss']
})
export class AddCounsellorComponent implements OnInit{
  form = new FormGroup({});
  CounsellorDetails: CounsellorsPlaningModel = new CounsellorsPlaningModel();
  reasonList: any[] = [];
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  GetEmployeeList: any;
  coOwners: any;
  NowDate: any = new Date();

  constructor(
    private addcounsellorService: AddcounsellorService,
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
 


 
  insertBranchManager() {
    this.CounsellorDetails.addedBy = 1;
    this.CounsellorDetails.addedDate = new Date();
    this.CounsellorDetails.updatedBy = 1;
    this.CounsellorDetails.updatedDate = new Date();
    this.CounsellorDetails.isActive = true;

    this.addcounsellorService.insertcounsellorData(this.CounsellorDetails).subscribe(
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
    this.router.navigateByUrl('tds/hrd/add-counsellor');
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
            key: 'CounsellorName',
            templateOptions: {
              placeholder: 'select',
              type: 'text',
              label: "Counsellor Name",
              required: true,
            },
            },
            {
              className: 'col-md-4',
              type: 'select',
              key: 'BranchName',
              templateOptions: {
                placeholder: 'select',
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
                  placeholder: 'select',
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
      this.GetEmployeeList();
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

 


}
