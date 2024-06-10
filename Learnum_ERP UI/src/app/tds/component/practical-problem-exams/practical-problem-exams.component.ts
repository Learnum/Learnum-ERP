import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn, ActionColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';

@Component({
  selector: 'app-practical-problem-exams',
  templateUrl: './practical-problem-exams.component.html',
  styleUrls: ['./practical-problem-exams.component.scss']
})
export class PracticalProblemExamsComponent implements OnInit {

  practicalProblemExamList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'ExamId',
      headerName: 'ID',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 80
    },
    {
      field: 'title',
      headerName: 'Title',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'subject',
      headerName: 'Subject',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'grade',
      headerName: 'Grade',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    },
    {
      field: 'date',
      headerName: 'Date',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
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
      actionPage: 'ViewPracticalProblemExam',
      actionIcon: 'uil uil-eye rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
    {
      action: 'edit',
      actionPage: 'EditPracticalProblemExam',
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
    this.getPracticalProblemExamList();
  }

  getPracticalProblemExamList() {
    // this.practicalProblemExamService.getPracticalProblemExamList().subscribe(
    //   (result: any) => {
    //     this.practicalProblemExamList = result.Value;
    //   },
    //   (error: any) => {
    //     console.error("Error occurred while fetching practical problem exams:", error);
    //     this.alertService.ShowErrorMessage("An error occurred while fetching practical problem exams. Please try again later.");
    //   }
    // );
  }

  onAddPracticalProblemExam() {
    this.router.navigate(['tds/practical-problem-exams/schedule-practical-problem']);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': data.action,
      'ExamId': data.row.ExamId
    };
    this.router.navigate(['/tds/practical-problem-exam/add-practical-problem-exam'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' action button clicked.');
  }

  selectPracticalProblemExam(exams: any) {
    // Handle row selection logic
  }
}
