import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddbatchService } from './add-batch/addbatch.service';
@Component({
  selector: 'app-batches-planning',
  templateUrl: './batches-planning.component.html',
  styleUrls: ['./batches-planning.component.scss']
})
export class BatchesPlanningComponent implements OnInit {

  BatchDetails: any[] = [];
  form: FormGroup;

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewTrainer',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Trainer'
    },
  ];

  declaredTableColumns: TableColumn[] = [
   
    {
      field: 'BatchName',
      headerName: 'BatchName',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'BranchName',
      headerName: 'BranchName',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    
    {
      field: 'ClassroomName',
      headerName: 'ClassroomName',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    {
      field: 'OneTimeCourseFees',
      headerName: 'OneTimeCourseFees',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
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
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'updatedTime',
      headerName: 'updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    }, 
    
  ];
  
 


  ngOnInit(): void {
    this.getAllBatchDetails();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addbatchService:AddbatchService,
    private formBuilder: FormBuilder) {
    {
      this.form = this.formBuilder.group({
      // Add more form controls as needed
      });
    }
  }
  selectBranch(branch: any) {

  }
  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'branchID': data.row.branchID
    }
    this.router.navigate(['tds/counselors-planning/add-batch'], { queryParams: data1 });
  }



  
  
  onAddBatch(branch?: any) {
    // let navigationExtras: NavigationExtras = {};
    // if (branch) {
    //   navigationExtras = {
    //     state: {
    //       branchData: branch
    //     }
    //   };
    // }
    this.router.navigate(['tds/counselors-planning/add-batch']);
  }

  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }


  getAllBatchDetails() {
    this.addbatchService.getBatchList().subscribe((result: any) => {
      this.BatchDetails = result.Value;
      let BatchDetails = result.Value;
    })
  }

  editBatch(BatchData: any) {
    const batchId = BatchData.batchId;
    const index = this.BatchDetails.findIndex(batch => batch.batchId === batchId);

    if (index !== -1) {


      this.openEditForm(BatchData).then((editedBatchData: any) => {

        this.BatchDetails[index] = editedBatchData;
        console.log('Edited Branch:', editedBatchData);

      });
    }
  }
  openEditForm(batchData: any): Promise<any> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const editedBatchData = { ...batchData };

        editedBatchData.Status = 'Edited';
        resolve(editedBatchData);
      }, 1000);
    });
  }
}
