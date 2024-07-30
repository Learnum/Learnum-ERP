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
selectCounsellor($event: any) {
throw new Error('Method not implemented.');
}

  CounsellorList: any[] = [];
  form: FormGroup;

  declaredTableColumns: TableColumn[] = [
    {
      field: 'CounsellorName',
      headerName: 'Counsellor Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200

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
    },
    {
      field: 'updatedDate',
      headerName: 'UpdatedDate',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
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
      'CounsellorId': data.row.CounsellorId
    }
    this.router.navigate(['tds/hrd/counsellor/add-counsellor'], { queryParams: data1 });
  }



  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewContentWriter',
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
  
  GetcounsellorList() {
    this.addcounsellorService.getcounsellorList().subscribe(
      (result: any) => {
        this.CounsellorList = result.Value;
        let CounsellorList = result.Value;
      },);
    }

    editCounsellor(CounsellorData: any) {
      const CounsellorId = CounsellorData.CounsellorId;
      const index = this.CounsellorList.findIndex(Counsellor => Counsellor.CounsellorId === CounsellorId);
  
      if (index !== -1) {
        this.openEditForm(CounsellorData).then((editedCounsellorData: any) => {
          this.CounsellorList[index] = editedCounsellorData;
          console.log('Edited Counsellor:', editedCounsellorData);
        });
      }
    }
  
    openEditForm(CounsellorData: any): Promise<any> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const editedCounsellorData = { ...CounsellorData };
          editedCounsellorData.Status = 'Edited';
          resolve(editedCounsellorData);
        }, 1000);
      });
    }
  }


