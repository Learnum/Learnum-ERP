import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { GridApi, GridOptions, SelectionChangedEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../action-renderer/action-renderer.component';
import { ActionColumn, TableColumn } from './model/data-grid-column.model';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {
  @Input() isEditable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() isColumnFilterable = false;
  @Input() isResizable = false;
  @Input() isPageable = false;
  @Input() rowSelection: any;
  @Input() defaultColDef: any;
  @Input() tableColumns: TableColumn[] = [];
  @Input() actionColumns: ActionColumn[] = [];
  @Input() actionButtons: ActionColumn[] = [];
  @Input() defaultPageSize: number = 10;
  @Input() frameworkComponents: any;


  @Output() selectedRows: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() actionButton: EventEmitter<any> = new EventEmitter<any>();
  @Output() gridReady: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowClick: EventEmitter<any> = new EventEmitter<any>();

  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  tableDataSource: [] = [];
  displayedColumns: TableColumn[] = [];
  searchText: string = '';

  gridOptions: GridOptions;
  gridApi: GridApi;

  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableColumns']) {
      this.displayedColumns = this.tableColumns;
      this.initializeColumns();
      this.gridOptions = <GridOptions>{
        suppressCellFocus: true,
        pagination:true,
        paginationPageSize: this.defaultPageSize,
        
        defaultColDef: {
          editable: this.isEditable,
          sortable: this.isSortable,
          resizable: this.isResizable,
          filter: this.isColumnFilterable,
          flex: 1,
          minWidth: 150,
          onCellValueChanged:this.ngOnInit.bind(this),
  
        },
        
  
        getRowStyle(params) {
          if (params.data.isActive && params.data.cycleType) {
            return { 'background-color': '#aae796' }
          } else if (!params.data.isActive && params.data.cycleType) {
            return { 'color': 'red' }
          }
          return null;
        }
      };
    }
   console.log('ssssss',this.tableDataSource)
  }
  ngOnInit(): void {
    this.initializeColumns();
    // set grid options configuration
    this.gridOptions = <GridOptions>{
      suppressClickEdit: false,
      //suppressCellFocus: true,
      //suppressFocusAfterClick:true,
      pagination: this.isPageable,
      paginationPageSize: this.defaultPageSize,
      defaultColDef: {
        editable: this.isEditable,
        sortable: this.isSortable,
        resizable: this.isResizable,
        filter: this.isColumnFilterable,
        flex: 1,
        minWidth: 150,
        

      },
      onRowClicked: this.onRowClicked.bind(this),
      getRowStyle(params) {
        if (params.data.isActive && params.data.cycleType) {
          return { 'background-color': '#aae796' }
        } else if (!params.data.isActive && params.data.cycleType) {
          return { 'color': 'red' }
        }
        return null;
      }
    };
  }

  onRowClicked(event) {
    this.onRowClick.emit(event.data);
  }

  initializeColumns(): void {
    // select column
    let selectColumn: TableColumn = {
      field: 'select',
      headerName: '',
      maxWidth: 30,
      headerCheckboxSelection: true,
      checkboxSelection: true,
    }
    // action buttons column
    let actionsColumn: TableColumn = {
      field: 'action',
      headerName: 'ACTIONS',
      maxWidth: 250,
      sortable: false,

      cellRenderer: ActionRendererComponent,
      cellRendererParams: {
        actions: this.actionColumns,
        clicked: (data: any, action: string) => {
          this.emitRowAction(data, action, this.gridApi);
        }
      },
    }

    // show select and actions icon
    if (this.rowSelection?.length && this.actionColumns?.length) {
      this.displayedColumns = [selectColumn,actionsColumn, ...this.tableColumns];
    }
    // show select only
    else if (this.rowSelection?.length) {
      this.displayedColumns = [selectColumn, ...this.tableColumns];
    }
    // show actions only
    else if (this.actionColumns?.length) {
      this.displayedColumns = [actionsColumn,...this.tableColumns];
    }
    // show columns only
    else {
      this.displayedColumns = this.tableColumns;
    }
  }

  setTableDataSource(data: any) {
    this.tableDataSource = data;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridReady.emit(params);
  }

  applyFilter() {
    this.gridApi.setQuickFilter(this.searchText);
  }

  toggleSelectedRow(event: SelectionChangedEvent) {
    let selectedNodes = event.api.getSelectedNodes();
    let selectedRows: Array<any> = [];
    selectedNodes.forEach(element => {
      selectedRows.push(element.data);
    });
    this.selectedRows.emit(selectedRows);
  }

  emitRowAction(row: any, action: string, gridApi: any) {
    this.rowAction.emit({ row, action, gridApi });
  }

  emitActionButton(action: string) {
    this.actionButton.emit(action);
  }

}
