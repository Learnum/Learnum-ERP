import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  
  form: FormGroup;

  declaredTableColumns: TableColumn[] = [
    {
      field: 'EmployeeName',
      headerName: 'Employee Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200
    },
    {
      field: 'EmployeeEmail',
      headerName: 'Employee Email',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'EmployeePhone',
      headerName: 'Employee Phone',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200

    },
    {
      field: 'DateofBirth',
      headerName: 'Date of Birth',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200

    },
    {
      field: 'Qualification',
      headerName: 'Qualification',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'BloodGroup ',
      headerName: 'BloodGroup ',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'Gender ',
      headerName: 'Gender ',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'EmployeePhoto ',
      headerName: 'EmployeePhoto ',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'addedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    },
    {
      field: 'addedTime',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'modifiedBy',
      headerName: 'Modified By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'modifiedTime',
      headerName: 'Modified Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    }
  ];

  getEmployeeList: any;
  addEmployeeService: any;
 employeeList: any;



  ngOnInit(): void {
    this.GetEmployeeList();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    
    private formBuilder: FormBuilder) {
    {
      this.form = this.formBuilder.group({
       
        // Add more form controls as needed
        firstName: ['', Validators.required],
          lastName: ['', Validators.required],
      });
    }
  }
 
  
  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'branchID': data.row.branchID
    }
    this.router.navigate(['/tds/masters/add-employee'], { queryParams: data1 });
  }

  selectEmployee(employees: any) {

  }
  editEmployee(employeeData: any) {

  //   const employeeId = employeeData.EmpID;
  //   const index = this.tdsReturnList.findIndex(emp => emp.EmpID === employeeId);
  //   if (index !== -1) {
  //   this.openEditForm(employeeData).then((editedEmployeeData: any) => {
  //   this.tdsReturnList[index] = editedEmployeeData;
  //   console.log('Edited Employee:', editedEmployeeData);
  // });
  //   }
  }

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewBranch',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
  onAddEmployee(employee?: any) {

    // let navigationExtras: NavigationExtras = {};
    // if (employee) {
    //   navigationExtras = {
    //     state: {
    //       employeeData: employee
    //     }
    //   };
    // }
    this.router.navigateByUrl('tds/hrd/employees/add-employee')
  }
 

  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  GetEmployeeList() {
    this.addEmployeeService.getEmployeeList().subscribe(
      (result: any) => {
        // this.tdsReturnList = result.Value;
        // let tdsReturnList = result.Value;
      },
      (error: any) => {
        console.error("Error occurred while fetching employee details:", error); 
        this.alertService.ShowErrorMessage("An error occurred while fetching employee details. Please try again later."); 
  }
);
  }

}
