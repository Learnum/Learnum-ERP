import { Time } from '@angular/common';
import * as moment from 'moment';

export class BaseService {

    public FormatDate(value:Date):string
    {
        return moment(value).format('DD-MM-YYYY');
    }
    public formatDate(date) {
       const d = new Date(date);
       let month = '' + (d.getMonth() + 1);
       let day = '' + d.getDate();
       const year = d.getFullYear();
       if (month.length < 2) month = '0' + month;
       if (day.length < 2) day = '0' + day;
       return [year, month, day].join('-');
     }

    

     extractTime(datetime: string): string {
      const date = new Date(datetime);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      
      // Replace '00:00' with the current time
      if (hours === '00' && minutes === '00') {
        const now = new Date();
        const currentHours = now.getHours().toString().padStart(2, '0');
        const currentMinutes = now.getMinutes().toString().padStart(2, '0');
        return `${currentHours}:${currentMinutes}`;
      }
    
      return `${hours}:${minutes}`;
    }
    
}