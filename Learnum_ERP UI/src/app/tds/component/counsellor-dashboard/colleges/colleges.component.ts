import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
      actionPage: 'ViewTrainer',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Trainer'
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
      minWidth: 150
    },
    {
      field: 'CollegeAddress',
      headerName: 'College Address',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 200
    },
    {
      field: 'CollegeWebsite',
      headerName: 'College Website',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    // {
    //   field: 'ContactDetails',
    //   headerName: 'Contact Details',
    //   filter: 'agTextColumnFilter',
    //   filterParams: { buttons: ['reset', 'apply'] },
    //   minWidth: 150
    // },
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


  onAddBusinessLead() {
    this.router.navigate(['tds/counsellor-dashboard/colleges/add-collegs']);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': data.action,
      'CollegeId': data.row.CollegeId
    };
    this.router.navigate(['/tds/counsellor-dashboard/colleges/edit-college'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' action button clicked.');
  }

  selectCollege(colleges: any) {
    // Handle row selection logic
  }

  getAllBusinessDetails() {
    this.addcollegesService.AddCollegesList().subscribe((result: any) => {
      this.collegeList = result.Value;
      let collegeList = result.Value;
    })
  }
}
