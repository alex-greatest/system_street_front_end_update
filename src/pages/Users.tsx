import React, {useEffect, useMemo, useState} from 'react';
import {
    MaterialReactTable, type MRT_ColumnDef, MRT_Row,
} from 'material-react-table';
import {Box, IconButton, Tooltip} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import {useDeleteUser, useGetList, useGetRoles} from "../utils/api/user";
import {User} from "../type/user/User";
import {
    Delete,
    Edit as EditIcon,
    Password as PasswordIcon,
    QrCode as QrCodeIcon
} from '@mui/icons-material';
import {UpdateUserDialog} from "../component/user/UpdateUserDialog";
import {DataGridUserService} from "../service/datagrid/DataGridUserService";
import Button from "@mui/material/Button";
import {NewAccountUserDialog} from "../component/user/NewAccountUserDialog";
import {UpdatePassword} from "../component/user/UpdatePassword";
import {MRT_Localization_RU} from "material-react-table/locales/ru";
import {StoreService} from "../service/StoreService";
import {useGetProfile} from "../utils/api/auth";
import {observer} from "mobx-react-lite";
import {ToastContainer} from "react-toastify";
import {useCreateStatusColumn} from "../hook/result/useCreateStatusColumn";
import {StyleColumnDefault} from "../component/template/column/StyleColumnDefault";
import {DeleteDialog} from "../component/main/DeleteDialog";
import {useTemplateDataGrid} from "../hook/useTemplateDataGrid";

const helperUser = new DataGridUserService();

const Users = observer(() => {
    const {columnFilters, setColumnFilters, sorting,
        setSorting, pagination, setPagination}
        = useTemplateDataGrid("/users");
    const {data: user} = useGetProfile();
    const {data: roles} = useGetRoles();
    const dataForStatus =
        useCreateStatusColumn<User>(
            roles?.map(roles => roles.roleName),
            (cell) => <StyleColumnDefault cell={cell} />,'Роль');
    const dataForStatusMemo = useMemo(() => dataForStatus, [dataForStatus]);
    const nameFilter = columnFilters?.find(item => item.id === 'name');
    const roleFilter = columnFilters?.find(item => item.id === 'role.roleName');
    const [updateUser, setUpdateUser] = useState(false);
    const [addUser, setAddUser] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [selectedUserRow, setSelectedUserRow] = useState<MRT_Row<User>>();
    const paramsRequest = helperUser.createParams(nameFilter, roleFilter, pagination);

    const mutationDelete = useDeleteUser(paramsRequest,
            (oldData, id) => {
                oldData.content = oldData.content?.filter((item) => item.id !== id) ?? null;
                return oldData;
                });

    const onDelete = (idUser: number) => {
        mutationDelete.mutate(idUser);
    }

    const { data,
        totalElements,
        isError: isErrorGetList,
        isFetching,
        isLoading,
        refetch } = useGetList(paramsRequest);


    useEffect(() => {
        StoreService.addData("/users", {
            columnFilters,
            sorting,
            pagination
        });
    }, [columnFilters, sorting, pagination]);

    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Имя',
            },
            {
                accessorKey: 'role.roleName',
                ...dataForStatusMemo
            }
        ],
        [dataForStatusMemo],
    );

    return (
        <>
            <ToastContainer />
             <MaterialReactTable
                key={"userMaterialReactTable"}
                columns={columns}
                data={data ?? []}
                initialState={{ showColumnFilters: true }}
                enableRowActions
                manualFiltering
                manualPagination
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
                    rowsPerPageOptions: [10, 15, 20]
                }}
                onColumnFiltersChange={setColumnFilters}
                onSortingChange={setSorting}
                onPaginationChange={setPagination}
                renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                        <Tooltip arrow placement="right" title="Редактировать">
                            <IconButton
                                color="secondary"
                                onClick={() => {
                                    setUpdateUser(true);
                                    setSelectedUserRow(row);
                                }}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        {row?.original?.role.roleName !== 'operator' &&
                            <Tooltip arrow placement="right" title="Изменить пароль">
                                <IconButton color="secondary" onClick={() => {
                                    setChangePassword(true);
                                    setSelectedUserRow(row);
                                }}>
                                    <PasswordIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        <Tooltip arrow placement="right" title="Сгенерировать QR">
                            <IconButton color="secondary" onClick={() => {
                                helperUser.generateQrCode(row?.original?.plcPassword ?? "111",
                                    row?.original?.name ?? "111");
                            }}>
                                <QrCodeIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Удалить">
                            <IconButton color="error" onClick={() => {
                                setDeleteUser(true);
                                setSelectedUserRow(row)
                            }}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
                renderTopToolbarCustomActions={() => (
                    <Box sx={{display: 'flex', columnGap: '1em'}}>
                        <Tooltip arrow title="Обновить данные">
                            <IconButton onClick={() => refetch()}>
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                        <Button color="secondary" onClick={() => setAddUser(true)}  variant="contained">
                            Добавить пользователя
                        </Button>
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
            {updateUser && <UpdateUserDialog
                modalProps={helperUser.createModalProps(setUpdateUser, setSelectedUserRow, updateUser,
                        "Изменить данные")}
                paramsRequest={paramsRequest}
                roles={roles}
                row={selectedUserRow}/>
            }
            {addUser && <NewAccountUserDialog
                modalProps={helperUser.createModalProps(setAddUser, setSelectedUserRow, addUser,
                    "Добавить пользователя")}
                paramsRequest={paramsRequest}
                roles={roles}/>
            }
            {changePassword && <UpdatePassword
                modalProps={helperUser.createModalProps(setChangePassword, setSelectedUserRow, changePassword,
                    "Изменить пароль")}
                paramsRequest={paramsRequest}
                row={selectedUserRow}/>
            }
            {deleteUser && <DeleteDialog
                modalProps={helperUser.createModalProps(setDeleteUser, setSelectedUserRow, deleteUser,
                    "Удаление пользователя")}
                message={`Вы уверены, что хотите удалить пользователя: ${selectedUserRow?.original?.name}?`}
                onAction={onDelete}
                idNumber={selectedUserRow?.original?.id ?? -1}/>
            }
        </>
    );
});

export default Users;