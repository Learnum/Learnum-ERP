import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
@Component({
  selector: 'app-website-leads',
  templateUrl: './website-leads.component.html',
  styleUrls: ['./website-leads.component.scss']
})
export class WebsiteLeadsComponent implements OnInit {

  leadList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'studentName',
      headerName: 'Student Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'email',
      headerName: 'Email',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'phone',
      headerName: 'Phone',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'courseName',
      headerName: 'Course Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'leadLocation',
      headerName: 'Lead Location',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    }
  ];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewLead',
      actionIcon: 'uil uil-eye rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
    {
      action: 'edit',
      actionPage: 'EditLead',
      actionIcon: 'uil uil-edit rounded text-primary mb-0',
      buttonClass: 'btn btn-sm btn-primary',
      colorClass: 'text-primary h4'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getLeadList();
  }

  getLeadList() {
    // this.leadService.getLeadList().subscribe(
    //   (result: any) => {
    //     this.leadList = result.Value;
    //   },
    //   (error: any) => {
    //     console.error("Error occurred while fetching leads:", error);
    //     this.alertService.ShowErrorMessage("An error occurred while fetching leads. Please try again later.");
    //   }
    // );
  }

  AddWebsiteLead() {
    this.router.navigate(['/tds/counsellor-dashboard/website-leads/add-website']);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': data.action,
      'LeadId': data.row.LeadId
    };
    this.router.navigate(['/tds/counsellor-dashboard/website-leads/add-website'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' action button clicked.');
  }

  selectLead(leads: any) {
    // Handle row selection logic
  }

}
