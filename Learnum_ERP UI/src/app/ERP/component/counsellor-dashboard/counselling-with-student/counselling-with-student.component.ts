import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn, ActionColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { StudentcounsellingService } from './counselling-student/studentcounselling.service';
@Component({
  selector: 'app-counselling-with-student',
  templateUrl: './counselling-with-student.component.html',
  styleUrls: ['./counselling-with-student.component.scss']
})
export class CounsellingWithStudentComponent implements OnInit {

  StudentCounsellingList: any[] = [];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'View',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip: 'Edit '
    },
  ];
  declaredTableColumns: TableColumn[] = [
    {
      field: 'CounsellingId',
      headerName: 'SR.NO',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'SR.NO'
    },
    {
      field: 'StudentName',
      headerName: 'Student Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Student Name'
    },
    {
      field: 'Phone',
      headerName: 'Phone',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Phone'
    },
    {
      field: 'CounsellingConversation',
      headerName: 'Counselling Conversation',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Counselling Conversation'
    },
    {
      field: "CounsellingDate",
      headerName: "CounsellingDate",
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
      field: "CounsellingTime",
      headerName: "CounsellingTime",
      cellClass: "dateLong",
      minWidth: 150,
      valueFormatter: (params) => {
        var date = new Date(params.value);
        // var day = date.getDate().toString().padStart(2, "0");
        // var month = (date.getMonth() + 1).toString().padStart(2, "0");
        // var year = date.getFullYear().toString();
         var hourNum = date.getHours() % 12;
        var hour = (hourNum === 0 ? 12 : hourNum).toString().padStart(2, "0");
        var min = date.getMinutes().toString().padStart(2, "0");
        var sec = date.getSeconds().toString().padStart(2, "0");
        var amPM = date.getHours() < 12 ? "AM" : "PM";

        return ( hour + ":" + min + ":" + sec + " " + amPM);
      },
    },
  
    {
      field: 'CounsellingStatus',
      headerName: 'Counselling Status',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'College Website'
    },
    {
      field: 'addedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Added By'
    },
    {
      field: 'addedTime',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Added Time'
    },
    {
      field: 'updatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated By'
    },
    {
      field: 'updatedTime',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated Time'
    },

  ];



  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private studentcounsellingService: StudentcounsellingService
  ) { }

  ngOnInit(): void {
    this.getStudentCounsellingDetails();
  }
  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'CounsellingId': data.row.CounsellingId
    }
    this.router.navigate(['erp/counsellor-dashboard/counselling-with-student/counselling-student'], { queryParams: data1 });
  }
  
  selectStudentCounselling($event: any) {
    throw new Error('Method not implemented.');
  }

  onAddStudentCounselling(student?: any) {

    let navigationExtras: NavigationExtras = {};
    if (student) {
      navigationExtras = {
        state: {
          studentData: student
        }
      };
    }
    this.router.navigateByUrl('erp/counsellor-dashboard/counselling-with-student/counselling-student')
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }

  getStudentCounsellingDetails() {
    this.studentcounsellingService.getStudentCounsellingDetails().subscribe((result: any) => {
      this.StudentCounsellingList = result.Value;
      let StudentCounsellingList = result.Value;
    })
  }

}
