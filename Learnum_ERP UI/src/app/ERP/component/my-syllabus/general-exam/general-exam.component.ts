import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';

@Component({
  selector: 'app-general-exam',
  templateUrl: './general-exam.component.html',
  styleUrls: ['./general-exam.component.scss']
})
export class GeneralExamComponent implements OnInit {
  tdsReturnList: any[] = [];
  form: FormGroup;

  declaredTableColumns: TableColumn[] = [
    {
      field: 'CourseName',
      headerName: 'Course Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'SubjectName',
      headerName: 'Subject Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
   
    {
      field: 'TopicName',
      headerName: 'Topic Name',
      filter: 'agSetColumnFilter',
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
      minWidth: 150
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
  
    // {
    //   field: 'IP status',
    //   headerName: 'IPStatus',
    //   filter: 'agTextColumnFilter',
    //   filterParams: {
    //     buttons: ['reset', 'apply'],
    //   },
    //   minWidth: 100

    // },
    

  ];
  getEmployeeList: any;



  ngOnInit(): void {
   // this.GetbranchList();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    
    //private addBranchService: AddBranchService,
    // private ipadressService:IpAddressService,
    private formBuilder: FormBuilder) {
    {
      this.form = this.formBuilder.group({
        // Define form controls with validators as needed
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        // Add more form controls as needed
      });
    }
  }
  selectBranch(branch: any) {

  }
  // editEmploy(employeeData: any) {

  //   const employeeId = employeeData.EmpID;
  //   const index = this.tdsReturnList.findIndex(emp => emp.EmpID === employeeId);
  //   if (index !== -1) {
  //   this.openEditForm(employeeData).then((editedEmployeeData: any) => {
  //   this.tdsReturnList[index] = editedEmployeeData;
  //   console.log('Edited Employee:', editedEmployeeData);
  // });
  //   }
  // }

  // openEditForm(employeeData: any): Promise<any> {

  //   return new Promise((resolve, reject) => {

  //     setTimeout(() => {
  //       const editedEmployeeData = { ...employeeData };

  //       editedEmployeeData.Status = 'Edited';
  //       resolve(editedEmployeeData);
  //     }, 1000);
  //   });
  // }

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'branchID': data.row.branchID
    }
    this.router.navigate(['/erp/masters/add-subjects'], { queryParams: data1 });
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
  
  // onAddIP(branch?:any)
  // {
  //   let navigationExtras: NavigationExtras = {};
  //   if (branch) {
  //     navigationExtras = {
  //       state: {
  //         branchData: branch
  //       }
  //     };
  //   }
  //   this.router.navigate(['tds/masters/ip-address/add-ipaddress']);
  // }
 
 
  onAddgeneral()
  {
    this.router.navigate(['erp/my-syllabus/general-exam/addgeneralexam']);
  }
  
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }


//   GetbranchList() {
//     this.addBranchService.getBranchDetails().subscribe(
//       (result: any) => {
//         this.tdsReturnList = result.Value;
//         let tdsReturnList = result.Value;
//       },
//       (error: any) => {
//         console.error("Error occurred while fetching employee details:", error);
//         this.alertService.ShowErrorMessage("An error occurred while fetching employee details. Please try again later.");
//       }
//     );
//   }
// }
// 

}


