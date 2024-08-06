import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddFeesService } from './add-fees/add-fees.service';

@Component({
  selector: 'app-offline-fees-payment',
  templateUrl: './offline-fees-payment.component.html',
  styleUrls: ['./offline-fees-payment.component.scss']
})
export class OfflineFeesPaymentComponent implements OnInit {

  offlineFeesList: any[] = [];

  declaredTableColumns: TableColumn[] = [
   
    {
      field: 'StudentName',
      headerName: 'Student Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'DateOfPayment',
      headerName: 'Payment Date',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'PhoneNumber',
      headerName: 'phone Number',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'Amountpaid',
      headerName: 'Amount Paid',
      filter: 'agSetColumnFilter',
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
      actionPage: 'ViewPayment',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];


  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addfeesService: AddFeesService,

  ) { }

  ngOnInit(): void {
    this.getOfflineFeesList();
  }


getOfflineFeesList() {
  this.addfeesService.getfeesList().subscribe((result: any) => {
    this.offlineFeesList= result.Value;
    let offlineFeesList = result.Value;
  })
}
editFees(FeesData: any) {
  const offlineFeesPaymentId = FeesData.offlineFeesPaymentId;
  const index = this.offlineFeesList.findIndex(fees => fees.offlineFeesPaymentId === offlineFeesPaymentId);
  if (index !== -1) {
  this.openEditForm(FeesData).then((editedFeesData: any) => {
  this.offlineFeesList[index] = editedFeesData;
  console.log('Edited Fees Data:', editedFeesData);
 });
  }
}
openEditForm(FeesData: any): Promise<any> {

  return new Promise((resolve, reject) => {

    setTimeout(() => {
      const editedFeesData = { ...FeesData };

      editedFeesData.Status = 'Edited';
      resolve(editedFeesData);
    }, 1000);
  });
}

AddOfflineFeesPayment(fees?: any) {

  let navigationExtras: NavigationExtras = {};
  if (fees) {
    navigationExtras = {
      state: {
        FeesData: fees
      }
    };
  }
  this.router.navigateByUrl('tds/student-management/add-fees')
}
 
onRowAction(data: any) {
  let data1 = {
    'source': 'edit',
    'offlineFeesPaymentId': data.row.offlineFeesPaymentId
  }
  this.router.navigate(['tds/student-management/add-fees'], { queryParams: data1 });
}

onActionButton(action: string) {
  alert(action + ' ' + 'action button clicked.');
}

selectOfflineFees($event: any) 
{ 
  throw new Error('Method not implemented.'); 
}
}