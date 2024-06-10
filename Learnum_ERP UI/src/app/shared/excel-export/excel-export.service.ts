import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import * as XLSX from "xlsx";

@Injectable({ providedIn: 'root' })

export class ExcelExportService {
  constructor(public datepipe: DatePipe) { }

  exportToExcel(arr: any[], name?: string) {
    let { sheetName, fileName } = this.getFileName(name);
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(arr);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  getFileName = (name: string) => {
    let date = new Date();
    let timeSpan = this.datepipe.transform(date, 'yyyy-MM-dd h:mm a');
    let sheetName = name || "ExportResult";
    let fileName = `${sheetName}-${timeSpan}`;
    return {
      sheetName,
      fileName
    };
  };
}