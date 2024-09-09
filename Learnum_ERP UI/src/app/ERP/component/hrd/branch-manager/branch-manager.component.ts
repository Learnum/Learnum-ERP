import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddbranchManagerService } from './add-branchManager/addbranch.service';

@Component({
  selector: 'app-branch-manager',
  templateUrl: './branch-manager.component.html',
  styleUrls: ['./branch-manager.component.scss']
})
export class BranchManagerComponent implements OnInit {

  BranchManagerList: any[] = [];
  form: FormGroup;

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'View Branch Manager',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Branch Manager'
    },
  ]; 

  declaredTableColumns: TableColumn[] = [
    {
      field: 'BranchManagerName',
      headerName: 'Branch Manager Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200,
      headerTooltip: 'Branch Manager Name',
    },
    {
      field: 'BranchName',
      headerName: 'Branch Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200,
      headerTooltip: 'Branch Name',
    },
    {
      field: 'IsActive',
      headerName: 'Status',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200,
      headerTooltip: 'Status',
      valueFormatter: params => {
        return params.value ? 'Active' : 'Inactive';
      }
    },
    {
      field: 'addedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Added By',
    },
    {
      field: 'addedTime',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Added Time',
    },
    {
      field: 'updatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated By',
    },
    {
      field: 'updatedTime',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated Time',
    }, 
    
  ];

  ngOnInit(): void {
    this.GetBranchManagerList();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addbranchManagerService: AddbranchManagerService,
    private formBuilder: FormBuilder) {
    {}}

  selectBranchManager(branch: any) { 
    this.selectBranchManager = branch;
    console.log('Selected branch rows:', this.selectBranchManager);
   }

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'BranchManagerId': data.row.BranchManagerId
    }
    this.router.navigate(['erp/hrd/branch-manager/add-branch'], { queryParams: data1 });
  }
   onAddBranchManager() {
    this.router.navigateByUrl('erp/hrd/branch-manager/add-branch');
   }

   onRowClicked(data: any)
   {
    let data1 = {
      'source': 'edit',
      'BranchManagerId': data.row.BranchManagerId
    }
    this.router.navigate(['erp/hrd/branch-manager/add-branch'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }

  GetBranchManagerList() {
    this.addbranchManagerService.getBranchManagerList().subscribe(
      (result: any) => {
        this.BranchManagerList = result.Value;
      },
    );
  }
}
 