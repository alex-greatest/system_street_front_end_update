import {
    MRT_ColumnFiltersState,
    MRT_PaginationState,
    MRT_SortingState
} from "material-react-table";

export interface MainDataGridStorage {
    columnFilters: MRT_ColumnFiltersState;
    sorting: MRT_SortingState;
    pagination: MRT_PaginationState;
}