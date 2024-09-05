import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { CollegeseminarService } from './add-seminar/collegeseminar.service';
@Component({
  selector: 'app-schedule-seminar-with-college',
  templateUrl: './schedule-seminar-with-college.component.html',
  styleUrls: ['./schedule-seminar-with-college.component.scss']
})
export class ScheduleSeminarWithCollegeComponent implements OnInit {

  seminarDetailsList: any[] = [];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'View',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Seminar'
    },
  ];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'SeminarId',
      headerName: 'SR.NO',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
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
      field: 'SeminarDate',
      headerName: 'Seminar Date',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Seminar Date'

    },
    {
      field: 'SeminarTime',
      headerName: 'Seminar Time',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Seminar Time'

    },
    {
      field: 'SpockPerson',
      headerName: 'Spock Person',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Spock Person'

    },
    {
      field: 'SeminarLocation',
      headerName: 'Seminar Location',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,     
       headerTooltip:'Seminar Location'

    },
    {
      field: 'SeminarAgenda',
      headerName: 'Seminar Agenda',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Seminar Agenda'

    },
    {
      field: 'SeminarStatus',
      headerName: 'Seminar Agenda',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Seminar Agenda'

    },
    {
      field: 'addedBy',
      headerName: 'AddedBy',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'AddedBy'

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

    }
    
  ];

 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private collegeseminarService:CollegeseminarService
  ) { }

  ngOnInit(): void {
    this.getClassroomDetails();
  }

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'SeminarId': data.row.SeminarId
    }
    this.router.navigate(['tds/counsellor-dashboard/schedule-seminar-with-college/add-seminar'], { queryParams: data1 });
  }
  selectSeminar($event: any)
   {
    throw new Error('Method not implemented.');
  }

  ActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewSeminar',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
  onAddSeminar(seminar?: any) {

    let navigationExtras: NavigationExtras = {};
    if (seminar) {
      navigationExtras = {
        state: {
          seminarData: seminar
        }
      };
    }
    this.router.navigateByUrl('tds/counsellor-dashboard/schedule-seminar-with-college/add-seminar')
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  editSeminar(seminarData: any) {
    const seminarId = seminarData.seminarId;
    const index = this.seminarDetailsList.findIndex(seminar => seminar.seminarId === seminarId);

    if (index !== -1) {


      this.openEditForm(seminarData).then((editedseminarData: any) => {

        this.seminarDetailsList[index] = editedseminarData;
        console.log('Edited seminar:', editedseminarData);

      });
    }
  }
  openEditForm(seminarData: any): Promise<any> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const editedseminarData = { ...seminarData };

        editedseminarData.Status = 'Edited';
        resolve(editedseminarData);
      }, 1000);
    });
  }
  getClassroomDetails() {
    this.collegeseminarService.getCollegeSeminarList().subscribe((result: any) => {
      this.seminarDetailsList = result.Value;
      let seminarDetailsList = result.Value;
    })
  }

}
