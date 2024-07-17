import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { PracticalProblemAnswerSheetService } from './practical-problem-answer-sheet/practical-problem-answer-sheet.service';


@Component({
  selector: 'app-my-practical-exam',
  templateUrl: './my-practical-exam.component.html',
  styleUrls: ['./my-practical-exam.component.scss']
})
export class MyPracticalExamComponent implements OnInit {

  PracticalReturnList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'StudentId',
      headerName: 'ID',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 80
    },
    {
      field: 'Answer',
      headerName: 'Student Answer',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    },
    {
      field: 'IsActive',
      headerName: 'Status',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100,
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
      actionPage: 'ViewPracticalExam',
      actionIcon: 'uil uil-eye rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
    {
      action: 'edit',
      actionPage: 'EditPracticalExam',
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
    private practicalProblemAnswerSheetService:PracticalProblemAnswerSheetService
  ) {}

  ngOnInit(): void {
    this.getAllPracticalDetails();
  }

  AddPracticalProblem() {
    this.router.navigate(['tds/my-practical-exam/practical-problem-answer-sheet']);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': data.action,
      'StudentId': data.row.studentid
    };
    this.router.navigate(['/tds/my-practical-exam'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' action button clicked.');
  }

  selectBusinessLead(leads: any) {
    // Handle row selection logic
  }

  getAllPracticalDetails() {
    this.practicalProblemAnswerSheetService.getPracticalList().subscribe((result: any) => {
      this. PracticalReturnList = result.Value;
      let  PracticalReturnList = result.Value;
    })
  }

}
