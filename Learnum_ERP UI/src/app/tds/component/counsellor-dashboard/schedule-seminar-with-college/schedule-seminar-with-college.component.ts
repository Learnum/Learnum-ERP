import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  declaredTableColumns: TableColumn[] = [
    {
      field: 'SeminarId',
      headerName: 'SR.NO',
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
      field: 'SeminarDate',
      headerName: 'Seminar Date',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'SeminarTime',
      headerName: 'Seminar Time',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'SpockPerson',
      headerName: 'Spock Person',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'SeminarLocation',
      headerName: 'Seminar Location',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'SeminarAgenda',
      headerName: 'Seminar Agenda',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'SeminarStatus',
      headerName: 'Seminar Agenda',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'addedBy',
      headerName: 'AddedBy',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'addedTime',
      headerName: 'AddedTime',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'updatedBy',
      headerName: 'UpdatedBy',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'addedTime',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    }, {
      field: 'updatedDate',
      headerName: 'UpdatedDate',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
  ];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewSeminar',
      actionIcon: 'uil uil-eye rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
    {
      action: 'edit',
      actionPage: 'EditSeminar',
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
    private collegeseminarService:CollegeseminarService
  ) { }

  ngOnInit(): void {
    this.getClassroomDetails();
  }

  getSeminarList() {
    // this.seminarService.getSeminarList().subscribe(
    //   (result: any) => {
    //     this.seminarList = result.Value;
    //   },
    //   (error: any) => {
    //     console.error("Error occurred while fetching seminars:", error);
    //     this.alertService.ShowErrorMessage("An error occurred while fetching seminars. Please try again later.");
    //   }
    // );
  }

  onAddSeminar() {
    this.router.navigate(['tds/counsellor-dashboard/schedule-seminar-with-college/add-seminar']);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': data.action,
      'SeminarId': data.row.SeminarId
    };
    this.router.navigate(['/tds/counsellor-dashboard/schedule-seminar-with-college/add-seminar'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' action button clicked.');
  }

  selectSeminar(seminars: any) {
    // Handle row selection logic
  }
  getClassroomDetails() {
    this.collegeseminarService.getCollegeSeminarList().subscribe((result: any) => {
      this.seminarDetailsList = result.Value;
      let seminarDetailsList = result.Value;
    })
  }

}
