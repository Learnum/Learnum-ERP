import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  form: FormGroup;

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
    private addBatchesService : AddBatchesService ,
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
    this.addBatchesService.getBatchList().subscribe((result: any) => {
      this.BatchDetails = result.Value;
      let BatchDetails = result.Value;
    })
  }

}
