import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { StudentcounsellingService } from './counselling-student/studentcounselling.service';
@Component({
  selector: 'app-counselling-with-student',
  templateUrl: './counselling-with-student.component.html',
  styleUrls: ['./counselling-with-student.component.scss']
})
export class CounsellingWithStudentComponent implements OnInit {

  StudentCounsellingList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'CounsellingId',
      headerName: 'SR.NO',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'StudentName',
      headerName: 'Student Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'Phone',
      headerName: 'Phone',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'CounsellingConversation',
      headerName: 'Counselling Conversation',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'CounsellingTime',
      headerName: 'Counselling Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'CounsellingStatus',
      headerName: 'Counselling Status',
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
    }, 
    {
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
      actionPage: 'ViewCounselling',
      actionIcon: 'uil uil-eye rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
    {
      action: 'edit',
      actionPage: 'EditCounselling',
      actionIcon: 'uil uil-edit rounded text-primary mb-0',
      buttonClass: 'btn btn-sm btn-primary',
      colorClass: 'text-primary h4'
    }
  ];

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private studentcounsellingService:StudentcounsellingService
  ) { }

  ngOnInit(): void {
    this.getStudentCounsellingDetails();
  }
  onAddCounselling() {
    this.router.navigate(['tds/counsellor-dashboard/counselling-with-student/counselling-student']);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': data.action,
      'CounsellingId': data.row.CounsellingId
    };
    this.router.navigate(['/tds/counsellor-dashboard/counselling-with-student/add-counselling'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' action button clicked.');
  }

  selectCounselling(counsellings: any) {
    // Handle row selection logic
  }
  getStudentCounsellingDetails() {
    this.studentcounsellingService.getStudentCounsellingDetails().subscribe((result: any) => {
      this.StudentCounsellingList = result.Value;
      let StudentCounsellingList = result.Value;
    })
  }

}
