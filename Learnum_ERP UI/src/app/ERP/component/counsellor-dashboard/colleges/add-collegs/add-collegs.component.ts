import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AlertService } from 'src/app/core/services/alertService';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddcollegesService } from './addcolleges.service';
import { AddcollegesDetails, CollegeContactDetails, ContactDetails, DepartmentDetails } from './addcolleges.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { MessageService } from 'src/app/core/services/message.service';
import { ModalService } from 'src/app/core/services/modal.service';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-add-collegs',
  templateUrl: './add-collegs.component.html',
  styleUrls: ['./add-collegs.component.scss']
})
export class AddCollegsComponent implements OnInit {

  collegeContactDetails: AddcollegesDetails = new AddcollegesDetails();
  //contactForm = new FormGroup({});
  collegeForm: FormGroup;
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  contactForm: FormGroup;
  departmentForm: FormGroup;
  collegeDetails: any;
  contactDetails: any[] = [];
  departmentDetails: any[] = [];
  contactFields: FormlyFieldConfig[];
  departmentFields: FormlyFieldConfig[];
  roleDetails: any;
  collegeroleDetails: any;
  StateList: any;
  branchDetails: any;
  contact: { [key: string]: AbstractControl; };
  editData: any;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    //private modalService: NgbModal,
    private activateRoute: ActivatedRoute,
    private messageService: MessageService,
    private addcollegesService: AddcollegesService,
    public modalService: ModalService
  ) {
    this.createContactForm();
  }



  ngOnInit(): void {
    this.createContactForm();
    this.createDepartmentForm();
    this.setParameter();
    this.getBranchDetails();
    this.getJobroleList();
    this.getCollegeList();
    this.getAllStates();
    this.editData = this.activateRoute.snapshot.queryParams;
    if (this.editData.source === 'edit' && this.editData.CollegeId) {
      this.getAddCollegeDetailsBycollegeId(this.editData.CollegeId);
    }
  }

  setParameter() {
    this.fields = [
      {
        fieldGroupClassName: 'row card-body p-2',
        fieldGroup: [
          {
            key: 'CollegeId'
          },
          {
            className: 'col-md-3',
            type: 'input',
            key: 'CollegeName',
            props: {
              placeholder: 'College Name',
              type: 'text',
              label: 'College Name',
              required: true,
              pattern: "^[A-Za-z]+( [A-Za-z]+)*$", 
            },
            validation: {
              messages: {
                required: 'College Name is required',
                pattern: 'Please enter a valid College name ',
              },
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  // Remove any numbers from the input
                  const sanitizedValue = value.replace(/[^A-Za-z ]/g, '');
                  // Capitalize the first letter of each word
                  const capitalizedValue = sanitizedValue.replace(/\b\w/g, char => char.toUpperCase());
                  if (value !== capitalizedValue) {
                    field.formControl.setValue(capitalizedValue, { emitEvent: false });
                  }
                });
              }
            },
          },
          {
            className: 'col-md-3',
            key: 'CollegeAddress',
            type: 'input',
            props: {
              label: 'College Address',
              placeholder: 'Address Line 1',
              required: true,
             pattern: "^(?!\\s*$).+", 
             attributes: {
                oninput: "this.value = this.value.replace(/[^A-Za-z0-9 ]/g, '').replace(/\\b\\w/g, (char) => char.toUpperCase());", // Removes any non-alphanumeric character except spaces and capitalizes the first letter of each word
              },
            },
            validation: {
              messages: {
                required: 'Address is required',
                pattern: 'Please Enter a valid Address',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'City',
            type: 'input',
            props: {
              label: 'City',
              placeholder: 'City',
              required: true,
              pattern: "^[A-Za-z]+( [A-Za-z]+)*$", 
            },
            validation: {
              messages: {
                required: 'City is required',
                pattern: 'Please enter a valid City ',
              },
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  // Remove any numbers from the input
                  const sanitizedValue = value.replace(/[^A-Za-z ]/g, '');
                  // Capitalize the first letter of each word
                  const capitalizedValue = sanitizedValue.replace(/\b\w/g, char => char.toUpperCase());
                  if (value !== capitalizedValue) {
                    field.formControl.setValue(capitalizedValue, { emitEvent: false });
                  }
                });
              }
            },
          },
          {
            className: 'col-md-3',
            key: 'District',
            type: 'input',
            props: {
              label: 'District',
              placeholder: 'District',
              required: true,
              pattern: "^[A-Za-z]+( [A-Za-z]+)*$", 
            },
            validation: {
              messages: {
                required: 'City is required',
                pattern: 'Please enter a valid District ',
              },
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  // Remove any numbers from the input
                  const sanitizedValue = value.replace(/[^A-Za-z ]/g, '');
                  // Capitalize the first letter of each word
                  const capitalizedValue = sanitizedValue.replace(/\b\w/g, char => char.toUpperCase());
                  if (value !== capitalizedValue) {
                    field.formControl.setValue(capitalizedValue, { emitEvent: false });
                  }
                });
              }
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'StateId',
            templateOptions: {
              label: "State Name",
              //  placeholder: 'Select State',  // Placeholder for the dropdown
              required: true,
              options: [
                { value: null, label: 'Select State', disabled: true },  // Disabled placeholder option
                ...this.StateList ? this.StateList.map(state => ({
                  label: state.StateName,
                  value: state.StateId
                })) : [],
              ],
            },
            defaultValue: null,  // Optional: set a default value if needed
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'State is required',
              },
            },
            validation: {
              messages: {
                required: 'State is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'PostalCode',
            type: 'input',
            templateOptions: {
              label: 'PIN Code',
              placeholder: 'Enter Postal Code',
              required: true,
              maxLength: 6,
              minLength: 6
            },
            hooks: {
              onInit: (field) => {
                field.formControl.valueChanges.subscribe(value => {
                  const sanitizedValue = value.replace(/[^0-9]/g, '');
                  if (sanitizedValue !== value) {
                    field.formControl.setValue(sanitizedValue, { emitEvent: false });
                  }
                });
              },
            },
            validators: {
              pincode: {
                expression: (c: AbstractControl) => {
                  const value = c.value;
                  // Ensure the value is exactly 6 digits long
                  return value && /^[0-9]{6}$/.test(value);
                },
                message: (error: any, field: FormlyFieldConfig) => {
                  return `"${field.formControl.value}" is not a valid 6-digit Pincode`;
                },
              },
            },
            validation: {
              messages: {
                required: 'Pincode is required',
                pincode: 'The Pincode must contain only numbers and be exactly 6 digits long',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'CollegeWebsite',
            type: 'input',
            props: {
              label: 'College Website',
              placeholder: 'College Website',
              required: true,
              pattern: '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$', // Pattern to match website URL
              // description: 'Enter a valid website URL.',
            },
            validation: {
              messages: {
                required: 'College Website is required',
                pattern: 'Please enter a valid website URL',
              },
            },
          },
          {
            className: 'col-md-3',
            type: 'select',
            key: 'BranchId',
            templateOptions: {
              label: "Branch Name",
              //placeholder: 'Select Branch',  // Placeholder for the dropdown
              required: true,
              options: [
                { value: null, label: 'Select Branch', disabled: true },  // Disabled placeholder option
                ...this.branchDetails ? this.branchDetails.map(branch => ({
                  label: branch.BranchName,
                  value: branch.BranchId
                })) : [],
              ]
            },
            defaultValue: null,  // Optional: set a default value if needed
            validators: {
              required: {
                expression: (c: AbstractControl) => c.value !== null && c.value !== '', // Ensure a valid value is selected
                message: 'Branch selection is required',
              },
            },
            validation: {
              messages: {
                required: 'Branch selection is required',
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'BranchName1',
            type: 'input',
            props: {
              label: 'Branch Name 1',
              placeholder: 'Branch Name 1',
              required: true,
              pattern: "^[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$", // Allows alphabetic characters, numbers, and single spaces between words
              attributes: {
                oninput: "this.value = this.value.replace(/[^A-Za-z0-9 ]/g, '').replace(/\\b\\w/g, (char) => char.toUpperCase());", // Removes any non-alphanumeric character except spaces and capitalizes the first letter of each word
              },
            },
            validation: {
              messages: {
                required: 'Branch Name1 is required',
                pattern: 'Enter Branch Name 1 '
              },
            },
          },
          {
            className: 'col-md-3',
            key: 'AboutCollege',
            type: 'textarea',
            props: {
              label: 'About College',
              placeholder: 'About College',
              required: true,
              //pattern: "^[A-Za-z]+( [A-Za-z]+)*$",
              pattern: "^(?!\\s*$).+",
              attributes: {
                style: 'overflow:hidden; resize:none;',
                oninput: "this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px';"
              }
            },
            validation: {
              messages: {
                required: 'About College is required',
                pattern: 'Enter About College'
              },
            },
          },
        ],
      },
    ];
  }

  createContactForm(): void {
    this.contactForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      Email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      RoleId: ['', Validators.required],
    });
    this.contact = this.contactForm.controls;
  }
  closeModal(): void {
    this.modalService.close();
  }
  addContact(): void {
    if (this.contactForm.valid) {
      // Add contact details if form is valid
      this.contactDetails.push(this.contactForm.value);
      this.contactForm.reset();
      // Manually close the modal if needed, or rely on Bootstrap's data-dismiss attribute
      const contactModal = document.getElementById('contactModal');
      if (contactModal) {
        const modalInstance = bootstrap.Modal.getInstance(contactModal);
        modalInstance?.hide(); // Close the modal
      }
    } else {
      // Show an alert message if form is invalid
      this.contactForm.markAllAsTouched();
      this.alertService.ShowErrorMessage("Please fill all required fields.");

    }
  }
  onCloseModal(): void {
    // Manually close the modal
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
      const modalInstance = bootstrap.Modal.getInstance(contactModal);
      modalInstance?.hide(); // Close the modal
    }
  }
  createDepartmentForm(): void {
    this.departmentForm = this.formBuilder.group({
      CourseId: ['', Validators.required],
      Seats: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }
  addDepartment(): void {
    if (this.departmentForm.valid) {
      // Add department details if form is valid
      this.departmentDetails.push(this.departmentForm.value);
      this.departmentForm.reset();

      // Close the modal programmatically
      const departmentModal = document.getElementById('departmentModal');
      if (departmentModal) {
        const modalInstance = bootstrap.Modal.getInstance(departmentModal);
        modalInstance?.hide(); // Close the modal
      }
    } else {
      // Show an alert message if form is invalid
      //  this.departmentForm.markAllAsTouched();
      this.alertService.ShowErrorMessage("Please fill all required fields.");
      // Prevent closing by not using data-dismiss or handling manually
    }
  }

  onCloseDepartmentModal(): void {
    // Manually close the department modal
    const departmentModal = document.getElementById('departmentModal');
    if (departmentModal) {
      const modalInstance = bootstrap.Modal.getInstance(departmentModal);
      modalInstance?.hide(); // Close the modal
    }
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.insertCollegeDetails();
      //this.combineFormData();
      console.log(this.departmentDetails);
      console.log(this.contactDetails);
      console.log(this.collegeContactDetails)
    } else {
      this.alertService.ShowErrorMessage('Please fill in all required fields.');
    }
  }
  onResetClick() {
    this.form.reset();
  }
  onCancelClick() {
    this.router.navigateByUrl('erp/counsellor-dashboard/colleges');
  }
  onCloseNavigate() {
    this.router.navigate(['erp/counsellor-dashboard/colleges/add-collegs']);
  }
  getBranchDetails() {
    this.addcollegesService.getBranchList().subscribe(
      (data: any) => {
        this.branchDetails = data.Value;
        this.setParameter();
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getJobroleList() {
    this.addcollegesService.getroleList().subscribe(
      (data: any) => {
        this.roleDetails = data.Value;
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getCollegeList() {
    this.addcollegesService.getCollegeList().subscribe(
      (data: any) => {
        this.collegeroleDetails = data.Value;
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );
  }
  getAllStates() {
    this.addcollegesService.getAllStates().subscribe(
      (result) => {
        let data = result.Value;
        this.StateList = data
        this.setParameter();
      }, (error) => {

      });
  }

  insertCollegeDetails() {
    this.collegeContactDetails.addedBy = 1;
    this.collegeContactDetails.addedDate = new Date();
    this.collegeContactDetails.updatedBy = 1;
    this.collegeContactDetails.updatedDate = new Date();
    //this.collegeContactDetails.collegeId = 0;

    const data: CollegeContactDetails = {
      addcollegesDetails: this.form.value,
      contactDetails: this.contactDetails,
      departmentDetails: this.departmentDetails
    };
    this.addcollegesService.insertCollegesData(data).subscribe(
      (result: any) => {
        const serviceResponse = result.Value;
        if (serviceResponse === ResponseCode.Success) {
          this.alertService.ShowSuccessMessage(this.messageService.savedSuccessfully);
          this.router.navigateByUrl('erp/counsellor-dashboard/colleges');
        } else if (serviceResponse === ResponseCode.Update) {
          this.alertService.ShowSuccessMessage(this.messageService.updateSuccessfully);
          this.router.navigateByUrl('erp/counsellor-dashboard/colleges');
        } else {
          this.alertService.ShowErrorMessage(this.messageService.serviceError);
        }
      },
      (error: any) => {
        this.alertService.ShowErrorMessage(error);
      }
    );

  }
  validateName(event: KeyboardEvent) {
    const inputValue: string = event.key;
    if (!/^[a-zA-Z\s]*$/.test(inputValue)) {
      event.preventDefault();
    }
  }
  validateNumber(event: KeyboardEvent) {
    const inputValue: string = event.key;
    if (isNaN(Number(inputValue))) {
      event.preventDefault();
    }
  }

  getAddCollegeDetailsBycollegeId(CollegeId: number) {
    this.addcollegesService.getCollegesDetailsByCollegeId(CollegeId).subscribe(
      (result: any) => {
        if (result && result.Value) {
          this.collegeContactDetails = result.Value.Item1.addCollegesDetails;
          this.contactDetails = result.Value.Item1.contactDetails;
          this.departmentDetails = result.Value.Item1.departmentDetails;
          this.setParameter();
          console.error('No data found for CollegeId: ' + CollegeId);
        }
      },
      (error: any) => {
        console.error('Error retrieving college details:', error);
      }
    );
  }
}
