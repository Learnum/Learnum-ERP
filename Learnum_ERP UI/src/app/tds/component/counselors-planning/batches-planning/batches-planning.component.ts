import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
@Component({
  selector: 'app-batches-planning',
  templateUrl: './batches-planning.component.html',
  styleUrls: ['./batches-planning.component.scss']
})
export class BatchesPlanningComponent implements OnInit {

  batchList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'BatchName',
      headerName: 'Batch Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 120
    },
    {
      field: 'BranchName',
      headerName: 'Branch Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 120
    },
    {
      field: 'Classroom',
      headerName: 'Classroom',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 120
    },
    {
      field: 'CourseName',
      headerName: 'Course Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 120
    },
    {
      field: 'CourseFeesInstallment',
      headerName: 'Course Fees in Installment',
      filter: 'agNumberColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'OneTimeCourseFees',
      headerName: 'One Time Course Fees',
      filter: 'agNumberColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    }
  ];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewBatch',
      actionIcon: 'uil uil-eye rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
    {
      action: 'edit',
      actionPage: 'EditBatch',
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
    this.getBatchList();
  }

  getBatchList() {
    // Fetch batch list from service
  }

  AddBatch() {
    this.router.navigate(['tds/counselors-planning/add-batch']);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': data.action,
      'BatchId': data.row.BatchId // Assuming BatchId is the unique identifier for batches
    };
    this.router.navigate(['/tds/counselors-planning/add-batch'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' action button clicked.');
  }

  selectBatch(batches: any) {
    // Handle row selection logic
  }
}
