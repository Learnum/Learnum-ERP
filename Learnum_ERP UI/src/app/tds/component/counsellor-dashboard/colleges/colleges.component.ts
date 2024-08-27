import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.scss']
})
export class CollegesComponent implements OnInit {

  collegeList: any[] = [];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'View College',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit College'
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
  ) { }

  ngOnInit(): void {
    this.getCollegeList();
  }

  getCollegeList() {
    // this.collegesService.getCollegeList().subscribe(
    //   (result: any) => {
    //     this.collegeList = result.Value;
    //   },
    //   (error: any) => {
    //     console.error("Error occurred while fetching colleges:", error);
    //     this.alertService.ShowErrorMessage("An error occurred while fetching colleges. Please try again later.");
    //   }
    // );
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
}
