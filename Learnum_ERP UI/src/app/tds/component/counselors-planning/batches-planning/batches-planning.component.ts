import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn, ActionColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddbatchService } from './add-batch/addbatch.service';
@Component({
  selector: 'app-batches-planning',
  templateUrl: './batches-planning.component.html',
  styleUrls: ['./batches-planning.component.scss']
})
export class BatchesPlanningComponent implements OnInit {

  BatchDetails: any[] = [];
  form: FormGroup;
  batchesDetailsReq: any[] = [];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewBatch',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip: 'Edit Batch'
    },
  ];

  declaredTableColumns: TableColumn[] = [

    {
      field: 'BatchName',
      headerName: 'Batch Name',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'Batch Name'
    },
    {
      field: 'BranchName',
      headerName: 'Branch Name',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'Branch Name'

    },

    {
      field: 'ClassroomName',
      headerName: 'Classroom Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'Classroom Name'
    },
    {
      field: 'OneTimeCourseFees',
      headerName: 'One Time Course Fees',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'One Time Course Fees'
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

  ngOnInit(): void {
    this.getAllBatchDetails();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addbatchService: AddbatchService,
    private formBuilder: FormBuilder) {
    {
      this.form = this.formBuilder.group({});
    }
  }
  selectBranch(branch: any) { }


  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'BatchId': data.row.BatchId
    }
    this.router.navigate(['tds/counselors-planning/add-batch'], { queryParams: data1 });
  }

  onAddBatch(batch?: any) {

    this.router.navigate(['tds/counselors-planning/add-batch']);
  }

  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }


  getAllBatchDetails() {
    this.addbatchService.getBatchList().subscribe((result: any) => {
      this.batchesDetailsReq = result.Value;

    })
  }


}
