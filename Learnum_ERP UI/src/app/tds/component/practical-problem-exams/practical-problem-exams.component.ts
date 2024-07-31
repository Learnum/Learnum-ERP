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

  declaredTableColumns: TableColumn[] = [
    // {
    //   field: 'schedulePracticalExamId',
    //   headerName: 'ID',
    //   filter: 'agTextColumnFilter',
    //   filterParams: {
    //     buttons: ['reset', 'apply'],
    //   },
    //   minWidth: 80
    // },
    {
      field: 'BatchName',
      headerName: 'Batch Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'SubjectName',
      headerName: 'Subject Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'BranchName',
      headerName: 'branch Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'CourseName',
      headerName: 'Course Name',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    // {
    //   field: 'TopicName',
    //   headerName: 'Topic Name',
    //   filter: 'agDateColumnFilter',
    //   filterParams: { buttons: ['reset', 'apply'] },
    //   minWidth: 150
    // },
    {
      field: 'PracticalProblemStatus',
      headerName: 'PracticalProblemStatus',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    
  ];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewContentWriter',
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
      'source': data.action,
      'SchedulePracticalExamId': data.row.SchedulePracticalExamId
    };
    this.router.navigate(['tds/practical-problem-exams/schedule-practical-problem'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' action button clicked.');
  }

  selectPracticalProblemExam($event: any) {
    throw new Error('Method not implemented.');
  }

  editPracticalProblem(PracticalProblemData: any) {
    const schedulePracticalExamId = PracticalProblemData.schedulePracticalExamId;
    const index = this.PracticalProblemList.findIndex(PracticalProblem => PracticalProblem.schedulePracticalExamId === schedulePracticalExamId);

    if (index !== -1) {
      this.openEditForm(PracticalProblemData).then((editedPracticalProblemData: any) => {
        this.PracticalProblemList[index] = editedPracticalProblemData;
        console.log('Edited Practical Problem:', editedPracticalProblemData);
      });
    }
  }

  openEditForm(PracticalProblemData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const editedPracticalProblemData = { ...PracticalProblemData };
        editedPracticalProblemData.Status = 'Edited';
        resolve(editedPracticalProblemData);
      }, 1000);
    });
  }
}



