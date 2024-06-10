import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-syllabus-completion',
  templateUrl: './syllabus-completion.component.html',
  styleUrls: ['./syllabus-completion.component.scss']
})
export class SyllabusCompletionComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setFields();
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      branchName: ['', Validators.required],
    });
  }

  setFields() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-4',
            key: 'branchName',
            type: 'select',
            props: {
              label: 'Branch Name',
              placeholder: 'Select Branch Name',
              required: true,
              options: [
                { value: 'branch1', label: 'Branch 1' },
                { value: 'branch2', label: 'Branch 2' },
                { value: 'branch3', label: 'Branch 3' },
              ],
            },
            validation: {
              messages: {
                required: 'Branch Name is required',
              },
            },
          },
        ],
      },
    ];
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // Handle form submission
    } else {
      // Handle form errors
    }
  }

  onCancelClick() {
    this.router.navigateByUrl('tds/trainer-dashboard');
  }

}
