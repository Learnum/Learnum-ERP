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
      actionPage: 'View',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit '
    },
  ];

  declaredTableColumns: TableColumn[] = [
    // {
    //   field: 'StudentId',
    //   headerName: 'Student ID',
    //   filter: 'agTextColumnFilter',
    //   filterParams: {buttons: ['reset', 'apply'],},
    //   minWidth: 150,
    //   headerTooltip:'Student ID',
    // },
    {
      field: 'Answer',
      headerName: 'Student Answer',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Student Answer',
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
      field: 'AddedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Added By'
    },
    {
      field: 'AddedDate',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Added Time'
    },
    {
      field: 'UpdatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Updated By'
    },
    {
      field: 'UpdatedDate',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Updated Time'
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
    this.router.navigate(['erp/my-practical-exam/practical-problem-answer-sheet'], { queryParams: data1 });
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
    this.router.navigateByUrl('erp/my-practical-exam/practical-problem-answer-sheet')
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
 

}
