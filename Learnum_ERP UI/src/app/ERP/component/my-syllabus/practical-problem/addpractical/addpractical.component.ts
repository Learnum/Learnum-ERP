import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-addpractical',
  templateUrl: './addpractical.component.html',
  styleUrls: ['./addpractical.component.scss']
})
export class AddpracticalComponent implements OnInit {

  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  tdsReturnList: any;
  form: any;
  branchDetails: any;
  subjectDetails: any;
  formBuilder: any;
  practicalProblemForm: FormGroup;
  practicalProblemDetails: any[] = [];

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal

  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.createForm();
    this.createPracticalProblemForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      CourseName: ['', Validators.required],
      SubjectName: ['', Validators.required],
      TopicName: ['', Validators.required],
      PracticalProblemStatus: ['', Validators.required],
    });

  }
  createPracticalProblemForm(): void {
    this.practicalProblemForm = this.fb.group({
      question: ['', Validators.required],
      modelAnswer: ['', Validators.required],
      attachment: [null],
      marks: ['', Validators.required],
      practicalProblemStatus: ['', Validators.required]
    });
  }





  reset() {
    throw new Error('Method not implemented.');
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        // key: 'ITDPreEmploymentSalModel',
        fieldGroup: [

          {
            className: 'col-md-6',
            type: 'select',
            key: 'Course Name',
            templateOptions: {
              placeholder: 'Select',
              type: 'text',
              label: "Course Name",
              required: true,

            },

          },
          {
            className: 'col-md-6',
            type: 'select',
            key: 'Subject Name',
            props: {
              placeholder: 'Enter Subject Name',
              type: 'text',
              label: "Subject Name",
              required: true,

            },
          },
          {
            className: 'col-md-6',
            type: 'input',
            key: 'TopicName ',
            props: {
              placeholder: 'Enter Subject Description',
              type: 'text',
              label: "Subject Description",
              required: true,

            },
            validation: {
              messages: {
                required: 'Subject Description is required',

              },
            },
          },
          {
            className: 'col-md-6',
            type: 'select',
            key: 'PracticalProblemstatus',
            props: {
              placeholder: 'active',
              required: true,
              type: 'text',
              label: "Practical Problem status",

            },

            validation: {
              messages: {
                required: 'IP status is required',

              },
            },
          },
        ],
      },
    ];
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/my-syllabus/practical-problem');
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
  // insertIP() {
  //   this.subjectDetails.AddedBy = 1;
  //   this.subjectDetails.AddedDate = new Date();
  //   this.subjectDetails.UpdatedBy = 1;
  //   this.subjectDetails.UpdatedDate = new Date();
  //   this.subjectDetails.IsActive = true;

  //   this.addipaddressService.insertIPData(this.branchDetails).subscribe(
  //     (result: any) => {
  //       const serviceResponse = result.Value;
  //       if (serviceResponse === ResponseCode.Success) {
  //         this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
  //       } else if (serviceResponse === ResponseCode.Update) {
  //         this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
  //       } else {
  //         this.alertService.ShowErrorMessage(this.messageService.serviceError);
  //       }
  //     },
  //     (error: any) => {
  //       this.alertService.ShowErrorMessage("Enter all required fields");
  //     }
  //   );
  //   this.router.navigateByUrl('tds/masters/branches');
  // }
  addPracticalProblem(): void {
    if (this.practicalProblemForm.valid) {
      this.practicalProblemDetails.push(this.practicalProblemForm.value);
      this.practicalProblemForm.reset();
      this.modalService.dismissAll();
    } else {
      this.practicalProblemForm.markAllAsTouched();
    }
  }
}

