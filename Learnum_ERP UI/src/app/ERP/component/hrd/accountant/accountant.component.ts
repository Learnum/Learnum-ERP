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

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'View Accountant',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Accountant'
    },
  ];
  
  declaredTableColumns: TableColumn[] = [
    {
      field: 'AccountantName',
      headerName: 'Accountant Name',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200,
      headerTooltip: 'Accountant Name',

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
  selectBranchAccountant($event: any) {
    throw new Error('Method not implemented.');
    }
  

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'BranchAccountantId': data.row.BranchAccountantId
    }
    this.router.navigate(['tds/hrd/accountant/add-accountant'], { queryParams: data1 });
  }

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
