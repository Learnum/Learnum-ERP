import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddcollegesService } from './add-collegs/addcolleges.service';

@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.scss']
})
export class CollegesComponent implements OnInit {

  collegeList:any[] = [];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewCollege',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip: 'Edit Branch'
    },
  ];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'CollegeName',
      headerName: 'College Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip:'College Name'
    },
    {
      field: 'CollegeAddress',
      headerName: 'College Address',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 200,
       headerTooltip:'College Address'
    },
    {
      field: 'CollegeWebsite',
      headerName: 'College Website',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
       headerTooltip:'College Website'
    },
  
    {
      field: 'ContactDetails',
      headerName: 'Contact Details',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
       headerTooltip:'Contact Details'
    },
    {
      field: 'addedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
       headerTooltip:'Added By'
    },
    {
      field: 'addedTime',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Added Time'
    },
    {
      field: 'updatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
       headerTooltip:'Updated By'
    },
    {
      field: 'updatedTime',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
       headerTooltip:'Updated Time'
    }, 
    
  ];

  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addcollegesService: AddcollegesService,
  ) { }

  ngOnInit(): void {
   this.getAllBusinessDetails();
  }

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'CollegeId': data.row.CollegeId
    }
    this.router.navigate(['erp/counsellor-dashboard/colleges/add-collegs'], { queryParams: data1 });
  }
  selectCollege($event: any)
   {
    throw new Error('Method not implemented.');
  }

  ActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewCollege',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
  onAddCollege(college?: any) {

    let navigationExtras: NavigationExtras = {};
    if (college) {
      navigationExtras = {
        state: {
          collegeData: college
        }
      };
    }
    this.router.navigateByUrl('erp/counsellor-dashboard/colleges/add-collegs')
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }

  getAllBusinessDetails() {
    this.addcollegesService.AddCollegesList().subscribe((result: any) => {
      this.collegeList = result.Value;
      let collegeList = result.Value;
    })
  }

  editAddCollege(CollegeData: any) {
    const collegeId = CollegeData.collegeId;
    const index = this.collegeList.findIndex(college => college.collegeId === collegeId);

    if (index !== -1) {


      this.openEditForm(CollegeData).then((editedCollegeData: any) => {

        this.collegeList[index] = editedCollegeData;
        console.log('Edited college:', editedCollegeData);

      });
    }
  }
  openEditForm(collegeData: any): Promise<any> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const editedCollegeData = { ...collegeData };

        editedCollegeData.Status = 'Edited';
        resolve(editedCollegeData);
      }, 1000);
    });
  }
}
