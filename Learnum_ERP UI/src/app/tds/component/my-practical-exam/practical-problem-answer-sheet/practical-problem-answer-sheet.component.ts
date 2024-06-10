import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-practical-problem-answer-sheet',
  templateUrl: './practical-problem-answer-sheet.component.html',
  styleUrls: ['./practical-problem-answer-sheet.component.scss']
})
export class PracticalProblemAnswerSheetComponent implements OnInit {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setFields();
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({});
  }

  setFields(): void {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          
          // {
          //   className: 'col-12',
          //   key: 'studentAnswer',
          //   type: 'textarea',
          //   props: {
          //     label: 'Student Answer',
          //     placeholder: 'Enter your answer here...',
          //     required: true,
          //   },
          //   validation: {
          //     messages: {
          //       required: 'Answer is required',
          //     },
          //   },
          // },
          {
            key: 'textarea',
            type: 'textarea',
            props: {
              label: 'StudentAnswer',
              placeholder: 'StudentAnswer',
              required: true,
              rows:10,
            },
          },
          // {
          //   key: 'studentAnswer',
          //   type: 'input',
          //   props: {
          //     label: 'StudentAnswer',
          //     placeholder: 'Placeholder',
          //     description: 'Description',
          //     required: true,
          //     rows: 5, // Adjust the number of rows to increase height
          //    cols: 50, // Adjust the number of columns to increase width
          //    style: { width: '100%', height: '200px' }
          //   },
          // },
        ],
      },
    ];
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // Handle valid form submission
      console.log(this.model);
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  onCancelClick(): void {
    this.router.navigateByUrl('tds/my-practical-exam');  // Adjust the URL as necessary
  }
}
