import React, {useMemo, useState} from 'react';
import {MaterialReactTable, MRT_Row} from 'material-react-table';
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
import {useDeleteRecipe, useGetTags} from "../../utils/api/tags";
import {ReferenceTags} from "../../type/tag/ReferenceTags";

const helper = new DataGridRecipeService();
export const TagsTemplate = observer((props: {mainProps: TagsHook}) => {
    const {data: user} = useGetProfile();
    const units = useCreateSelectUnits();
    const typesOpc = useCreateSelectTypeOpc();
    const [selectedReferenceRow, setSelectedReferenceRow] = useState<MRT_Row<ReferenceTags>>()
    const [deleteTags, setDeleteTags] = useState(false);
    const {
        updateRecipe,
        setUpdateRecipes,
        addRecipe,
        setAddRecipe,
        useCreateColumTags,
        pathPage,
        keyQuery,
        isRecipe} = props.mainProps;
    const [selectReferences, setSelectReferences] =
        useState({id: -1, modelDescription: ""});
    const memoSelectReferences = useMemo(() => selectReferences, [selectReferences]);
    const memoSetSelectReferences = useMemo(() => setSelectReferences, [setSelectReferences]);

    const { data,
        isError,
        isLoading,
        refetch } = useGetTags(selectReferences.id, pathPage, keyQuery);

    const isHideAction = (pathTag: string) => {
        return pathTag !== "\"DB_Parameter\".\"Weg\".\"Discret\"" &&
            pathTag !== "\"DB_Measure\".\"Kraft\".\"CW_AVG\"" &&
            pathTag !== "\"DB_Measure\".\"Kraft\".\"CCW_AVG\"";
    }

    const mutationDelete = useDeleteRecipe({referenceId: selectReferences.id},
        keyQuery,
        pathPage,
        (oldData, id) => {
            oldData = oldData?.filter((item) => item.id !== id) ?? null;
            return oldData;
        });

    const onDelete = (idTag: number) => {
        mutationDelete.mutate(idTag);
    }

    return (
        <>
            <SelectorReference
                selectReference={memoSelectReferences}
                pathPage={pathPage}
                setSelectReferences={memoSetSelectReferences} />
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
                    isError
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
                    showAlertBanner: isError,
                    isLoading: isLoading
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