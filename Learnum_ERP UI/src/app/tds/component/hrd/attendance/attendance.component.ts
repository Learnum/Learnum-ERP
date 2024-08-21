import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddrecordService } from './add-record/addrecord.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  AttendanceList: any[] = [];
  form: FormGroup;

  declaredTableColumns: TableColumn[] = [
    {
      field: 'Name',
      headerName: 'Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    {
      field: 'Date',
      headerName: 'Date',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
     
    {
      field: 'Role',
      headerName: 'Role',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100

    },
    // {
    //   field: 'IsActive',
    //   headerName: 'Status',
    //   filter: 'agTextColumnFilter',
    //   filterParams: {
    //     buttons: ['reset', 'apply'],
    //   },
    //   minWidth: 200,
    //   valueFormatter: params => {
    //     return params.value ? 'Active' : 'Inactive';
    //   }
    // },
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
      field: 'updatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'updatedTime',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    }, 
    
  ];



  




  ngOnInit(): void {
    this.GetAttendanceList();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addrecordService: AddrecordService,
   private formBuilder: FormBuilder) {
    }

  selectBranch(branch: any) {

  }


  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'AttendenceId': data.row.AttendenceId
    }
    this.router.navigate(['/tds/hrd/attendance/add-record'], { queryParams: data1 });
  }



  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'Viewattendence',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Attendence'
    },
  ];
  onAddAttendence() {

    // let navigationExtras: NavigationExtras = {};
    // if (employee) {
    //   navigationExtras = {
    //     state: {
    //       employeeData: employee
    //     }
    //   };
    // }
    this.router.navigateByUrl('tds/hrd/attendance/add-record')
  }
 

  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }


  GetAttendanceList() {
    this.addrecordService.getAttendanceDetails().subscribe(
      (result: any) => {
        this. AttendanceList = result.Value;
        let  AttendanceList = result.Value;
      },
      (error: any) => {
        console.error("Error occurred while fetching employee details:", error);
        this.alertService.ShowErrorMessage("An error occurred while fetching employee details. Please try again later.");
      }
    );
  
  }



  editAttendance(AttendanceData: any) {
    const AttendenceId = AttendanceData.AttendenceId;
    const index = this. AttendanceList.findIndex(Attendance => Attendance.AttendenceId === AttendenceId);

    if (index !== -1) {
      this.openEditForm(AttendanceData).then((editedAttendanceData: any) => {
        this. AttendanceList[index] =editedAttendanceData;
        console.log('Edited Attendance:', editedAttendanceData);
      });
    }
  }

  openEditForm(AttendanceData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const editedAttendanceData = { ...AttendanceData };
        editedAttendanceData.Status = 'Edited';
        resolve(editedAttendanceData);
      }, 1000);
    });
  }
}
  





