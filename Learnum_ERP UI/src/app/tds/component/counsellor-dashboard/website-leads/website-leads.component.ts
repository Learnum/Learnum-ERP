import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { WebsiteleadsService } from './add-website/websiteleads.service';
@Component({
  selector: 'app-website-leads',
  templateUrl: './website-leads.component.html',
  styleUrls: ['./website-leads.component.scss']
})
export class WebsiteLeadsComponent implements OnInit {

  websiteLeadList: any[] = [];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'View',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit'
    },
  ];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'StudentId',
      headerName: 'SR.NO',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'SR.NO'

    },
    {
      field: 'StudentName',
      headerName: 'Student Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Student Name'

    },
    {
      field: 'Email',
      headerName: 'Email',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Email'

    },
    {
      field: 'Phone',
      headerName: 'Phone',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Phone'
},
    {
      field: 'CourseName',
      headerName: 'Course Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Course Name'

    },
    {
      field: 'YourLocation',
      headerName: 'Your Location',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Your Location'

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
      headerTooltip:'College Website'

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
    private websiteleadsService:WebsiteleadsService
  ) { }

  ngOnInit(): void {
    this.getWebsiteLeadDetails();
  }
  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'StudentId': data.row.StudentId
    }
    this.router.navigate(['tds/counsellor-dashboard/website-leads/add-website'], { queryParams: data1 });
  }
  selectWebsiteLeads($event: any)
   {
    throw new Error('Method not implemented.');
  }
  onAddWebsiteLeads(website?: any) {

    let navigationExtras: NavigationExtras = {};
    if (website) {
      navigationExtras = {
        state: {
          websiteData: website
        }
      };
    }
    this.router.navigateByUrl('tds/counsellor-dashboard/website-leads/add-website')
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  editWebsite(WebsiteData: any) {
    const studentId = WebsiteData.studentId;
    const index = this.websiteLeadList.findIndex(website => website.studentId === studentId);

    if (index !== -1) {


      this.openEditForm(WebsiteData).then((editedWebsiteData: any) => {

        this.websiteLeadList[index] = editedWebsiteData;
        console.log('Edited website:', editedWebsiteData);

      });
    }
  }
  openEditForm(websiteData: any): Promise<any> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const editedWebsiteData = { ...websiteData };

        editedWebsiteData.Status = 'Edited';
        resolve(editedWebsiteData);
      }, 1000);
    });
  }
  getWebsiteLeadDetails() {
    this.websiteleadsService.getWebsiteList().subscribe((result: any) => {
      this.websiteLeadList = result.Value;
      let websiteLeadList = result.Value;
    })
  } 

}
