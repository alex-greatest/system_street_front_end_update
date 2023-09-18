import React, {useEffect, useState} from 'react';
import {MaterialReactTable} from 'material-react-table';
import {
    Box,
    IconButton,
    Tooltip,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import {MRT_Localization_RU} from "material-react-table/locales/ru";
import {StoreService} from "../service/StoreService";
import {ITemplateDataGrid} from "../type/template-data-grid/ITemplateDataGrid";
import {DataTimeComponent} from "../component/result/DateTimeComponent";
import {useCreateColumnPart} from "../hook/result/part/useCreateColumnPart";
import {useGetParts} from "../utils/api/part";
import {useCreateSelectStatusList} from "../hook/result/useCreateSelectStatusList";
import {useCreatePartVar} from "../hook/result/part/useCreatePartVar";
import {useCreateSelectModelDescription} from "../hook/result/part/useCreateSelectModelDescription";
import {useNavigate} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {HelpDownloadFileCsv} from "../service/file/HelpDownloadFileCsv";
import Button from "@mui/material/Button";
import {observer} from "mobx-react-lite";
import {ToastContainer} from "react-toastify";


const helpDownloadFileCsv = new HelpDownloadFileCsv();

export const Parts = observer((props: {mainProps: ITemplateDataGrid}) => {
    const {columnFilters, setColumnFilters, sorting,
        setSorting, pagination, setPagination}
        = props.mainProps;
    const {
        startTime,
        endTime,
        setStartTime,
        setEndTime,
        paramRequest} = useCreatePartVar(columnFilters, pagination)
    const statusOperationsListName = useCreateSelectStatusList();
    const modelDescriptionList = useCreateSelectModelDescription();
    const navigate = useNavigate();
    const [disableDownLoadCsvOperation, setDisableDownLoadCsvOperation] =
        useState(false);
    const [disableDownLoadCsvPart, setdisableDownLoadCsvPart] =
        useState(false);

    const { data,
        totalElements,
        isError: isErrorGetList,
        isFetching,
        isLoading,
        refetch } = useGetParts(paramRequest, true);

    useEffect(() => {
        if(statusOperationsListName && modelDescriptionList) {
            StoreService.addData("/parts", {
                columnFilters,
                sorting,
                pagination,
                startTime,
                endTime
            });
        }
    }, [columnFilters, endTime, modelDescriptionList, pagination, sorting, startTime, statusOperationsListName]);

    const onSubmitDownloadCsvOperation = async (partId: number) => {
        await helpDownloadFileCsv.DownloadFileCsv(partId,
            setDisableDownLoadCsvOperation,
            "toastDownLoadCsvOperations");
    }

    const onSubmitDownloadCsvParts = async () => {
        await helpDownloadFileCsv.DownloadFileCsvParts(paramRequest,
            setdisableDownLoadCsvPart,
            "toastDownLoadCsvPartsList");
    }

    return (
        <>
            <ToastContainer />
            <DataTimeComponent
                startTime={startTime}
                endTime={endTime}
                setEndTime={setEndTime}
                setStartTime={setStartTime}/>
            <MaterialReactTable
                key={"operationsMaterialReactTable"}
                columns={useCreateColumnPart(statusOperationsListName, modelDescriptionList)}
                data={data ?? []}
                initialState={{ showColumnFilters: true }}
                manualPagination
                manualFiltering
                enableRowActions
                positionActionsColumn="last"
                localization={MRT_Localization_RU}
                muiToolbarAlertBannerProps={
                    isErrorGetList
                        ? {
                            color: 'error',
                            children: 'Ошибка зарузки данных',
                        }
                        : undefined
                }
                muiTablePaginationProps={{
                    rowsPerPageOptions: [10, 15, 20]
                }}
                onColumnFiltersChange={setColumnFilters}
                onSortingChange={setSorting}
                onPaginationChange={setPagination}
                renderTopToolbarCustomActions={() => (
                    <Box sx={{display: 'flex', columnGap: '1em'}}>
                        <Tooltip arrow title="Обновить данные">
                            <IconButton onClick={() => refetch()}>
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                        {(data?.length ?? 0) > 0 &&
                            <Button
                                color="primary"
                                startIcon={<FileDownloadIcon />}
                                disabled={disableDownLoadCsvPart}
                                onClick={() => onSubmitDownloadCsvParts()}
                                variant="contained">
                                Экспорт списка деталей
                            </Button>}
                    </Box>
                )}
                renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px', width: '100%' }}>
                        <Tooltip arrow placement="right" title="Просмотр результатов">
                            <IconButton
                                key={`ResultOperationsShow${row.original.id}`}
                                color="secondary"
                                onClick={() => {
                                    navigate(
                                        '/operations',
                                        { state: {
                                                    partNameParams: row?.original?.partName ?? "",
                                                    modelDescriptionParams: row?.original?.reference?.modelDescription ?? ""
                                                }})
                                }}>
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Экспорт результатов">
                            <IconButton
                                disabled={disableDownLoadCsvOperation}
                                key={`ResultOperationsExportCsv${row.original.id}`}
                                color="secondary"
                                onClick={() => {
                                    onSubmitDownloadCsvOperation(row?.original?.id ?? 0).then(r => {})
                                }}>
                                <FileDownloadIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
                rowCount={totalElements ?? 1}
                state={{
                    columnFilters,
                    isLoading,
                    pagination,
                    showAlertBanner: isErrorGetList,
                    showProgressBars: isFetching,
                    sorting}}
            />
        </>
    );
});