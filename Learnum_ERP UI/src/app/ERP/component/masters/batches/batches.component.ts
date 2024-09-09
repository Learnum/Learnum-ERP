import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { AddBranchService } from '../branches/add-branch/add-branch.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddBatchesService } from './add-batches/add-batches.service';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.scss']
})
export class BatchesComponent implements OnInit {
  BatchDetails: any[] = [];
  batchesDetailsReq:any[] = [];
  
  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewBatch',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Batch'
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
      field: 'AddedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Added By'
    },
    {
      field: 'AddedDate',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Added Time'
    },
    {
      field: 'UpdatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated By'
    },
    {
      field: 'UpdatedDate',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
       headerTooltip:  'Updated Time',
    }, 
    
  ];
  batchForm: FormGroup;
 
 


  ngOnInit(): void {
    this.getAllBatchDetails();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addBatchesService : AddBatchesService ,
    ) {
      
   
  }
  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'BatchId': data.row.BatchId
    }
    this.router.navigate(['erp/masters/batches/add-batches'], { queryParams: data1 });
  }
  selectBatch($event: any) 
  { 
    throw new Error('Method not implemented.'); 
  }
  
  
  onAddBatch(batch?: any) {

    let navigationExtras: NavigationExtras = {};
    if (batch) {
      navigationExtras = {
        state: {
          batchData: batch
        }
      };
    }
    this.router.navigateByUrl('erp/masters/batches/add-batches')
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  getAllBatchDetails() {
    this.addBatchesService.getBatchList().subscribe((result: any) => {
      this.batchesDetailsReq = result.Value;
      
    })
  }
  }
