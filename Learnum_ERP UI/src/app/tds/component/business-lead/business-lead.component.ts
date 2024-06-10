import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { BusinessLeadService } from './business-lead.service';


@Component({
  selector: 'app-business-lead',
  templateUrl: './business-lead.component.html',
  styleUrls: ['./business-lead.component.scss']
})
export class BusinessLeadComponent {
  businessLeadList: any[] = [];

  
  declaredTableColumns: TableColumn[] = [
    {
      field: 'LeadId',
      headerName: 'ID',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 80
    },
    {
      field: 'name',
      headerName: 'Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    },
    {
      field: 'phone number',
      headerName: 'Phone Number',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    },
    {
      field: 'address',
      headerName: 'Address',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    },
    // {
    //   field: 'district',
    //   headerName: 'District',
    //   filter: 'agTextColumnFilter',
    //   filterParams: { buttons: ['reset', 'apply'] },
    //   minWidth: 100
    // },
    // {
    //   field: 'state',
    //   headerName: 'State',
    //   filter: 'agTextColumnFilter',
    //   filterParams: { buttons: ['reset', 'apply'] },
    //   minWidth: 100
    // },
    // {
    //   field: 'postal code',
    //   headerName: 'Postal Code',
    //   filter: 'agTextColumnFilter',
    //   filterParams: { buttons: ['reset', 'apply'] },
    //   minWidth: 100
    // },
    // {
    //   field: 'country',
    //   headerName: 'Country',
    //   filter: 'agTextColumnFilter',
    //   filterParams: { buttons: ['reset', 'apply'] },
    //   minWidth: 100
    // },
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
    private businessLeadService: BusinessLeadService,
  ) {


  }

  ngOnInit(): void {
    this.getBusinessLeadList();
  }

  getBusinessLeadList() {
    // this.businessLeadService.getBusinessLeadList().subscribe(
    //   (result: any) => {
    //     this.businessLeadList = result.Value;
    //   },
    //   (error: any) => {
    //     console.error("Error occurred while fetching business leads:", error);
    //     this.alertService.ShowErrorMessage("An error occurred while fetching business leads. Please try again later.");
    //   }
    // );
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
}
