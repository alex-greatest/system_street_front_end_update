import React from 'react';
import {User} from "../../type/user/User";
import {ModalAddAndUpdate} from "../../type/template-data-grid/ModalAddAndUpdate";
import {UserRequest} from "../../type/user/UserRequest";
import {DialogUserTemplate} from "./DialogUserTemplate";
import {Role} from "../../type/user/Role";
import {useAddUser} from "../../utils/api/user";
import {ApiResponse} from "../../type/ApiResponse";
import {UserLayoutPassword} from "./UserLayoutPassword";

export const NewAccountUserDialog = (
    {modalProps, paramsRequest, roles}: {
        modalProps: ModalAddAndUpdate,
        paramsRequest: UserRequest,
        roles: Role[] | undefined
    }) => {
    const user = {
        id: -1,
        name: "",
        role: {id: 1, roleName: roles?.at(0)?.roleName ?? ""},
        password: "",
        confirmPassword: ""
    };
    const userAdd = useAddUser(
        paramsRequest,
        (oldData, newData: User): ApiResponse<User> => {
            const userForShow = {...newData};
            userForShow.password = "";
            userForShow.confirmPassword = "";
            oldData.content = [...oldData.content, newData];
            return oldData;
        });

    return (
        <DialogUserTemplate modalProps={modalProps}
                            rolesList={roles}
                            paramsRequest={paramsRequest}
                            mutationFunc={userAdd}
                            user={user}
                            children={(control,
                                       errors,
                                       getValues) =>
                                <UserLayoutPassword getValues={getValues} control={control} errors={errors}/>}
        />
    );
}
