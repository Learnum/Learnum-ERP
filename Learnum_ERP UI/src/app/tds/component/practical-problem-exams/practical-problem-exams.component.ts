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
      actionPage: 'ViewPracticalProblem',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];

  
  ActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewPractical',
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

  editPractical(PracticalData: any) {
    const schedulePracticalExamId = PracticalData.schedulePracticalExamId;
    const index = this.PracticalProblemList.findIndex(practical => practical.schedulePracticalExamId === schedulePracticalExamId);

    if (index !== -1) {


      this.openEditForm(PracticalData).then((editedPracticalData: any) => {

        this.PracticalProblemList[index] = editedPracticalData;
        console.log('Edited Practical:', editedPracticalData);

      });
    }
  }
  openEditForm(practicalData: any): Promise<any> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const editedPracticalData = { ...practicalData };

        editedPracticalData.Status = 'Edited';
        resolve(editedPracticalData);
      }, 1000);
    });
  }
}



