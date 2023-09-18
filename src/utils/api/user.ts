import {useDelete, useFetch, usePatch, usePost, useUpdate} from "../react-query";
import {apiRoutes} from "../routes";
import {UseQueryResult} from "react-query";
import {ApiResponse} from "../../type/ApiResponse";
import {User} from "../../type/user/User";
import {pathToUrl} from "../router";
import {Role} from "../../type/user/Role";
import {messageSuccess} from "../message-success";
import {globalConfig} from "../config";

const key: string = 'usersDataGrid';

export const useGetList = (params: object) => {
    const context: UseQueryResult<ApiResponse<User>, Error> = useFetch<ApiResponse<User>>(
        key,
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.user)}`,
        params,
        { retry: false, keepPreviousData: true }
    );
    return { ...context, data: context.data?.content, totalElements: context.data?.totalElements };
};

export const useGetRoles = () => {
    const context: UseQueryResult<Role[], Error> = useFetch<Role[]>(
        'getRolesDataGrid',
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.getRolesList)}`,
        undefined,
        { retry: false, keepPreviousData: true, staleTime: Infinity }
    );
    return { ...context, data: context.data };
}

export const useUpdateUser = (
    id: number,
    params: object,
    updater?: ((oldData: ApiResponse<User>, newData: User) => ApiResponse<User>) | undefined) =>
    useUpdate<ApiResponse<User>, User>(
        key,
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.user, {id})}`,
        true,
        messageSuccess<User>(
            (user) => `Данные пользователя ${user.name} обновленны`,
            `Данные пользователя обновленны`),
        params,
        updater);

export const usePatchUser = (
    id: number,
    params: object,
    updater?: ((oldData: ApiResponse<User>, newData: User) => ApiResponse<User>) | undefined) =>
    usePatch<ApiResponse<User>, User>(
        key,
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.user, {id})}`,
        true,
        messageSuccess<User>(
            (user) => `Пароль пользователя ${user.name} обновлён`,
            `Пароль пользователя обновлён`),
        params,
        updater);

export const useAddUser = (
    params: object,
    updater?: ((oldData: ApiResponse<User>, newData: User) => ApiResponse<User>) | undefined) =>
    usePost<ApiResponse<User>, User>(
        key,
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.user)}`,
        true,
        messageSuccess<User>(
            (user) => `Пользователь ${user.name} добавлен`,
            `Пользователь добавлен`),
        params,
        updater);

export const useDeleteUser = (
    params: object,
    updater: (
        oldData: ApiResponse<User>,
        deletedId: string | number
    ) => ApiResponse<User>
) => {
    return useDelete<ApiResponse<User>>(
        key,
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.user)}`,
        true,
        messageSuccess<User>(
            (user) => `Пользователь ${user.name} удален`,
            `Пользователь удален`),
        params,
        updater);
};