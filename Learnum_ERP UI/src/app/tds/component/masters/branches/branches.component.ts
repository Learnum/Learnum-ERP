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

  declaredTableColumns: TableColumn[] = [
    {
      field: 'BranchId',
      headerName: 'SR.No',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'BranchName',
      headerName: 'Branch Name',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    {
      field: 'Address',
      headerName: 'Address',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    {
      field: 'City',
      headerName: 'City',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    {
      field: 'State',
      headerName: 'State',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    {
      field: 'PostalCode',
      headerName: 'PostalCode',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    {
      field: 'IsActive',
      headerName: 'IsActive',
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
    }, {
      field: 'updatedDate',
      headerName: 'UpdatedDate',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
  ];
  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewBranch',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
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
  selectBranch($event: any) 
  { throw new Error('Method not implemented.'); 

  }

  ActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewEmployee',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
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

  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }

  getAllBranchDetails() {
    this.addBranchService.getBranchList().subscribe((result: any) => {
      this.branchList = result.Value;
      let branchList = result.Value;
    })
  }
  editBranch(BranchData: any) {
    const branchId = BranchData.branchId;
    const index = this.branchList.findIndex(branch => branch.branchId === branchId);

    if (index !== -1) {


      this.openEditForm(BranchData).then((editedBranchData: any) => {

        this.branchList[index] = editedBranchData;
        console.log('Edited Branch:', editedBranchData);

      });
    }
  }
  openEditForm(branchData: any): Promise<any> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const editedBranchData = { ...branchData };

        editedBranchData.Status = 'Edited';
        resolve(editedBranchData);
      }, 1000);
    });
  }

}
