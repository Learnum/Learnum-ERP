import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddcounsellorService } from './add-counsellor/addcounsellor.service';

@Component({
  selector: 'app-counsellor',
  templateUrl: './counsellor.component.html',
  styleUrls: ['./counsellor.component.scss']
})
export class CounsellorComponent implements OnInit {


  CounsellorList: any[] = [];
  form: FormGroup;

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewCounsellor',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Counsellor'
    },
  ];


  declaredTableColumns: TableColumn[] = [
    {
      field: 'CounsellorName',
      headerName: 'Counsellor Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200,
      headerTooltip: 'Counsellor Name',

    },
    {
      field: 'BranchName',
      headerName: 'Branch Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
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
    this.GetcounsellorList();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private addcounsellorService: AddcounsellorService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) {
    {
      this.form = this.formBuilder.group({ });
    }
  }
  selectBranch(branch: any) {

  }
  
  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'CounsellorId': data.row.CounsellorId
    }
    this.router.navigate(['tds/hrd/counsellor/add-counsellor'], { queryParams: data1 });
  }


  selectCounsellor($event: any) {
    throw new Error('Method not implemented.');
    }
  
  onAddcounsellor() {
    this.router.navigateByUrl('tds/hrd/counsellor/add-counsellor')
  }

  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  
  GetcounsellorList() {
    this.addcounsellorService.getcounsellorList().subscribe(
      (result: any) => {
        this.CounsellorList = result.Value;
        let CounsellorList = result.Value;
      },);
    }
  }


