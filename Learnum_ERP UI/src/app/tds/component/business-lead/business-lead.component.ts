import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddBusinessLeadService } from './add-business-lead/add-business-lead.service';


@Component({
  selector: 'app-business-lead',
  templateUrl: './business-lead.component.html',
  styleUrls: ['./business-lead.component.scss']
})
export class BusinessLeadComponent {
  businessLeadList: any[] = [];

  
  declaredTableColumns: TableColumn[] = [
    {
      field: 'BusinessId',
      headerName: 'ID',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 80
    },
    {
      field: 'Name',
      headerName: 'Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    },
    {
      field: 'PhoneNumber',
      headerName: 'Phone Number',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    },
    {
      field: 'Address',
      headerName: 'Address',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
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
    },{
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
      actionPage: 'ViewBusinessLead',
      actionIcon: 'uil uil-eye rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
    {
      action: 'edit',
      actionPage: 'EditBusinessLead',
      actionIcon: 'uil uil-edit rounded text-primary mb-0',
      buttonClass: 'btn btn-sm btn-primary',
      colorClass: 'text-primary h4'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addBusinessLeadService: AddBusinessLeadService,
  ) {


  }

  ngOnInit(): void {
    this.getAllBusinessDetails();
  }

  onAddBusinessLead() {
    this.router.navigate(['tds/business-lead/add-business-lead']);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': data.action,
      'LeadId': data.row.LeadId
    };
    this.router.navigate(['/tds/business-lead/add-business-lead'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' action button clicked.');
  }

  selectBusinessLead(leads: any) {
    // Handle row selection logic
  }

  getAllBusinessDetails() {
    this.addBusinessLeadService.getBusinessList().subscribe((result: any) => {
      this.businessLeadList = result.Value;
      let businessLeadList = result.Value;
    })
  }
}
