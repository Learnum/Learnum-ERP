import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
@Component({
  selector: 'app-counselling-with-student',
  templateUrl: './counselling-with-student.component.html',
  styleUrls: ['./counselling-with-student.component.scss']
})
export class CounsellingWithStudentComponent implements OnInit {

  counsellingList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'studentName',
      headerName: 'Student Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'phone',
      headerName: 'Phone',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'counsellingConversation',
      headerName: 'Counselling Conversation',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'counsellingTime',
      headerName: 'Counselling Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'counsellingStatus',
      headerName: 'Counselling Status',
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
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getCounsellingList();
  }

  getCounsellingList() {
    // this.counsellingService.getCounsellingList().subscribe(
    //   (result: any) => {
    //     this.counsellingList = result.Value;
    //   },
    //   (error: any) => {
    //     console.error("Error occurred while fetching counselling sessions:", error);
    //     this.alertService.ShowErrorMessage("An error occurred while fetching counselling sessions. Please try again later.");
    //   }
    // );
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

}
