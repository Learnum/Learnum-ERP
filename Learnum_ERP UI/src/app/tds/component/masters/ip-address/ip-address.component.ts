import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
// import { IpAddressService } from './ip-address.service';

import { AddIpaddressService } from './add-ipaddress/add-ipaddress.service';

@Component({
  selector: 'app-ip-address',
  templateUrl: './ip-address.component.html',
  styleUrls: ['./ip-address.component.scss']
})
export class IpAddressComponent {

  ipaddresList: any[] = [];

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
      field: 'LocationId',
      headerName: 'Sr.No',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'Location',
      headerName: 'Location',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'LocationIP',
      headerName: 'LocationIP',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'IsActive',
      headerName: 'Status',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      valueFormatter: params => {
        return params.value ? 'Active' : 'Inactive';
      }
    },
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
      headerName: 'updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    }, 
    
  ];
 
  ngOnInit(): void {
    this.getAllLocationDetails();
  }
  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addIpaddressService: AddIpaddressService,
  ) { }

  selectLocation($event: any) {
    throw new Error('Method not implemented.');
  }
  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'LocationId': data.row.LocationId
    }
    this.router.navigate(['tds/masters/ip-address/add-ipaddress'], { queryParams: data1 });
  }
  ActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewEmployee',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];

  onAddIP(location?: any) {
    let navigationExtras: NavigationExtras = {};
    if (location) {
      navigationExtras = {
        state: {
          locationData: location
        }
      };
    }
    this.router.navigateByUrl('tds/masters/ip-address/add-ipaddress')
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  getAllLocationDetails() {
    this.addIpaddressService.getLocationList().subscribe((result: any) => {
      this.ipaddresList = result.Value;
      let ipaddresList = result.Value;
    })
  }
  editLocation(LocationData: any) {
    const locationId = LocationData.locationId;
    const index = this.ipaddresList.findIndex(location => location.locationId === locationId);
    if (index !== -1) {
      this.openEditForm(LocationData).then((editedlocationData: any) => {
        this.ipaddresList[index] = editedlocationData;
        console.log('Edited Location:', editedlocationData);

      });
    }
  }
  openEditForm(LocationData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const editedlocationData = { ...LocationData };

        editedlocationData.Status = 'Edited';
        resolve(editedlocationData);
      }, 1000);
    });
  }
}
