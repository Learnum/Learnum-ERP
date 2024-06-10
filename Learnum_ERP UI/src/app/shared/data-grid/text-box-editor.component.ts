// textbox-editor.component.ts
import { Component } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-textbox-editor',
  template: `
    <input type="text" style="width:110px;height:38px" [(ngModel)]="value" (keydown.enter)="onEnter()">
  `,
})
export class TextboxEditorComponent implements ICellEditorAngularComp {
  private params: any;
  public value: any;

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
    
  }

  getValue(): any {
    return this.value;
  }

  onEnter(): void {
    //this.params.stopEditing();
    //this.agInit(this.params)
    console.log('hiiiiiiiii',this.params)

  }
}
