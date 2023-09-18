import {
    MRT_ColumnFiltersState,
    MRT_PaginationState,
    MRT_SortingState
} from "material-react-table";
import React from "react";

export interface ITemplateDataGrid {
    columnFilters: MRT_ColumnFiltersState;
    setColumnFilters:  React.Dispatch<React.SetStateAction<MRT_ColumnFiltersState>>;
    sorting: MRT_SortingState;
    setSorting: React.Dispatch<React.SetStateAction<MRT_SortingState>>;
    pagination: MRT_PaginationState;
    setPagination: React.Dispatch<React.SetStateAction<MRT_PaginationState>>;
}