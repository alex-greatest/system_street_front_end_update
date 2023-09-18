import React, {useState} from 'react';
import {MaterialReactTable} from 'material-react-table';
import {Box, IconButton, Tooltip} from '@mui/material';
import {
    Delete,
    Edit as EditIcon
} from '@mui/icons-material';
import RefreshIcon from "@mui/icons-material/Refresh";
import {SelectorReference} from "../reference/SelectorReference";
import {UpdateRecipe} from "./UpdateRecipe";
import {DataGridRecipeService} from "../../service/datagrid/DataGridTagsService";
import {MRT_Localization_RU} from "material-react-table/locales/ru";
import {useGetProfile} from "../../utils/api/auth";
import {useCreateSelectTypeOpc} from "../../hook/tags/useCreateSelectTypeOpc";
import {useCreateSelectUnits} from "../../hook/tags/useCreateSelectUnits";
import {AddRecipe} from "./AddRecipe";
import Button from "@mui/material/Button";
import {TagsHook} from "../../type/template-data-grid/hook/TagsHook";
import {observer} from "mobx-react-lite";
import {DeleteDialog} from "../main/DeleteDialog";

const helper = new DataGridRecipeService();

export const TagsTemplate = observer((props: {mainProps: TagsHook}) => {
    const {data: user} = useGetProfile();
    const units = useCreateSelectUnits();
    const typesOpc = useCreateSelectTypeOpc();
    const [deleteTags, setDeleteTags] = useState(false);
    const {
        updateRecipe,
        setUpdateRecipes,
        addRecipe,
        setAddRecipe,
        selectedReferenceRow,
        setSelectedReferenceRow,
        selectReferences,
        setSelectReferences,
        mutationDeleteTags,
        useCreateColumTags,
        pathPage,
        keyQuery,
        data,
        isRecipe,
        isLoading,
        isErrorGetList,
        isFetching,
        refetch} = props.mainProps;

    const isHideAction = (pathTag: string) => {
        return pathTag !== "\"DB_Parameter\".\"Weg\".\"Discret\"" &&
            pathTag !== "\"DB_Measure\".\"Kraft\".\"CW_AVG\"" &&
            pathTag !== "\"DB_Measure\".\"Kraft\".\"CCW_AVG\"";
    }

    const onDelete = (idTag: number) => {
        mutationDeleteTags.mutate(idTag);
    }

    return (
        <>
            <SelectorReference selectReference={selectReferences} setSelectReferences={setSelectReferences} />
            <MaterialReactTable
                columns={useCreateColumTags(typesOpc, units)}
                data={data && selectReferences?.id !== -1 ? data : []}
                initialState={{
                    showColumnFilters: true,
                    columnVisibility: {changeTime: false, 'user.name': false, unit: false}}}
                enableRowActions
                enablePagination={false}
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
                renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                        {isHideAction(row?.original?.tags?.pathTag) &&
                            <Tooltip arrow placement="right" title="Редактировать">
                                <IconButton
                                    color="secondary"
                                    onClick={() => {
                                        setUpdateRecipes(true);
                                        setSelectedReferenceRow(row);
                                    }}>
                                    <EditIcon />
                                </IconButton>
                        </Tooltip>}
                        {isHideAction(row?.original?.tags?.pathTag) && user?.role?.roleName === 'ROLE_admin' &&
                            <Tooltip arrow placement="right" title="Удалить">
                                <IconButton color="error" onClick={() => {
                                    setDeleteTags(true);
                                    setSelectedReferenceRow(row);
                                }}>
                                    <Delete />
                                </IconButton>
                        </Tooltip>}
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <Box sx={{display: 'flex', columnGap: '1em'}}>
                        {selectReferences?.id !== -1 && <Tooltip arrow title="Обновить данные">
                            <IconButton onClick={() => refetch()}>
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>}
                        {user?.role?.roleName === 'ROLE_admin' && selectReferences?.id !== -1 &&
                            <Button color="secondary" onClick={() => setAddRecipe(true)}  variant="contained">
                                Добавить тег
                            </Button>
                        }
                    </Box>
                )}
                rowCount={data?.length}
                state={{
                    isLoading,
                    showAlertBanner: isErrorGetList,
                    showProgressBars: isFetching
                }}
            />
            {updateRecipe && <UpdateRecipe
                modalProps={helper.createModalProps(
                    setUpdateRecipes,
                    setSelectedReferenceRow,
                    updateRecipe,
                    "Изменить тэг")}
                referenceId={selectReferences.id}
                row={selectedReferenceRow} isRecipe={isRecipe}
                keyQuery={keyQuery}
                pathPage={pathPage}
                isShowPathTag={user?.role?.roleName === 'ROLE_admin'}/>
            }
            {addRecipe && user?.role?.roleName === 'ROLE_admin' && <AddRecipe
                modalProps={helper.createModalProps(
                    setAddRecipe,
                    setSelectedReferenceRow,
                    addRecipe,
                    "Добавить тэг")}
                referenceId={selectReferences.id}
                row={selectedReferenceRow}
                keyQuery={keyQuery}
                pathPage={pathPage}/>
            }
            {deleteTags && user?.role?.roleName === 'ROLE_admin' && <DeleteDialog
                modalProps={helper.createModalProps(setDeleteTags, setSelectedReferenceRow, deleteTags,
                    "Удаление тега")}
                message={`Вы уверены, что хотите удалить тег: ${selectedReferenceRow?.original?.tags.pathTag}?`}
                onAction={onDelete}
                idNumber={selectedReferenceRow?.original?.id ?? -1}/>
            }
        </>
    );
});