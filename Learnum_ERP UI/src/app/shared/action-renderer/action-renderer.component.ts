import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-renderer',
  templateUrl: './action-renderer.component.html',
  styleUrls: ['./action-renderer.component.scss']
})
export class ActionRendererComponent implements ICellRendererAngularComp {

tooltip = 'ggggg'
  params: any;
  agInit(params: any): void {
    if(params.actions.length>0){
      if(params.actions[0].actionPage === 'ViewEmployee'){
        if(params.data.IsActive){
          params.actions = params.actions.filter(function( obj ) {
            return obj.action !== 'activate';
          });
        }
        else if(!params.data.IsActive){
          params.actions = params.actions.filter(function( obj ) {
            return obj.action !== 'deactivate';
          });
        }
      }
    }
    this.params = params;
  }
  // afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
  //   throw new Error('Method not implemented.');
  // }

  btnClickedHandler(action: string) {
    this.params.clicked(this.params.data, action);
  }

  refresh(): boolean {
    return false
  }

}
