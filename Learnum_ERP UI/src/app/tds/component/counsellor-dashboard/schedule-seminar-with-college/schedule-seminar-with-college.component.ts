import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
@Component({
  selector: 'app-schedule-seminar-with-college',
  templateUrl: './schedule-seminar-with-college.component.html',
  styleUrls: ['./schedule-seminar-with-college.component.scss']
})
export class ScheduleSeminarWithCollegeComponent implements OnInit {

  seminarList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'collegeName',
      headerName: 'College Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'seminarDate',
      headerName: 'Seminar Date',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'seminarTime',
      headerName: 'Seminar Time',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'spockPerson',
      headerName: 'Spock Person',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'seminarLocation',
      headerName: 'Seminar Location',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'seminarAgenda',
      headerName: 'Seminar Agenda',
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
  ) { }

  ngOnInit(): void {
    this.getSeminarList();
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

}
