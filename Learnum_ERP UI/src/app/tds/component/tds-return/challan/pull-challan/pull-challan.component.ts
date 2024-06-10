import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ActionRendererComponent } from 'src/app/shared/action-renderer/action-renderer.component';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { TextboxEditorComponent } from 'src/app/shared/data-grid/text-box-editor.component';



@Component({
  selector: 'pull-challan',
  templateUrl: './pull-challan.component.html',
  styleUrls: ['./pull-challan.component.scss'],
})

export class PullChallanComponent {
  [x: string]: any;
  @ViewChild('agGrid', { static: true }) agGrid: AgGridAngular;

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
      No: '001',
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
      minWidth: 100,


      //cellEditor: 'appTextboxEditor'
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
      editable: true,
      singleClickEdit: true,
      cellClass: 'edit-cell',
      //cellStyle: {border:'1px solid #dde2eb','border-bottom':'none', background:'#fff',cursor: 'pointer',margin:'0px 2px',},
      minWidth: 150,
      // cellRenderer: TextboxEditorComponent,
      // onCellValueChanged: this.onCellValueChangedd.bind(this),
    },
    {
      field: 'surcharge',
      headerName: 'Surcharge',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      editable: true,
      singleClickEdit: true,
      cellClass: 'edit-cell',


      // cellRenderer: TextboxEditorComponent,

    },
    {
      field: 'edcess',
      headerName: 'Ed. Cess',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      editable: true,
      singleClickEdit: true,
      cellClass: 'edit-cell',

      // cellRenderer: TextboxEditorComponent,

    },
    {
      field: 'interest',
      headerName: 'Interest',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      editable: true,
      singleClickEdit: true,
      cellClass: 'edit-cell',

      // cellRenderer: TextboxEditorComponent,

    },
    {
      field: 'fees',
      headerName: 'Fees',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 120,
      editable: true,
      singleClickEdit: true,
      cellClass: 'edit-cell',

      // cellRenderer: TextboxEditorComponent,

    }, {
      field: 'others',
      headerName: 'Others',
      cellEditor: 'customTextCellEditor', // Replace with your custom cell editor component
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 120,
      editable: true,
      singleClickEdit: true,
      cellClass: 'edit-cell',

      // cellRenderer: TextboxEditorComponent,

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
  gridApi: any;
  constructor() { }
  selectEmployee(employees: any) {

  }


  onRowAction(data: any) {

  }

  // Method to handle the cell value changed event
  onCellValueChangedd(params: any) {
    console.log('Cell value changed!', params);

    // Perform actions when a cell value changes
    const newValue = params.newValue;
    const oldValue = params.oldValue;
    const column = params.column.colDef.headerName;
    const row = params.node.data.id; // adjust this based on your data structure

    console.log(`Cell value changed in column '${column}' for row ${row}. Old value: ${oldValue}, New value: ${newValue}`);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    console.log('Row Data after change:', params);
    const selectedNode = this.gridApi.getSelectedNodes()[0];

    if (selectedNode) {
      // Assuming you have a column named 'value' in your columnDefs
      selectedNode.setDataValue('value', 1111111111111111);
      this.gridApi.refreshCells();
    }
  }


  // onCellValueChanged(params) {
  //   // 'params.data' contains the updated row data
  //   console.log('Row Data after change:', params.data);

  //   // Implement your save logic here
  //   // For example, send an HTTP request to update the data on the server
  // }

  ngAfterViewInit() {
    // Access the AG-Grid API after the grid has been fully initialized
    //this.OnConfirmClick(e:any);
  }
  OnConfirmClick(e: any) {
    // //   const editedRows = this.agGrid.api.getSelectedNodes();
    // //   console.log('Edited Data:', editedRows.map(row => row.data));

    console.log('Data :', e)
    // const selectedNode = this.gridApi.getSelectedNodes()[0];


    //     // Assuming you have a column named 'value' in your columnDefs
    //     selectedNode.setDataValue('value', 1111111111111111);
    //     this.gridApi.refreshCells();


  }
  onCellValueChanged(e: any) {
    const editedRows = this.gridApi.getSelectedNodes()[0];
    console.log('Edited Data:', editedRows.map(row => row.data));

  }

}