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

  declaredTableColumns: TableColumn[] = [
    {
      field: 'BatchId',
      headerName: 'BatchID',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
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
      field: 'Classroom',
      headerName: 'Classroom',
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
      field: 'modifiedBy',
      headerName: 'Modified By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
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
      actionPage: 'ViewCall',
      actionIcon: 'uil uil-eye rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
    {
      action: 'edit',
      actionPage: 'EditCall',
      actionIcon: 'uil uil-edit rounded text-primary mb-0',
      buttonClass: 'btn btn-sm btn-primary',
      colorClass: 'text-primary h4'
    }
  ];
  getEmployeeList: any;



  ngOnInit(): void {
    this.getAllBatchDetails();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addbatchservices : AddbatchService ,
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
    this.router.navigate(['/tds/masters/add-branch'], { queryParams: data1 });
  }



  ActionColumn: any[] = [
    {
      action: 'view',
      actionPage: 'ViewBranch',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
  
  onAddBatch(branch?: any) {
    // let navigationExtras: NavigationExtras = {};
    // if (branch) {
    //   navigationExtras = {
    //     state: {
    //       branchData: branch
    //     }
    //   };
    // }
    this.router.navigate(['tds/masters/batches/add-batches']);
  }

  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }


  getAllBatchDetails() {
    this.addbatchservices.getBatchList().subscribe((result: any) => {
      this.BatchDetails = result.Value;
      let BatchDetails = result.Value;
    })
  }
}
