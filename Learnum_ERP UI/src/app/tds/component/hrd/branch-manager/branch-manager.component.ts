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
      actionPage: 'ViewCall',
      actionIcon: 'uil uil-eye rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
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
      minWidth: 200
    },
    {
      field: 'BranchName',
      headerName: 'Branch Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200

    },
    {
      field: 'IsActive',
      headerName: 'Status',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200,
      valueFormatter: params => {
        return params.value ? 'Active' : 'Inactive';
      }
    },
    {
      field: 'addedBy',
      headerName: 'AddedBy',
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

  getEmployeeList: any;



  ngOnInit(): void {
    this.GetBranchManagerList();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addbranchManagerService: AddbranchManagerService,

    
    private formBuilder: FormBuilder) {
    {
     
    }
  }
  selectBranch(branch: any) {

  }

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'branchID': data.row.branchID
    }
    this.router.navigate(['/tds/masters/add-employee'], { queryParams: data1 });
  }



  onAddBranchManager() {

   
    this.router.navigateByUrl('tds/hrd/branch-manager/add-branch');
  }


  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }


  GetBranchManagerList() {
    this.addbranchManagerService.getBranchManagerList().subscribe(
      (result: any) => {
        this.BranchManagerList = result.Value;
        let BranchManagerList= result.Value;
      },

    );

  }

}
 