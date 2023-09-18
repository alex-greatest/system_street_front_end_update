import {useMemo, useState} from 'react';
import {MainDataGridStorage} from "../type/storage/MainDataGridStorage";
import {StoreService} from "../service/StoreService";
import {MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState} from "material-react-table";

export const useTemplateDataGrid = (keyStorage: string) => {
    const mainDataGridStore: MainDataGridStorage = StoreService.getData(keyStorage);
    const [filterDataGrid, setColumnFilters] =
        useState<MRT_ColumnFiltersState>(mainDataGridStore?.columnFilters ?? [],);
    const [sortingDataGrid, setSorting] =
        useState<MRT_SortingState>(mainDataGridStore?.sorting ?? []);
    const [paginationDataGrid, setPagination] =
        useState<MRT_PaginationState>(mainDataGridStore?.pagination ?? {
            pageIndex: 0,
            pageSize: 10,
        });

    const columnFilters = useMemo(() => filterDataGrid, [filterDataGrid]);
    const sorting = useMemo(() => sortingDataGrid, [sortingDataGrid]);
    const pagination = useMemo(() => paginationDataGrid, [paginationDataGrid]);

    return {
        columnFilters,
        setColumnFilters,
        sorting,
        setSorting,
        pagination,
        setPagination,
    };
};
