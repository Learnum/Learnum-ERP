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

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'View',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit'
    },
  ];

  declaredTableColumns: TableColumn[] = [
    
    {
      field: 'MeetingId',
      headerName: 'SR.NO',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100,
      headerTooltip:'SR.NO'
    
    },
    {
      field: 'CollegeName',
      headerName: 'College Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'College Name'
    },
    {
      field: 'Meetingwith',
      headerName: 'Meeting With',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Meeting With'
    },
    {
      field: 'MeetingDate',
      headerName: 'Meeting Date',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Meeting Date'
    },
    {
      field: 'MeetingTime',
      headerName: 'Meeting Time',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Meeting Time'
    },
    {
      field: 'MeetingLocation',
      headerName: 'Meeting Location',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Meeting Location'
    },
    {
      field: 'addedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Added By'
    },
    {
      field: 'addedTime',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Added Time'
    },
    {
      field: 'updatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Updated By'
    },
    {
      field: 'updatedTime',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Updated Time'
    }, 
    
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

  

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'MeetingId': data.row.MeetingId
    }
    this.router.navigate(['erp/counsellor-dashboard/schedule-meeting-with-college/add-meeting'], { queryParams: data1 });
  }
  selectMetting($event: any)
   {
    throw new Error('Method not implemented.');
  }
  onAddMetting(metting?: any) {

    let navigationExtras: NavigationExtras = {};
    if (metting) {
      navigationExtras = {
        state: {
          mettingData: metting
        }
      };
    }
    this.router.navigateByUrl('erp/counsellor-dashboard/schedule-meeting-with-college/add-meeting')
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  editMetting(MeetingData: any) {
    const meetingId = MeetingData.meetingId;
    const index = this.meetingDetailsList.findIndex(metting => metting.meetingId === meetingId);

    if (index !== -1) {


      this.openEditForm(MeetingData).then((editedMeetingData: any) => {

        this.meetingDetailsList[index] = editedMeetingData;
        console.log('Edited metting:', editedMeetingData);

      });
    }
  }
  openEditForm(mettingData: any): Promise<any> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const editedmettingData = { ...mettingData };

        editedmettingData.Status = 'Edited';
        resolve(editedmettingData);
      }, 1000);
    });
  }

  getMeetingDetails() {
    this.collegemeetingService.getCollegeMeetingList().subscribe((result: any) => {
      this.meetingDetailsList = result.Value;
    });
  }
}
