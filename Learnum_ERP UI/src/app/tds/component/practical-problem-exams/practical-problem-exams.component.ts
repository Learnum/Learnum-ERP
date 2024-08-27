import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn, ActionColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { SchedulePracticalProblemService } from './schedule-practical-problem/schedule-practical-problem.service';

@Component({
  selector: 'app-practical-problem-exams',
  templateUrl: './practical-problem-exams.component.html',
  styleUrls: ['./practical-problem-exams.component.scss']
})
export class PracticalProblemExamsComponent implements OnInit {

  PracticalProblemList: any[] = [];

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
      field: 'BatchName',
      headerName: 'Batch Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Batch Name'

    },
    {
      field: 'SubjectName',
      headerName: 'Subject Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip:'Subject Name'

    },
    {
      field: 'BranchName',
      headerName: 'Branch Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Branch Name'

    },
    {
      field: 'CourseName',
      headerName: 'Course Name',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip:'Course Name'
},
    
    {
      field: 'PracticalProblemStatus',
      headerName: 'Practical Problem Status',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Practical Problem Status'

    },
    
  ];


  
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,    
    private schedulePracticalProblemService: SchedulePracticalProblemService,


  ) { }

  ngOnInit(): void {
    this.getPracticalProblemExamList();
  }

  getPracticalProblemExamList() {
    this.schedulePracticalProblemService.getPracticalProblemList().subscribe((result: any) => {
      this.PracticalProblemList = result.Value;
      //let PracticalProblemList = result.Value;
    })
}

  onAddPracticalProblemExam(practical?: any) {

    let navigationExtras: NavigationExtras = {};
    if (practical) {
      navigationExtras = {
        state: {
          PracticalProblemData: practical
        }
      };
    }
    this.router.navigate(['tds/practical-problem-exams/schedule-practical-problem']);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'SchedulePracticalExamId': data.row.SchedulePracticalExamId
    }
    this.router.navigate(['tds/practical-problem-exams/schedule-practical-problem'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' action button clicked.');
  }

  selectPracticalProblemExam($event: any) {
    throw new Error('Method not implemented.');
  }

  
}



