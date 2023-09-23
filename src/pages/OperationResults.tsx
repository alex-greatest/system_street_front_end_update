import React, {useEffect} from 'react';
import {MaterialReactTable} from 'material-react-table';
import {MRT_Localization_RU} from "material-react-table/locales/ru";
import {useGetOperationResult} from "../utils/api/operation-result";
import {useSearchParams} from "react-router-dom";
import {useCreateColumnOperationResults} from "../hook/result/operation-result/useCreateColumnOperationResults";
import {StoreService} from "../service/StoreService";
import {Fab, Stack} from "@mui/material";
import {observer} from "mobx-react-lite";
import {ToastContainer} from "react-toastify";
import {OutputDetailOperation} from "../component/result/OutputDetailOperation";
import {ScrollTop} from "../component/main/ScrollToTop";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const OperationsResults = observer(() => {
    const [searchParams,] = useSearchParams();
    const operationId = searchParams.get("operationId") ?? -1;
    const partName = StoreService.getData(`/operation_results/${operationId}`)?.partName ?? "";
    const date = StoreService.getData(`/operation_results/${operationId}`)?.date ?? new Date();
    const modelDescription = StoreService.getData(`/operation_results/${operationId}`)?.modelDescription ?? "";

    useEffect(() => {
        const partNameFromLocalStorage = StoreService.getDataLocal(`/operation_results/${operationId}`)?.partName ?? "" as string;
        if (partNameFromLocalStorage && partNameFromLocalStorage.length > 0) {
            StoreService.addData(`/operation_results/${operationId}`, {
                partName: partNameFromLocalStorage,
                date: StoreService.getDataLocal(`/operation_results/${operationId}`)?.date ?? new Date(),
                modelDescription: StoreService.getDataLocal(`/operation_results/${operationId}`)?.modelDescription ?? ""
            });
            StoreService.removeDataLocal(`/operation_results/${operationId}`);
        }
    }, [operationId]);

    const {
        data,
        isError: isErrorGetList,
        isFetching,
        isLoading} = useGetOperationResult(isNaN(+operationId) ? -1 : +operationId);

    return (
        <>
            <ToastContainer />
            <Stack sx={{width: '100%', alignItems: 'center'}}>
                <OutputDetailOperation id="back-to-top-anchor" date={date} partName={partName} modelDescription={modelDescription}/>
                <MaterialReactTable
                    key={"operationResultsMaterialReactTable"}
                    muiTablePaperProps={{
                        sx: {
                            width: '80%'
                        },
                    }}
                    columns={useCreateColumnOperationResults()}
                    data={data ?? []}
                    enablePagination={false}
                    enableColumnFilters={false}
                    enableGlobalFilter={false}
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
                    rowCount={data?.length}
                    state={{
                        isLoading,
                        showAlertBanner: isErrorGetList,
                        showProgressBars: isFetching}}
                    />
            </Stack>
            <ScrollTop>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </>
    );
})

export default OperationsResults;
