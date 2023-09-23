import React, {useEffect, useMemo, useState} from 'react';
import {MaterialReactTable, type MRT_ColumnDef,MRT_Row} from 'material-react-table';
import {Box, IconButton, Tooltip} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import {Reference} from "../type/reference/Reference";
import {
    Delete,
    Edit as EditIcon
} from '@mui/icons-material';
import Button from "@mui/material/Button";
import {DataGridReferenceService} from "../service/datagrid/DataGridReferenceService";
import {useDeleteReference, useGetReferences} from "../utils/api/reference";
import {UpdateReferenceDialog} from "../component/reference/UpdateReferenceDialog";
import {NewReferenceDialog} from "../component/reference/NewReferenceDialog";
import {MRT_Localization_RU} from "material-react-table/locales/ru";
import {StoreService} from "../service/StoreService";
import {useGetProfile} from "../utils/api/auth";
import {observer} from "mobx-react-lite";
import {ToastContainer} from "react-toastify";
import {DeleteDialog} from "../component/main/DeleteDialog";
import {useTemplateDataGrid} from "../hook/useTemplateDataGrid";

const helperReference = new DataGridReferenceService();
const References = observer(() => {
    const {columnFilters, setColumnFilters, sorting,
        setSorting, pagination, setPagination}
        = useTemplateDataGrid("/reference");
    const {data: user} = useGetProfile();
    const modelDescription = columnFilters?.find(item => item.id === 'modelDescription');
    const [updateReference, setUpdateReference] = useState(false);
    const [addReference, setAddReference] = useState(false);
    const [selectedReferenceRow, setSelectedReferenceRow] = useState<MRT_Row<Reference>>();
    const [deleteReference, setDeleteReference] = useState(false);
    const paramsRequest = helperReference.createParams(modelDescription, pagination);

    const mutationDelete = useDeleteReference(paramsRequest,
            (oldData, id) => {
                oldData.content = oldData.content?.filter((item) => item.id !== id) ?? null;
                return oldData;
                });

    const onDelete = (idReference: number) => {
        mutationDelete.mutate(idReference);
    }

    useEffect(() => {
        StoreService.addData("/references", {
            columnFilters,
            sorting,
            pagination
        })
    }, [columnFilters, sorting, pagination]);

    const { data,
        totalElements,
        isError: isErrorGetList,
        isFetching,
        isLoading,
        refetch } = useGetReferences(paramsRequest);

    const columns = useMemo<MRT_ColumnDef<Reference>[]>(
        () => [
            {
                accessorKey: 'modelDescription',
                header: 'Название типа',
            },
            {
                accessorKey: 'dataRecordNumber',
                header: 'Номер детали',
                enableColumnFilter: false
            },
            {
                accessorKey: 'partTypeId',
                header: 'Идентификатор детали',
                enableColumnFilter: false
            },
            {
                accessorKey: 'user.name',
                header: 'Автор',
                enableColumnFilter: false
            },
            {
                accessorKey: 'changeTime',
                header: 'Дата изменения',
                enableColumnFilter: false
            },
        ],
        [],
    );

    return (
        <>
            <ToastContainer />
            <MaterialReactTable
                key={"referenceMaterialReactTable"}
                columns={columns}
                data={data ?? []}
                initialState={{ showColumnFilters: true }}
                enableRowActions
                manualFiltering
                manualPagination
                positionActionsColumn="last"
                localization={MRT_Localization_RU}
                enableEditing={user?.role?.roleName === 'admin' ?? false}
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
                renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                        {user?.role?.roleName === 'ROLE_admin' &&
                            <Tooltip arrow placement="right" title="Редактировать">
                                <IconButton
                                    color="secondary"
                                    onClick={() => {
                                        setUpdateReference(true);
                                        setSelectedReferenceRow(row);
                                    }}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        {user?.role?.roleName === 'ROLE_admin' &&
                            <Tooltip arrow placement="right" title="Удалить">
                                <IconButton color="error" onClick={() => {
                                    setSelectedReferenceRow(row);
                                    setDeleteReference(true);
                                }}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        }
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <Box sx={{display: 'flex', columnGap: '1em'}}>
                        <Tooltip arrow title="Обновить данные">
                            <IconButton onClick={() => refetch()}>
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                        {user?.role?.roleName === 'ROLE_admin' &&
                            <Button color="secondary" onClick={() => setAddReference(true)}  variant="contained">
                                Добавить тип
                            </Button>
                        }
                    </Box>
                )}
                rowCount={totalElements ?? 500000}
                state={{
                    columnFilters,
                    isLoading,
                    pagination,
                    showAlertBanner: isErrorGetList,
                    showProgressBars: isFetching,
                    sorting,}}
            />
            {updateReference && user?.role?.roleName === 'ROLE_admin' && <UpdateReferenceDialog
                modalProps={helperReference.createModalProps(
                    setUpdateReference,
                    setSelectedReferenceRow,
                    updateReference,
                    "Изменить тип")}
                paramsRequest={paramsRequest}
                row={selectedReferenceRow}/>
            }
            {addReference && user?.role?.roleName === 'ROLE_admin' && <NewReferenceDialog
                modalProps={helperReference.createModalProps(
                    setAddReference,
                    setSelectedReferenceRow,
                    addReference,
                    "Добавить тип")}
                paramsRequest={paramsRequest}/>
            }
            {deleteReference && user?.role?.roleName === 'ROLE_admin' && <DeleteDialog
                modalProps={helperReference.createModalProps(setDeleteReference, setSelectedReferenceRow, deleteReference,
                    "Удаление типа")}
                message={`Вы уверены, что хотите удалить тип: ${selectedReferenceRow?.original?.modelDescription}?`}
                onAction={onDelete}
                idNumber={selectedReferenceRow?.original?.id ?? -1}/>
            }
        </>
    );
});

export default References;