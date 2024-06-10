import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';


@Component({
  selector: 'app-my-practical-exam',
  templateUrl: './my-practical-exam.component.html',
  styleUrls: ['./my-practical-exam.component.scss']
})
export class MyPracticalExamComponent implements OnInit {

  declaredTableColumns: TableColumn[] = [
    {
      field: 'studentid',
      headerName: 'Student ID',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 80
    },
    {
      field: 'practical_problem_id',
      headerName: 'Practical Problem ID',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    },
    {
      field: 'submit_answer',
      headerName: 'Submit Answer',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'teachers_remark',
      headerName: "Teacher's Remark",
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'mark_received',
      headerName: 'Mark Received',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    },
    {
      field: 'status',
      headerName: 'Status',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    }
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
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getPracticalExamList();
  }

  getPracticalExamList() {
    // this.practicalExamService.getPracticalExamList().subscribe(
    //   (result: any) => {
    //     this.practicalExamList = result.Value;
    //   },
    //   (error: any) => {
    //     console.error("Error occurred while fetching practical exam data:", error);
    //     this.alertService.ShowErrorMessage("An error occurred while fetching practical exam data. Please try again later.");
    //   }
    // );
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

}
