import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { ActionColumn } from "src/app/shared/data-grid/model/data-grid-column.model";
import { ChallanserviceService } from './challanservice.service';
@Component({
  selector: 'challan',
  templateUrl: './challan.component.html',
  styleUrls: ['./challan.component.scss'],
})
export class ChallanComponent implements OnInit {
  constructor(
    private router: Router,
    private ChallanserviceService: ChallanserviceService
  ) { }
  ngOnInit() {
    this.getAllChallanDetails();
  }

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewEmployee',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];

  tdsReturnList = [];
  declaredTableColumns: TableColumn[] = [
    {
      field: 'ChallanId',
      headerName: 'SR NO',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100
    },
    {
      field: 'BSRCode',
      headerName: 'BSR Code',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
    },
    {
      field: 'DateOfTaxDeposite',
      headerName: 'Date',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100
    },
    {
      field: 'ChallanNo',
      headerName: 'Serial Number',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    {
      field: 'SectionCode',
      headerName: 'Section Code',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    {
      field: 'TDSAmount',
      headerName: 'TDS',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    {
      field: 'Surcharge',
      headerName: 'Surcharge',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    {
      field: 'EducationCess',
      headerName: 'Ed. Cess',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    {
      field: 'InterestAmount',
      headerName: 'Interest',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    {
      field: 'FeeAmount',
      headerName: 'Fees',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    {
      field: 'OtherPenaltyAmount',
      headerName: 'Other',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 120
    },
    {
      field: 'TotalAmount',
      headerName: 'Total',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 120
    },
    {
      field: 'BalanceAmount',
      headerName: 'Balance',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 120
    },
    {
      field: 'ChallanStatus',
      headerName: 'Status',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 120

    }
  ];
  selectEmployee(employees: any) {
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'ChallanId': data.row.ChallanId
    }
    this.router.navigate(['/tds/tds-return/add-challan'], { queryParams: data1 });
  }
  onAddChallanClick() {
    this.router.navigateByUrl('tds/tds-return/add-challan')
  }
  onPullChallanClick() {
    this.router.navigateByUrl('tds/tds-return/pull-challan')
  }
  onUploadExelClick() {
    let data = {
      source: 'challan'
    };
    const navigationExtras: NavigationExtras = {
      queryParams: {
        yourDataKey: JSON.stringify(data)
      }
    };
    this.router.navigate(['tds/tds-return/upload-exel'], navigationExtras);
    //this.router.navigateByUrl('tds/tds-return/upload-exel')
  }
  getAllChallanDetails() {
    this.ChallanserviceService.getAllChallanDetails().subscribe((result: any) => {
      this.tdsReturnList = result.Value;
      let tdsReturnList = result.Value;
      
    })
  }
}
