import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AlertService } from 'src/app/core/services/alertService';
import { Userdocument } from 'src/app/shared/Models/userDocument.model';
import { TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { UploadService } from './upload-exel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TextboxEditorComponent } from 'src/app/shared/data-grid/text-box-editor.component';



@Component({
  selector: 'upload-exel',
  templateUrl: './upload-exel.component.html',
  styleUrls: ['./upload-excel.component.scss'],

})

export class UploadExelComponent {
  allowFileDrop: boolean;
  uploadedFile: Array<Userdocument> = [];
  public files: NgxFileDropEntry[] = [];
  IsUploaded: boolean;
  @ViewChild("fileInput") fileInput: ElementRef;


  formQsectionList = [
    { value: '1', label: 'From 24Q Section' },
    { value: '2', label: 'From 25Q Section' },
    { value: '3', label: 'From 24Q Section' }

  ]
  monthList = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },


  ]
  tdsReturnList = [
    {
      sr_No: '001',
      bsrCode: '202324',
      date: '06/10.2024',
      challanserialnumber: '12345',
      paymenttype: '200',
      seccode: '24B',
      tds: '',
      surcharge: '',
      edcess: '',
      interest: '',
      fees: '',
      others: '',
      total: '2000'
    },
    {
      sr_No: '002',
      bsrCode: '202324',
      date: '06/10.2024',
      challanserialnumber: '12345',
      paymenttype: '200',
      seccode: '24B',
      tds: '',
      surcharge: '',
      edcess: '',
      interest: '',
      fees: '',
      others: '',
      total: '2000'
    },
    {
      sr_No: '003',
      bsrCode: '202324',
      date: '06/10.2024',
      challanserialnumber: '12345',
      paymenttype: '200',
      seccode: '24B',
      tds: '',
      surcharge: '',
      edcess: '',
      interest: '',
      fees: '',
      others: '',
      total: '2000'
    },
    {
      sr_No: '004',
      bsrCode: '202324',
      date: '06/10.2024',
      challanserialnumber: '12345',
      paymenttype: '200',
      seccode: '24B',
      tds: '',
      surcharge: '',
      edcess: '',
      interest: '',
      fees: '',
      others: '',
      total: '2000'

    },

  ]
  declaredTableColumns: TableColumn[] = [
    {
      field: 'sr_No',
      headerName: 'SR NO',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100
    },
    {
      field: 'bsrCode',
      headerName: 'BSR  Code',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
    },
    {
      field: 'date',
      headerName: 'Date',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100

    },
    {
      field: 'challanserialnumber',
      headerName: 'Challan Serial Number',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'paymenttype',
      headerName: 'Payment Type',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'seccode',
      headerName: 'Sec Code',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'tds',
      headerName: 'TDS',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      cellRenderer: TextboxEditorComponent,


    },
    {
      field: 'surcharge',
      headerName: 'Surcharge',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      cellRenderer: TextboxEditorComponent,


    },
    {
      field: 'edcess',
      headerName: 'Ed. Cess',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      cellRenderer: TextboxEditorComponent,


    },
    {
      field: 'interest',
      headerName: 'Interest',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      cellRenderer: TextboxEditorComponent,


    },
    {
      field: 'fees',
      headerName: 'Fees',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 140,
      cellRenderer: TextboxEditorComponent,


    }, {
      field: 'others',
      headerName: 'Others',
      cellEditor: 'customTextCellEditor', // Replace with your custom cell editor component
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 140,
      cellRenderer: TextboxEditorComponent,


    },
    {
      field: 'total',
      headerName: 'Total',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 120

    }
  ];
  receivedData: any

  constructor(private alertService: AlertService,
    private router: Router,
    private uploadService: UploadService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.receivedData = JSON.parse(this.route.snapshot.queryParams.yourDataKey);
    console.log(this.receivedData)
  }
  selectEmployee(employees: any) {

  }
  onRowAction(data: any) {

  }


  allowDrop(event): void {
    event.preventDefault();
    event.dataTransfer.setData("Drop Here", event.target.id);
    this.allowFileDrop = true; // highlight drop zone on drag over using css class
  }

  onFileDrop(event) {
    event.preventDefault();
    this.allowFileDrop = false;
    let fileList: FileList = event.dataTransfer.files;
  }

  onFileChange(event) {
    let fileList: FileList = event.target.files;
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    this.uploadedFile = [];
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.uploadedFile.push({
            File: file,
            FileName: file.name,
            Password: '',
            srcPath: ''

          });
        });
        this.IsUploaded = true;
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  download() {
    // if (this.bulkEmployeeTypeId > 0) {
    this.uploadService.getTemplateBites().subscribe((m) => {
      if (m.Value.data) {
        this.downloadFile(
          m.Value.data,
          "application/vnd.ms-excel",
          "employee upload template.xlsx"
        );
      }
    });
    // } else {
    //   this.alertService.ShowErrorMessage("Please Select the Bulk Employee Type");
    // }

    // const link = document.createElement('a');
    // link.setAttribute('target', '_blank');
    // link.setAttribute('href', 'assets/template/EmployeesUploadTemplate.xlsx');
    // link.setAttribute('download', 'Employees Upload Template.xlsx');
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
  }

  downloadFile(data: any, fileFormat: string, fileName: string) {
    const arr = data;
    const blob = new Blob(
      [
        new Uint8Array(
          atob(arr)
            .split("")
            .map((char) => char.codePointAt(0))
        ),
      ],
      { type: fileFormat }
    );

    if (window.navigator && window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob);
    } else {
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = fileName;
      link.click();
    }
  }
  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  onCancleClick() {
    if (this.receivedData.source == "employee") {
      this.router.navigateByUrl('tds/tds-return/employee')
    } else {
      this.router.navigateByUrl('tds/tds-return/challan')
    }
  }

  onSubmitClick(e: any) {
    if (this.uploadedFile.length > 0) {
      const formData = new FormData();
      formData.append("employeeRecordsFile",
        this.uploadedFile[this.uploadedFile.length - 1].File,
        this.uploadedFile[this.uploadedFile.length - 1].FileName);
      //let bulkEmployeeType = this.bulkEmployeeTypeId;
      this.uploadService.uploadBulkEmployees(formData).subscribe(
        (m) => {
          if (m.Value.data) {
            this.alertService.ShowWarningMessage(
              "Some records contains error, Please find downloaded attachment"
            );
            this.downloadFile(m.Value.data, "application/vnd.ms-excel", "error_file.xlsx");
            //this.getUploadedFileHistory();
          } else {
            this.alertService.ShowSuccessMessage("All records added successfully");
            this.uploadedFile = [];
            //this.getUploadedFileHistory();
            this.fileInput.nativeElement.value = "";
          }
        },
        (error: any) => {
          this.alertService.ShowErrorMessage(
            "File Contains Invalid Records.Please Check and Re-Upload"
          );
        }
      );
    }
  }
}