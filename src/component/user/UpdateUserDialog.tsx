import React from 'react';
import {User} from "../../type/user/User";
import {ModalAddAndUpdate} from "../../type/template-data-grid/ModalAddAndUpdate";
import {UserRequest} from "../../type/user/UserRequest";
import {DialogUserTemplate} from "./DialogUserTemplate";
import {MRT_Row} from "material-react-table";
import {Role} from "../../type/user/Role";
import {useUpdateUser} from "../../utils/api/user";
import {ApiResponse} from "../../type/ApiResponse";

export const UpdateUserDialog = (
    {modalProps, paramsRequest, row, roles}: {
        modalProps: ModalAddAndUpdate,
        paramsRequest: UserRequest,
        row: MRT_Row<User>|undefined,
        roles: Role[]|undefined
    }) => {
    const user = {...row?.original ?? {id: -1, name: "", role: {id: 1, roleName: ""}}};

    const userUpdate= useUpdateUser(
        user.id,
        paramsRequest,
        (oldData, newData: User): ApiResponse<User> =>
        {
            oldData.content = oldData.content?.map(u => u.id === newData.id ? newData : u) ?? null;
            return oldData;
        });

    return (
        <DialogUserTemplate modalProps={modalProps}
                            rolesList={roles}
                            paramsRequest={paramsRequest}
                            mutationFunc={userUpdate}
                            user={user} />
    );
}