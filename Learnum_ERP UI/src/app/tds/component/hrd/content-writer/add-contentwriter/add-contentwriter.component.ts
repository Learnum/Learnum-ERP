import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ContentWriterDetailsModel } from '../addcontentWriter.model';
import { AddcontentWriterService } from './addcontent-writer.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-add-contentwriter',
  templateUrl: './add-contentwriter.component.html',
  styleUrls: ['./add-contentwriter.component.scss']
})
export class AddContentwriterComponent {

  form = new FormGroup({});
  ContentWriterDetails: ContentWriterDetailsModel = new ContentWriterDetailsModel();
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  NowDate: any = new Date();


  constructor(
    private addcontentWriterService: AddcontentWriterService,
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
k
  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [

          {
            className: 'col-md-6',
            type: 'select',
            key: 'SelectCourse',
            templateOptions: {
              placeholder: 'select',
              type: 'text',
              label: "Select Course",
              required: true,
            },
          },
          {
            className: 'col-md-6',
            type: 'select',
            key: 'SelectSubject',
            templateOptions: {
              placeholder: 'select',
              type: 'text',
              label: "Select Subject",
              required: true,
            },
          },
          {
            className: 'col-md-6',
            type: 'select',
            key: 'SelectContentWriter',
            templateOptions: {
              placeholder: 'select',
              type: 'text',
              label: "Select Content Writer",
              required: true,
            },
          },
          {
            className: 'col-md-6',
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
    this.router.navigateByUrl('tds/hrd/content-writer');
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertContentWriter();
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  insertContentWriter() {
    this.ContentWriterDetails.addedBy = 1;
    this.ContentWriterDetails.addedDate = new Date();
    this.ContentWriterDetails.updatedBy = 1;
    this.ContentWriterDetails.updatedDate = new Date();
    this.ContentWriterDetails.isActive = true;

    this.addcontentWriterService.insertContentWriterData(this.ContentWriterDetails).subscribe(
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
    this.router.navigateByUrl('tds/hrd/content-writer');
  }
}

