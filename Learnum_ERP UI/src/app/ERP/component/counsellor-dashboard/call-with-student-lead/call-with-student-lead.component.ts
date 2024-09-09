import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { StudentcallsService } from './call-with-student/studentcalls.service';
@Component({
  selector: 'app-call-with-student-lead',
  templateUrl: './call-with-student-lead.component.html',
  styleUrls: ['./call-with-student-lead.component.scss']
})
export class CallWithStudentLeadComponent implements OnInit {

  studentCallList: any[] = [];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewTrainer',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Student Lead'
    },
  ];
  declaredTableColumns: TableColumn[] = [
    {
      field: 'CallId',
      headerName: 'SR.NO',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'SR.NO'
    },
    {
      field: 'StudentName',
      headerName: 'Student Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Student Name'
    },
    {
      field: 'Phone',
      headerName: 'Phone',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Phone'
    },
    {
      field: 'PhoneCallTime',
      headerName: 'Phone Call Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Phone Call Time'
    },
    {
      field: 'CallConversation',
      headerName: 'Call Conversation',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Call Conversation'
    },
    {
      field: 'LeadStatus',
      headerName: 'Lead Status',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Lead Status'
    },
    {
      field: 'addedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Added By'
    },
    {
      field: 'addedTime',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Added Time'
    },
    {
      field: 'updatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Updated By'
    },
    {
      field: 'updatedTime',
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
    private studentcallsService:StudentcallsService
  ) { }

  ngOnInit(): void {
    this.getStudentCallDetails();
  }

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'CallId': data.row.CallId
    }
    this.router.navigate(['erp/counsellor-dashboard/call-with-student-lead/call-with-student'], { queryParams: data1 });
  }
  selectStudentCall($event: any)
   {
    throw new Error('Method not implemented.');
  }

  ActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewCall',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
  onAddCall(call?: any) {

    let navigationExtras: NavigationExtras = {};
    if (call) {
      navigationExtras = {
        state: {
          callData: call
        }
      };
    }
    this.router.navigateByUrl('erp/counsellor-dashboard/call-with-student-lead/call-with-student')
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  editStudentCall(CallData: any) {
    const callId = CallData.callId;
    const index = this.studentCallList.findIndex(call => call.callId === callId);

    if (index !== -1) {


      this.openEditForm(CallData).then((editedCallData: any) => {

        this.studentCallList[index] = editedCallData;
        console.log('Edited Call:', editedCallData);

      });
    }
  }
  openEditForm(callData: any): Promise<any> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const editedCallData = { ...callData };

        editedCallData.Status = 'Edited';
        resolve(editedCallData);
      }, 1000);
    });
  }
  getStudentCallDetails() {
    this.studentcallsService.getStudentCallDetails().subscribe((result: any) => {
      this.studentCallList = result.Value;
      let studentCallList = result.Value;
    })
  }
}
