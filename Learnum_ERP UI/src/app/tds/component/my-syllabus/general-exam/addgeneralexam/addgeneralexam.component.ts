import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addgeneralexam',
  templateUrl: './addgeneralexam.component.html',
  styleUrls: ['./addgeneralexam.component.scss']
})
export class AddgeneralexamComponent implements OnInit {
model: any;
onCancelClick() {
throw new Error('Method not implemented.');
}
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  form: FormGroup;
  subjectDetails: any;
  mcqDetails: any[] = [];
  mcqForm: FormGroup;
  practicalProblemForm: FormGroup;
  practicalProblemDetails: any[] = [];

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private formBuilder: FormBuilder ,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.createForm();
    this.createMcqForm();
    this.createPracticalProblemForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      CourseName: ['', Validators.required], 
      SujectName: ['', Validators.required], 
      ExamName: ['', Validators.required], 
    });
  }

  createMcqForm(): void {
    this.mcqForm = this.formBuilder.group({
      question: ['', Validators.required],
      optionA: ['', Validators.required],
      optionB: ['', Validators.required],
      optionC: ['', Validators.required],
      optionD: ['', Validators.required],
      answer: ['', Validators.required],
      marks: ['', Validators.required],
      mcqStatus: ['', Validators.required]
    });
  }
  createPracticalProblemForm(): void {
    this.practicalProblemForm = this.formBuilder.group({
      question: ['', Validators.required],
      modelAnswer: ['', Validators.required],
      attachment: [null],
      marks: ['', Validators.required],
      practicalProblemStatus: ['', Validators.required]
    });
  }
  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-6',
            type: 'select',
            key: 'CourseName',
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
            key: 'SubjectName',
            props: { 
              placeholder: 'Enter Subject Name',
              type: 'text',
              label: "Subject Name",
              required: true,
            },
          },
          {
            className: 'col-md-6',
            type: 'select',
            key: 'ExamName',
            props: { 
              placeholder: 'select',
              type: 'text',
              label: "Exam Name",
              required: true,
            },
          },
          {
            className: 'col-md-6',
            type: 'select',
            key: 'McqAssignmentStatus',
            props: { 
              placeholder: 'select',
              type: 'text',
              label: "MCQ Assignments Status",
              required: true,
            },
          },
        ],
      },
    ];
  }

  onCancleClick() {
    this.router.navigateByUrl('tds/my-syllabus/general-exam');
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // Handle form submission
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  reset(): void {
    this.form.reset();
  }

  addMcq(): void {
    if (this.mcqForm.valid) {
      this.mcqDetails.push(this.mcqForm.value);
      this.mcqForm.reset();
      this.modalService.dismissAll();
    } else {
      this.mcqForm.markAllAsTouched();
    }
  }
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
