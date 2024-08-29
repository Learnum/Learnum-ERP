import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddBranchService } from './add-branch/add-branch.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent {


  branchList: any[] = [];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewBranch',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary p-1', // Reduced padding
      colorClass: 'text-secondary h4',
      tooltip: 'Edit Branch',
    
    },
  ];

  declaredTableColumns: TableColumn[] = [

    {
      field: 'BranchId',
      headerName: 'SR.No',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100,
      tooltipValueGetter: (params) => `Branch ID: ${params.value}`,
      headerTooltip: 'Branch Number'
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
      field: 'Address',
      headerName: 'Address',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
        headerTooltip: 'Address'
    },
    {
      field: 'City',
      headerName: 'City',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100,
        headerTooltip: 'City'
    },
    {
      field: 'StateName',
      headerName: 'State',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100,
       headerTooltip: 'State'
    },
    {
      field: 'PostalCode',
      headerName: 'Postal Code',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100,
       headerTooltip: 'Postal Code'
    },
    {
      field: 'IsActive',
      headerName: 'Status',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      valueFormatter: params => {
        return params.value ? 'Active' : 'Inactive';
      }
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
      headerTooltip: 'Updated Time',
    }

  ];
   
  ngOnInit(): void {
    this.getAllBranchDetails();

  }
  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addBranchService: AddBranchService,) {

  }

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'BranchId': data.row.BranchId
    }
    this.router.navigate(['tds/masters/branches/add-branch'], { queryParams: data1 });
  }

  selectBranch($event: any) {
    throw new Error('Method not implemented.');
  }

   onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }

  onAddBranch(branch?: any) {

    let navigationExtras: NavigationExtras = {};
    if (branch) {
      navigationExtras = {
        state: {
          branchData: branch
        }
      };
    }
    this.router.navigateByUrl('tds/masters/branches/add-branch')
  }

  getAllBranchDetails() {
    this.addBranchService.getBranchList().subscribe((result: any) => {
      this.branchList = result.Value;
    })
  }
}
