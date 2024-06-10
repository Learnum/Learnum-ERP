import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
@Component({
  selector: 'app-schedule-meeting-with-college',
  templateUrl: './schedule-meeting-with-college.component.html',
  styleUrls: ['./schedule-meeting-with-college.component.scss']
})
export class ScheduleMeetingWithCollegeComponent implements OnInit {

  meetingList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'collegeName',
      headerName: 'College Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'meetingWith',
      headerName: 'Meeting With',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'meetingDate',
      headerName: 'Meeting Date',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'meetingTime',
      headerName: 'Meeting Time',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'meetingLocation',
      headerName: 'Meeting Location',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'meetingAgenda',
      headerName: 'Meeting Agenda',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
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
      minWidth: 100
    },
    {
      field: 'modifiedTime',
      headerName: 'Modified Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    }
  ];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewMeeting',
      actionIcon: 'uil uil-eye rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
    {
      action: 'edit',
      actionPage: 'EditMeeting',
      actionIcon: 'uil uil-edit rounded text-primary mb-0',
      buttonClass: 'btn btn-sm btn-primary',
      colorClass: 'text-primary h4'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getMeetingList();
  }

  getMeetingList() {
    // this.meetingService.getMeetingList().subscribe(
    //   (result: any) => {
    //     this.meetingList = result.Value;
    //   },
    //   (error: any) => {
    //     console.error("Error occurred while fetching meetings:", error);
    //     this.alertService.ShowErrorMessage("An error occurred while fetching meetings. Please try again later.");
    //   }
    // );
  }

  onAddMeeting() {
    this.router.navigate(['tds/counsellor-dashboard/schedule-meeting-with-college/add-meeting']);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': data.action,
      'MeetingId': data.row.MeetingId
    };
    this.router.navigate(['/tds/counsellor-dashboard/schedule-meeting-with-college/add-meeting'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' action button clicked.');
  }

  selectMeeting(meetings: any) {
    // Handle row selection logic
  }
}
