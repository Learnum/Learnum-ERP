import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'View Business Lead',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Business Lead'
    },
  ];
  
  declaredTableColumns: TableColumn[] = [
    {
      field: 'BusinessId',
      headerName: 'SR.NO',
      filter: 'agTextColumnFilter',
      filterParams: {buttons: ['reset', 'apply'],},
      minWidth: 100,
       headerTooltip:'SR.NO'
    },
    {
      field: 'Name',
      headerName: 'Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
       headerTooltip:'Name'
    },
    {
      field: 'PhoneNumber',
      headerName: 'Phone Number',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Phone Number'
    },
    {
      field: 'AddressLine1',
      headerName: 'Address',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Address'
    },
   
    {
      field: 'AddedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Added By',
    },
    {
      field: 'AddedDate',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Added Time',
    },
    {
      field: 'UpdatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated By',
    },
    {
      field: 'UpdatedDate',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated Time',
    },  
    
  ];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addBusinessLeadService: AddBusinessLeadService,
  ) { }

  ngOnInit(): void {
    this.getAllBusinessDetails();
  }
  onAddBusinessLead(business?: any) {

    let navigationExtras: NavigationExtras = {};
    if (business) {
      navigationExtras = {
        state: {
          businessData: business
        }
      };
    }
    this.router.navigateByUrl('erp/business-lead/add-business-lead')
  }

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'BusinessId': data.row.BusinessId
    }
    this.router.navigate(['erp/business-lead/add-business-lead'], { queryParams: data1 });
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  selectBusiness($event: any) 
  { 
    throw new Error('Method not implemented.'); 
  }
  ActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewBusiness',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];

  getAllBusinessDetails() {
    this.addBusinessLeadService.getBusinessList().subscribe((result: any) => {
      this.businessLeadList = result.Value;
      let businessLeadList = result.Value;
    })
  }
  editBusiness(BusinessData: any) {
    const businessId = BusinessData.businessId;
    const index = this.businessLeadList.findIndex(business => business.businessId === businessId);

    if (index !== -1) {


      this.openEditForm(BusinessData).then((editedBusinessData: any) => {

        this.businessLeadList[index] = editedBusinessData;
        console.log('Edited business:', editedBusinessData);

      });
    }
  }
  openEditForm(businessData: any): Promise<any> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const editedBusinessData = { ...businessData };

        editedBusinessData.Status = 'Edited';
        resolve(editedBusinessData);
      }, 1000);
    });
  }

}
