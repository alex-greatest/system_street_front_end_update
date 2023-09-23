import  {useMemo, useState} from "react";
import {MRT_ColumnFiltersState, MRT_PaginationState} from "material-react-table";
import {DataGridPartService} from "../../../service/datagrid/DataGridPartService";
import {PartHook} from "../../../type/template-data-grid/hook/PartHook";
import dayjs from "dayjs";

const partService = new DataGridPartService();

export const useCreatePartVar = (columnFilters: MRT_ColumnFiltersState, pagination: MRT_PaginationState):
    PartHook => {
    const [startTime, setStartTime] = useState(dayjs().startOf('day'));
    const [endTime, setEndTime] = useState(dayjs().endOf('day'));
    const memorySetStartTime = useMemo(() => setStartTime, [setStartTime]);
    const memoryStartTime = useMemo(() => startTime, [startTime]);
    const memorySetEndTime = useMemo(() => setEndTime, [setEndTime]);
    const memoryEndTime = useMemo(() => endTime, [endTime]);
    const statusFiler = columnFilters?.find(item => item.id === 'status.statusName');
    const referenceFilter = columnFilters?.find(item => item.id === 'reference.modelDescription');
    const paramsRequest = partService.createParams(
        dayjs(memoryStartTime).toISOString(),
        dayjs(memoryEndTime).toISOString(),
        referenceFilter,
        statusFiler, pagination);

    return {
        startTime: memoryStartTime,
        endTime: memoryEndTime,
        setStartTime: memorySetStartTime,
        setEndTime: memorySetEndTime,
        paramRequest: paramsRequest
    }
};
