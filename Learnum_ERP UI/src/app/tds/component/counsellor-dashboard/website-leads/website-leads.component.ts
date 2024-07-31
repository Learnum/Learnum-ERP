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

  declaredTableColumns: TableColumn[] = [
    {
      field: 'StudentId',
      headerName: 'SR.NO',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'StudentName',
      headerName: 'Student Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'Email',
      headerName: 'Email',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'Phone',
      headerName: 'Phone',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'CourseName',
      headerName: 'Course Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'YourLocation',
      headerName: 'Your Location',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
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
    },{
      field: 'updatedDate',
      headerName: 'UpdatedDate',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
  ];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewWebsiteLeads',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
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

  ActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewWebsiteLeads',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
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
