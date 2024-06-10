import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.scss']
})
export class TrainerDashboardComponent implements OnInit {

  declaredTableColumns: TableColumn[] = [
    {
      field: 'branchName',
      headerName: 'Branch Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
  ];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewSyllabusCompletion',
      actionIcon: 'uil uil-eye rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
    {
      action: 'edit',
      actionPage: 'EditSyllabusCompletion',
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
    // Fetch initial data if needed
  }

  onAddSyllabus() {
    this.router.navigate(['tds/trainer-dashboard/syllabus-completion']);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': data.action,
      'SyllabusCompletionId': data.row.SyllabusCompletionId
    };
    this.router.navigate(['/tds/trainer-dashboard/syllabus-completion'], { queryParams: data1 });
  }
  
  onActionButton(action: string) {
    alert(action + ' action button clicked.');
  }
  
  selectSyllabusCompletion(completions: any) {
    // Handle row selection logic
  }

}
