import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';

@Component({
  selector: 'app-student-admission',
  templateUrl: './student-admission.component.html',
  styleUrls: ['./student-admission.component.scss']
})
export class StudentAdmissionComponent implements OnInit {

  studentAdmissionList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'DateOfAdmission',
      headerName: 'Date of Admission',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 120,
      headerTooltip: 'Date of Admission'

    },
    {
      field: 'CourseName',
      headerName: 'Course Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 120,
      headerTooltip: 'Course Name'

    },
    {
      field: 'BranchName',
      headerName: 'Branch Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 120,
      headerTooltip: 'Modified By'

    },
    {
      field: 'BatchName',
      headerName: 'Batch Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 120,
      headerTooltip: 'Batch Name'

    },
    {
      field: 'StudentName',
      headerName: 'Student Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 120,
      headerTooltip: 'Student Name'

    },
    {
      field: 'StudentNumber',
      headerName: 'Student Number',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 120,
      headerTooltip: 'Modified By'

    },
    {
      field: 'Status',
      headerName: 'Status',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100,
      headerTooltip: 'Status'

    }
  ];

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

  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getStudentAdmissionList();
  }

  getStudentAdmissionList() {
    
  }

  AddStudentAdmission() {
    this.router.navigate(['tds/student-management/add-admissions']);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': data.action,
      'AdmissionId': data.row.AdmissionId // Assuming AdmissionId is the unique identifier for student admissions
    };
    this.router.navigate(['/tds/student-management/add-admissions'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' action button clicked.');
  }

  selectStudentAdmission(admissions: any) {
    // Handle row selection logic
  }
}
