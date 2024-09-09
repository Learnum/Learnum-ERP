import { Injectable } from '@angular/core';
import { APIService } from 'src/app/core/services/apiService';
import { observable } from 'rxjs';
import { BaseService } from 'src/app/core/services/baseService';

@Injectable({
  providedIn: 'root'
})
export class McqService extends BaseService{
 
  constructor(private apiService: APIService) {
    super();
  }

 getMcqDetails()
  {
    
  }
}
