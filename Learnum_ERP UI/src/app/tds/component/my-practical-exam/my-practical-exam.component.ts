import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewTrainer',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Trainer'
    },
  ];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'StudentId',
      headerName: 'SR.NO',
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
    // {
    //   field: 'IsActive',
    //   headerName: 'Status',
    //   filter: 'agTextColumnFilter',
    //   filterParams: { buttons: ['reset', 'apply'] },
    //   minWidth: 100,
    //   valueFormatter: params => {
    //     return params.value ? 'Active' : 'Inactive';
    //   }
    // },
    {
      field: 'addedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'addedTime',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'updatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'updatedTime',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    }, 
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

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'StudentId': data.row.StudentId
    }
    this.router.navigate(['tds/my-practical-exam/practical-problem-answer-sheet'], { queryParams: data1 });
  }
  selectPracticalAnswer($event: any)
   {
    throw new Error('Method not implemented.');
  }

  ActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewPracticalAnswer',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
  onAddPracticalAnswer(answer?: any) {

    let navigationExtras: NavigationExtras = {};
    if (answer) {
      navigationExtras = {
        state: {
          answerData: answer
        }
      };
    }
    this.router.navigateByUrl('tds/my-practical-exam/practical-problem-answer-sheet')
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  getAllPracticalDetails() {
    this.practicalProblemAnswerSheetService.getPracticalList().subscribe((result: any) => {
      this. PracticalReturnList = result.Value;
      let  PracticalReturnList = result.Value;
    })
  }
  editPracticalAnswer(AnswerData: any) {
    const studentId = AnswerData.questionId;
    const index = this.PracticalReturnList.findIndex(answer => answer.studentId === studentId);

    if (index !== -1) {


      this.openEditForm(AnswerData).then((editedPracticalAnswerData: any) => {

        this.PracticalReturnList[index] = editedPracticalAnswerData;
        console.log('Edited PracticalAnswer:', editedPracticalAnswerData);

      });
    }
  }
  openEditForm(PracticalAnswerData: any): Promise<any> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const editedPracticalAnswerData = { ...PracticalAnswerData };

        editedPracticalAnswerData.Status = 'Edited';
        resolve(editedPracticalAnswerData);
      }, 1000);
    });
  }

}
