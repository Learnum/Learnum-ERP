import { ColDef } from "ag-grid-community";

export interface TableColumn extends ColDef {
    field: string;
    headerName?: string;
    type?: string;
    sortable?: boolean;
    editable?: boolean;
    maxWidth?: number;
    headerCheckboxSelection?: boolean;
    checkboxSelection?: boolean;
    tooltip?: string;
}


export interface ActionColumn {
    action: string;
    actionPage: string;
    actionIcon?: string;
    actionButtonName?: string;
    buttonClass?: string;
    colorClass?: string;
    tooltip?: string;
}