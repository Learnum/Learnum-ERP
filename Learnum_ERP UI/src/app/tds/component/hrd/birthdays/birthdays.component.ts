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
      actionPage: 'ViewTrainer',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Trainer'
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
      minWidth: 150
    },
    {
      field: 'Email',
      headerName: 'Email',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'date',
      headerName: 'date',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },

    {
      field: 'IsActive',
      headerName: 'Status',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200,
      valueFormatter: params => {
        return params.value ? 'Active' : 'Inactive';
      }
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
      field: 'updatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'updatedTime',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
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
  selectBranch(branch: any) {

  }
  

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'BirthId': data.row.BirthId
    }
    this.router.navigate(['tds/hrd/birthdays/add-birthday'], { queryParams: data1 });
  }



  
  onAddBirthday() {

    // let navigationExtras: NavigationExtras = {};
    // if (employee) {
    //   navigationExtras = {
    //     state: {
    //       employeeData: employee
    //     }
    //   };
    // }
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
        let BirthdayList = result.Value;
      },

    );

  }

  editBirthday(BirthdayData: any) {
    const BirthId = BirthdayData.BirthId;
    const index = this.BirthdayList.findIndex(Birthday => Birthday.BirthId === BirthId);

    if (index !== -1) {
      this.openEditForm(BirthdayData).then((editedBirthdayData: any) => {
        this.BirthdayList[index] = editedBirthdayData;
        console.log('Edited Birthday:', editedBirthdayData);
      });
    }
  }

  openEditForm(BirthdayData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const editedBirthdayData = { ...BirthdayData };
        editedBirthdayData.Status = 'Edited';
        resolve(editedBirthdayData);
      }, 1000);
    });
  }



}
