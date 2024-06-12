import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';

@Component({
  selector: 'app-counsellor',
  templateUrl: './counsellor.component.html',
  styleUrls: ['./counsellor.component.scss']
})
export class CounsellorComponent implements OnInit {

  tdsReturnList: any[] = [];
  form: FormGroup;

  declaredTableColumns: TableColumn[] = [


    {
      field: 'CounsellorName',
      headerName: 'Counsellor Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'BranchName',
      headerName: 'Branch Name',
      filter: 'agTextColumnFilter',
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

  getEmployeeList: any;



  ngOnInit(): void {
    //this.GetbranchList();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) {
    {
      this.form = this.formBuilder.group({
       
    
        // Add more form controls as needed
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
  onAddcounsellor() {

    // let navigationExtras: NavigationExtras = {};
    // if (employee) {
    //   navigationExtras = {
    //     state: {
    //       employeeData: employee
    //     }
    //   };
    // }
    this.router.navigateByUrl('tds/hrd/counsellor/add-counsellor')
  }

  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }

}


