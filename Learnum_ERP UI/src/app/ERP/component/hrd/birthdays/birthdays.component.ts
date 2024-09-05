import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { BirthdayDetailsService } from './add-birthday/birthday-details.service';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.scss']
})
export class BirthdaysComponent implements OnInit {

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'View Birthday',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip: 'Edit Birthday'
    },
  ];

  form: FormGroup;
  BirthdayList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'Name',
      headerName: 'Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'Name',
    },
    {
      field: 'Email',
      headerName: 'Email',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'Email',

    },
    {
      field: 'Date',
      headerName: 'Date',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'Date',
    },

    {
      field: 'Role',
      headerName: 'Role',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100,
      headerTooltip: 'Role',

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
    this.GetbirthdayList();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private birthdayDetailsService: BirthdayDetailsService,


    private formBuilder: FormBuilder) {
    {
      this.form = this.formBuilder.group({

      });
    }
  }
  selectBranch(branch: any) { }


  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'BirthId': data.row.BirthId
    }
    this.router.navigate(['tds/hrd/birthdays/add-birthday'], { queryParams: data1 });
  }

  onAddBirthday() {
    this.router.navigateByUrl('tds/hrd/birthdays/add-birthday')
  }

  selectBirthday($event: any) {
    throw new Error('Method not implemented.');
  }

  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }


  GetbirthdayList() {
    this.birthdayDetailsService.getBirthdayList().subscribe(
      (result: any) => {
        this.BirthdayList = result.Value;
      },);
}
}
