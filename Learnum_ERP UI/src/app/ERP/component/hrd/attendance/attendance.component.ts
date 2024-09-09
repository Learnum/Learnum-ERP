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


  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'Viewattendence',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip: 'Edit Attendence'
    },
  ];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'Name',
      headerName: 'Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'Name',
    },
    {
      field: "Date",
      headerName: "Date",
      cellClass: "dateLong",
      minWidth: 150,
      valueFormatter: (params) => {
        var date = new Date(params.value);
        var day = date.getDate().toString().padStart(2, "0");
        var month = (date.getMonth() + 1).toString().padStart(2, "0");
        var year = date.getFullYear().toString();
       
        return ( day + "/" +  month + "/" + year + "");

      },
    },
    {
      field: 'Role',
      headerName: 'Role',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100,
      headerTooltip: 'Role',
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
      minWidth: 150,
      headerTooltip: 'Added By',
    },
    {
      field: 'addedTime',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Added Time',
    },
    {
      field: 'updatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated By',
    },
    {
      field: 'updatedTime',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated Time',
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

  selectBranch(branch: any) { }


  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'AttendenceId': data.row.AttendenceId
    }
    this.router.navigate(['/erp/hrd/attendance/add-record'], { queryParams: data1 });
  }

  onAddAttendence() {

    this.router.navigateByUrl('erp/hrd/attendance/add-record')
  }


  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }


  GetAttendanceList() {
    this.addrecordService.getAttendanceDetails().subscribe(
      (result: any) => {
        this.AttendanceList = result.Value;
        let AttendanceList = result.Value;
      },
      (error: any) => {
        console.error("Error occurred while fetching employee details:", error);
        this.alertService.ShowErrorMessage("An error occurred while fetching employee details. Please try again later.");
      }
    );

  }

}






