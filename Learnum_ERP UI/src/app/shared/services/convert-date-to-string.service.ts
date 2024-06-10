import { Injectable } from '@angular/core';

import { DatePipe } from '@angular/common';

@Injectable({ providedIn: 'root' })

export class DateToStringService {

    constructor(private datePipe: DatePipe) { }

    // to get date as string
    getDateString(inputDate: Date) {
        return this.datePipe.transform(inputDate, "yyyy-MM-dd");
    }
}