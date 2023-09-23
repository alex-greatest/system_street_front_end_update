import React, {useMemo, useState} from 'react';
import {MaterialReactTable, type MRT_ColumnDef, MRT_Row} from 'material-react-table';
import {Box, IconButton, Tooltip} from '@mui/material';
import {
    Edit as EditIcon
} from '@mui/icons-material';
import {DataGridRecipeGraphService} from "../../service/datagrid/DataGridReсipeGraphService";
import {SelectorReference} from "../reference/SelectorReference";
import {StoreService} from "../../service/StoreService";
import {RecipeGraph} from "../../type/recipe/RecipeGraph";
import {useGetRecipeGraph} from "../../utils/api/recipe-graph";
import {MRT_Localization_RU} from "material-react-table/locales/ru";
import RefreshIcon from "@mui/icons-material/Refresh";
import {UpdateRecipeGraph} from "./UpdateRecipeGraph";
import {useGetProfile} from "../../utils/api/auth";
import {observer} from "mobx-react-lite";

const helper = new DataGridRecipeGraphService();

export const GraphTemplate = observer((props: {
    nameGraph: string,
    keyQuery: string,
    pathPage: string}) => {
    const {nameGraph, keyQuery, pathPage} = props;
    const {data: user} = useGetProfile();
    const selectReferenceStore = StoreService.getData(nameGraph);
    const [updateRecipeGraph, setUpdateRecipeGraph] = useState(false);
    const [selectedReferenceRow, setSelectedReferenceRow] = useState<MRT_Row<RecipeGraph>>();
    const [selectReferences, setSelectReferences] =
        useState(selectReferenceStore?.selectReferences ?? {id: -1, modelDescription: ""});

    const memoSelectReferences =
        useMemo(
            () => selectReferences,
            [selectReferences]);

    const memoSetSelectReferences =
        useMemo(
            () => setSelectReferences,
            [setSelectReferences]);

    const { data,
        isError: isErrorGetList,
        isFetching,
        isLoading,
        refetch } = useGetRecipeGraph(memoSelectReferences.id, nameGraph, keyQuery);

    const columns = useMemo<MRT_ColumnDef<RecipeGraph>[]>(
        () => [
            {
                accessorKey: 'value',
                header: 'Значение координаты',
            },
            {
                accessorKey: 'user.name',
                header: 'Автор',
            },
            {
                accessorKey: 'changeTime',
                header: 'Дата изменения'
            },
        ],
        [],
    );

    return (
        <>
            <SelectorReference selectReference={memoSelectReferences}
                               setSelectReferences={memoSetSelectReferences}
                               pathPage={pathPage}/>
            <MaterialReactTable
                key={`recipeGraphMaterialTable${nameGraph}`}
                columns={columns}
                data={data && selectReferences?.id !== -1 ? data : []}
                enableRowNumbers
                rowNumberMode="original"
                initialState={{showColumnFilters: true}}
                enableRowActions
                enablePagination={false}
                enableSorting={false}
                positionActionsColumn="last"
                enableEditing={user?.role?.roleName === 'admin' ?? false}
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
                    rowsPerPageOptions: [10]
                }}
                renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                        <Tooltip arrow placement="right" title="Редактировать">
                            <IconButton
                                color="secondary"
                                onClick={() => {
                                    setUpdateRecipeGraph(true);
                                    setSelectedReferenceRow(row);
                                }}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <Box sx={{display: 'flex', columnGap: '1em'}}>
                        {selectReferences?.id !== -1 && <Tooltip arrow title="Обновить данные">
                            <IconButton onClick={() => refetch()}>
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>}
                    </Box>
                )}
                rowCount={data?.length}
                state={{
                    isLoading,
                    showAlertBanner: isErrorGetList,
                    showProgressBars: isFetching
                }}
            />
            {updateRecipeGraph && <UpdateRecipeGraph
                modalProps={helper.createModalProps(
                    setUpdateRecipeGraph,
                    setSelectedReferenceRow,
                    updateRecipeGraph,
                    "Изменить координату")}
                referenceId={memoSelectReferences.id}
                row={selectedReferenceRow} nameGraph={props.nameGraph} keyQuery={keyQuery}/>
            }
        </>
    );
});