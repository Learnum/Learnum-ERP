import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddaccountantService } from './add-accountant/addaccountant.service';

@Component({
  selector: 'app-accountant',
  templateUrl: './accountant.component.html',
  styleUrls: ['./accountant.component.scss']
})
export class AccountantComponent implements OnInit {

  accountantDetailsList: any[] = [];
  form: FormGroup;

  declaredTableColumns: TableColumn[] = [

    {
      field: 'BranchAccountantId',
      headerName: 'SR.NO',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200

    },
    
    {
      field: 'AccountantName',
      headerName: 'Accountant Name',
      filter: 'agSetColumnFilter',
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

  ngOnInit(): void {
    this.getBranchAccountantDetails();
    }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private addaccountantService:AddaccountantService
  ) {
    {
      this.form = this.formBuilder.group({
    
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
    this.router.navigate(['/tds/hrd/add-trainer'], { queryParams: data1 });
  }



  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewBranch',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
  onAddAccountant() {

    this.router.navigateByUrl('tds/hrd/accountant/add-accountant')
  }
   onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  
  getBranchAccountantDetails() {
    this.addaccountantService.getbranchaccountantList().subscribe((result: any) => {
      this.accountantDetailsList = result.Value;
      let accountantDetailsList = result.Value;
    })
  }
}
