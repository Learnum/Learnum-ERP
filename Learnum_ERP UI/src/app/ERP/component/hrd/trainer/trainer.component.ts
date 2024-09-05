import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { ActionColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddtrainerService } from './add-trainer/addtrainer.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit {
  selectedItems: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addtrainerService: AddtrainerService,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.getAllTrainerDetails();
  }



  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewTrainer',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip: 'Edit Trainer'
    },
  ];

  trainerList: any[] = [];
  declaredTableColumns: TableColumn[] = [

    {
      field: 'TrainerName',
      headerName: 'Trainer name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200,
      headerTooltip: 'Trainer name'
    },
    {
      field: 'BranchName',
      headerName: 'Branch Name',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'Branch name'
    },

    {
      field: 'CourseName',
      headerName: ' Course Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200,
      headerTooltip: 'Course name'
    },
    {
      field: 'IsActive',
      headerName: 'Trainer Status',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'Trainer Status',
      valueFormatter: params => {
        return params.value ? 'Active' : 'Inactive';
      }
    },
    {
      field: 'AddedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Added By'
    },
    {
      field: 'AddedDate',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Trainer name'
    },
    {
      field: 'UpdatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated By'
    },
    {
      field: 'UpdatedDate',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated Time'
    },

  ];

  selectTrainer(trainer: any) {
    this.selectedItems = trainer;
    console.log('Selected rows:', this.selectedItems);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'TrainerId': data.row.TrainerId
    };
    this.router.navigate(['tds/hrd/trainer/add-trainer'], { queryParams: data1 });
  }

  onAddTrainer() {
    this.router.navigate(['tds/hrd/trainer/add-trainer']);
  }

  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }

  getAllTrainerDetails() {
    this.addtrainerService.getTrainerList().subscribe((result: any) => {
      this.trainerList = result.Value;
    });
  }
}