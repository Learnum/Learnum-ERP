import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { EmployeeService } from './add-employee/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit {

  form: FormGroup;
  employeeList: [] = [];

  constructor(private router: Router,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewEmployee',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip: 'Edit Employee'
    },
  ];

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
      field: 'Email',
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
      cellClass: "dateLong",
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200,
      headerTooltip: 'Date',
      valueFormatter: (params) => {
        var date = new Date(params.value);
        var day = date.getDate().toString().padStart(2, "0");
        var month = (date.getMonth() + 1).toString().padStart(2, "0");
        var year = date.getFullYear().toString();
       
        return ( day + "/" +  month + "/" + year + "");

      },

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
      field: 'BloodGroup',
      headerName: 'BloodGroup ',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'Gender',
      headerName: 'Gender ',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'AddedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    },
    {
      field: 'AddedDate',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 200,
      headerTooltip: 'Date',
      valueFormatter: (params) => {
        var date = new Date(params.value);
        var day = date.getDate().toString().padStart(2, "0");
        var month = (date.getMonth() + 1).toString().padStart(2, "0");
        var year = date.getFullYear().toString();
       
        return ( day + "/" +  month + "/" + year + "");

      },
    },
    {
      field: 'UpdatedBy',
      headerName: 'Modified By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'UpdatedDate',
      headerName: 'Modified Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 200,
      headerTooltip: 'Date',
      valueFormatter: (params) => {
        var date = new Date(params.value);
        var day = date.getDate().toString().padStart(2, "0");
        var month = (date.getMonth() + 1).toString().padStart(2, "0");
        var year = date.getFullYear().toString();
       
        return ( day + "/" +  month + "/" + year + "");

      },
    }
  ];


  editEmployee(employeeData: any) {}

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'EmployeeId': data.row.EmployeeId
    }
    this.router.navigate(['erp/hrd/employees/add-employee'], { queryParams: data1 });
  }
  
   
    onAddEmployee(employee?: any) {
     this.router.navigateByUrl('erp/hrd/employees/add-employee')
    }
   
    selectemployee($event: any) {
      throw new Error('Method not implemented.');
      }
        
  
    onActionButton(action: string) {
      alert(action + ' ' + 'action button clicked.');
    }

    getEmployeeList() {
      this.employeeService.getEmployeeList().subscribe((result: any) => {
        this.employeeList = result.Value;
        
      })
    }
}
