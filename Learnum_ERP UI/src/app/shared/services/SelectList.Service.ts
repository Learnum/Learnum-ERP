import { Injectable } from '@angular/core';



import { provideRoutes } from '@angular/router';
import { APIService } from 'src/app/core/services/apiService';


@Injectable({providedIn:'root'})
export class SelectListService {

    public selectListData

    private listController = "List/";

    constructor(private apiService: APIService) { }

    getUrl: string = "";

    HousePropertyDropDownLists() {
        this.getUrl = this.listController + "HousePropertyDropDownLists";
        return this.apiService.getData(this.getUrl);
    }

    
}
