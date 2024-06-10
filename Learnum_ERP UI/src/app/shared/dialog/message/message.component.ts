import { Component, Input, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent {
    @Input() isOpenMessagePopup = false;

    readChatMessage: boolean = false
    constructor(){
        if (this.isOpenMessagePopup) {
            document.getElementById('messagePopup').click()
        }
    }

    ngOnInit() {
      
    }

    closeMessagemodal() {
        this.isOpenMessagePopup = false
    }

}