import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { CollegemeetingService } from './add-meeting/collegemeeting.service';

@Component({
  selector: 'app-schedule-meeting-with-college',
  templateUrl: './schedule-meeting-with-college.component.html',
  styleUrls: ['./schedule-meeting-with-college.component.scss']
})
export class ScheduleMeetingWithCollegeComponent implements OnInit {

  meetingDetailsList: any[] = [];
  form: FormGroup;

  declaredTableColumns: TableColumn[] = [
    {
      field: 'MeetingId',
      headerName: 'SR>NO',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'CollegeName',
      headerName: 'College Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'Meetingwith',
      headerName: 'Meeting With',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'MeetingDate',
      headerName: 'Meeting Date',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'MeetingTime',
      headerName: 'Meeting Time',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'MeetingLocation',
      headerName: 'Meeting Location',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'MeetingAgenda',
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
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'updatedDate',
      headerName: 'Updated Date',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
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
    private collegemeetingService: CollegemeetingService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      // Apply validators here if needed
    });
  }

  ngOnInit(): void {
    this.getMeetingDetails();
  }

  onAddMeeting() {
    this.router.navigate(['/tds/counsellor-dashboard/schedule-meeting-with-college/add-meeting']);
  }

  selectCourse(event: any) {
    console.log('Selected course:', event);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'meetingId': data.row.branchID
    }
    this.router.navigate(['/tds/counsellor-dashboard/schedule-meeting-with-college/add-meeting'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }

  getMeetingDetails() {
    this.collegemeetingService.getCollegeMeetingList().subscribe((result: any) => {
      this.meetingDetailsList = result.Value;
    });
  }
}
