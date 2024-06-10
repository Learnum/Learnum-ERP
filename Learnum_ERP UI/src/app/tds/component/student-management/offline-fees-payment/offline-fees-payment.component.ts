import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
@Component({
  selector: 'app-offline-fees-payment',
  templateUrl: './offline-fees-payment.component.html',
  styleUrls: ['./offline-fees-payment.component.scss']
})
export class OfflineFeesPaymentComponent implements OnInit {

  offlineFeesList: any[] = [];

  offlineFeesTableColumns: TableColumn[] = [
    {
      field: 'studentId',
      headerName: 'Student ID',
      minWidth: 150
    },
    {
      field: 'studentName',
      headerName: 'Student Name',
      minWidth: 150
    },
    {
      field: 'dateOfPayment',
      headerName: 'Date of Payment',
      minWidth: 150
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      minWidth: 150
    },
    {
      field: 'amountPaid',
      headerName: 'Amount Paid',
      minWidth: 150
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150
    }
  ];

  offlineFeesActionColumns: ActionColumn[] = [
    // Define action columns if needed
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getOfflineFeesList();
  }

  getOfflineFeesList() {
    // Implement fetching offline fees list from backend
  }

  AddOfflineFeesPayment() {
    this.router.navigate(['tds/student-management/add-fees']);
  }

  onRowAction(data: any) {
    // Handle row action logic
  }

  onActionButton(action: string) {
    // Handle action button logic
  }

  selectOfflineFees(offlineFees: any) {
    // Handle row selection logic
  }
}