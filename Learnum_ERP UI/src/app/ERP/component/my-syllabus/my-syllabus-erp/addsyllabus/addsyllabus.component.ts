import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddsyllabusService } from './addsyllabus.service';
import { SyllabusDetailsModel, SyllabusListModel } from './syllabusDetailsModel';
import * as bootstrap from 'bootstrap';
import { ResponseCode } from 'src/app/core/models/responseObject.model';


@Component({
  selector: 'app-addsyllabus',
  templateUrl: './addsyllabus.component.html',
  styleUrls: ['./addsyllabus.component.scss']
})
export class AddsyllabusComponent implements OnInit {

  SyllabusList: SyllabusDetailsModel = new SyllabusDetailsModel();
  syllabusListModel: SyllabusListModel = new SyllabusListModel();

  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {};
  editData: any;
  form = new FormGroup({});
  topicDetails: any[] = [];
  topicInformationModel: any[] = [];
  syllabusDetailsModel: any[] = [];
  SyllabusDetailsModel: any[] = [];
  topicDetailsForm: FormGroup;
  subjectDetails: any;
  courseDetails: any;
  TopicInformationModel: any;
  index: any;

  constructor(
    private router: Router,
    private addsyllabusService: AddsyllabusService,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal

  ) { }

  ngOnInit(): void {
    this.setParameter();
    this.createTopicDetailsForm();
    this.getCourseDetails();
    this.getSubjectDetails();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.syllabusId) {
      this.getAddSyllabusDetailsById(this.editData.syllabusId);
    }
  }



  createTopicDetailsForm(): void {
    this.topicDetailsForm = this.fb.group({
      Heading: ['', Validators.required],
      Content: ['', Validators.required],
      File: ['', Validators.required],   // File is now a required field
      Reference: ['', Validators.required],
      SubTopic: ['', Validators.required],
    });
  }

  addTopicDetails(): void {
    if (this.topicDetailsForm.valid) {
      this.topicDetails.push(this.topicDetailsForm.value);
      this.topicDetailsForm.reset();
      this.modalService.dismissAll();
    } else {
      this.topicDetailsForm.markAllAsTouched();
    }
  }


  reset() {
    throw new Error('Method not implemented.');
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [

          {
            className: 'col-md-3',
            type: 'select',
            key: 'CourseId',
            templateOptions: {
              label: "Course Name",
              required: true,
              options: [
                { value: null, label: 'Select Course', disabled: true },
                ...this.courseDetails ? this.courseDetails.map(course => ({ label: course.CourseName, value: course.CourseId })) : [],
              ]
            },
            defaultValue: null,
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '',
                message: 'Course Name is required',
              },
            },
            validation: {
              messages: {
                required: 'Course Name is required',
              },
            },
          },


          {
            className: 'col-md-3',
            type: 'select',
            key: 'SubjectId',
            templateOptions: {
              label: "Subject Name",
              required: true,
              options: [
                { value: null, label: 'Select Subject', disabled: true },
                ...this.subjectDetails ? this.subjectDetails.map(subject => ({
                  label: subject.SubjectName,
                  value: subject.SubjectId
                })) : [],
              ]
            },
            defaultValue: null,
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Subject Name is required',
              },
            },
            validation: {
              messages: {
                required: 'Subject Name is required',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'TopicName',
            props: {
              placeholder: 'Enter topic',
              type: 'text',
              label: "Topic Name",
              required: true,

            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'IsActive',
            templateOptions: {
              label: 'Topic Status',
              //placeholder: 'Select McqAssignment Status',
              required: true,
              options: [
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' }
              ],

            },
            defaultValue: 'Active',
            validation: {
              messages: {
                required: 'Please select a branch status',
              },
            },
          },
        ],
      },
    ];
  }

  onCancleClick() {
    this.router.navigateByUrl('erp/my-syllabus/my-syllabus-erp');
  }

  onnavigate() {
    this.router.navigateByUrl('erp/my-syllabus/my-syllabus-erp');
  }

  onSubmit(): void {
    this.topicDetailsForm.markAllAsTouched();
    if (this.topicDetails.length > 0) {
      this.insertSyllabusDetails();
      console.log(this.topicDetails);
      console.log(this.SyllabusList);
      //console.log(this.TopicInformationModel);
    }
    else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  onCloseModal(): void {

    const topicDetailsForm = document.getElementById('topicDetailsForm');
    if (topicDetailsForm) {
      const modalInstance = bootstrap.Modal.getInstance(topicDetailsForm);
      modalInstance?.hide();
    }
  }

  insertSyllabusDetails() {
    this.SyllabusList.AddedBy = 1;
    this.SyllabusList.AddedDate = new Date();
    this.SyllabusList.UpdatedBy = 1;
    this.SyllabusList.UpdatedDate = new Date();

    const data: SyllabusListModel = {
      syllabusDetailsModel: this.form.value,
      topicInformationModel: this.topicDetails,
    };

    this.addsyllabusService.insertSyllabusData(data).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('erp/my-syllabus/my-syllabus-erp');
        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('erp/my-syllabus/my-syllabus-erp');
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  getCourseDetails() {
    this.addsyllabusService.getcourseList().subscribe(
      (data: any) => {
        this.courseDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }

  getSubjectDetails() {
    this.addsyllabusService.getsubjectList().subscribe(
      (data: any) => {
        this.subjectDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }


  getAddSyllabusDetailsById(syllabusId: number) {
    this.addsyllabusService.getAddSyllabusDetailsById(syllabusId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.SyllabusList = result.Value.Item1.SyllabusDetailsModel;
          this.topicDetails = result.Value.Item1.TopicInformationModel;
          this.setParameter();

          console.error('No data found for McqId: ' + syllabusId);  // This should be inside the else block
        }
      },
      (error: any) => {
        console.error('Error retrieving MCQ details:', error);
      }
    );
  }

  onFileSelected(event: any, index: number): void {
    const file = event.target.files[0]; // Get the file object
    this.syllabusListModel.topicInformationModel[index].File = file; // Assign the file to the corresponding topic
  }

}







