import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddcollegesService } from './addcolleges.service';
import { AddcollegesDetails } from './addcolleges.model';

@Component({
  selector: 'app-add-collegs',
  templateUrl: './add-collegs.component.html',
  styleUrls: ['./add-collegs.component.scss']
})
export class AddCollegsComponent implements OnInit {

  addcollegesDetails:AddcollegesDetails=new AddcollegesDetails();

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  contactForm: FormGroup;
  departmentForm:FormGroup
  collegeDetails:any;
  contactDetails: any[] = [];
  departmentDetails: any[] = [];

  constructor(
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private addcollegesService:AddcollegesService
  ) { }

  ngOnInit(): void {
  
    this.createContactForm();
    this.createDepartmentForm();
    this.setParameter();
    this.getBranchDetails();

  }

 

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            className: 'col-md-4',
            type: 'select',
            key: 'BranchId',
            templateOptions: {
              placeholder: 'Branch Name',
              type: 'text',
              label: "Branch Name",
              required: true,
              options: this.collegeDetails? this.collegeDetails.map(college => ({ label: college.BranchName, value: college.BranchId })) : [],
            },
          },
          {
            className: 'col-md-4',
            key: 'collegeName',
            type: 'input',
            props: {
              label: 'College Name',
              placeholder: 'College Name',
              required: true,
            },
            validation: {
              messages: {
                required: 'College Name is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'collegeAddress',
            type: 'input',
            props: {
              label: 'College Address',
              placeholder: 'College Address',
              required: true,
            },
            validation: {
              messages: {
                required: 'College Address is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'city',
            type: 'input',
            props: {
              label: 'City',
              placeholder: 'City',
              required: true,
            },
            validation: {
              messages: {
                required: 'City is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'state',
            type: 'input',
            props: {
              label: 'State',
              placeholder: 'State',
              required: true,
            },
            validation: {
              messages: {
                required: 'State is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'pincode',
            type: 'input',
            props: {
              label: 'Pincode',
              placeholder: 'Pincode',
              required: true,
            },
            validation: {
              messages: {
                required: 'Pincode is required',
              },
            },
          },
           
          {
            className: 'col-md-4',
            key: 'collegeWebsite',
            type: 'input',
            props: {
              label: 'College Website',
              placeholder: 'College Website',
              required: true,
            },
            validation: {
              messages: {
                required: 'College Website is required',
              },
            },
          },
          {
            className: 'col-md-4',
            key: 'branchName1',
            type: 'input',
            props: {
              label: 'Branch Name 1',
              placeholder: 'Branch Name 1',
              required: true,
            },
            validation: {
              messages: {
                required: 'Branch Name 1 is required',
              },
            },
          },
          {
            //className: 'col-md-4',
            key: 'aboutCollege',
            type: 'textarea',
            props: {
              label: 'About College',
              placeholder: 'About College',
              required: true,
              rows:3
            },
            validation: {
              messages: {
                required: 'About College is required',
              },
            },
          },
        ],
      },
    ];
  }

  createContactForm(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      jobRole: ['', Validators.required],
    });
  }

  addContact(): void {
    if (this.contactForm.valid) {
      this.contactDetails.push(this.contactForm.value);
      this.contactForm.reset();
      this.modalService.dismissAll();
    } else {
      
    }
  }

  createDepartmentForm(): void {
    this.departmentForm = this.formBuilder.group({
      coursename: ['', Validators.required],
      seats: ['', Validators.required],
    });
  }

  addDepartment(): void {
    
    if (this.departmentForm.valid) {
      this.departmentDetails.push(this.departmentForm.value);
      this.departmentForm.reset();
      this.modalService.dismissAll();
      this.router.navigateByUrl('tds/counsellor-dashboard/colleges/add-collegs');
    } else {
      
    }
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }

  onCancelClick() {
    this.router.navigateByUrl('tds/counsellor-dashboard/colleges');
  }

  getBranchDetails() {
    this.addcollegesService.getBranchList().subscribe(
      (data: any) => {
        this.collegeDetails = data.Value;
        this.setParameter();  
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  
}
