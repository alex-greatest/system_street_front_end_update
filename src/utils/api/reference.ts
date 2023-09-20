import {useDelete, useFetch, usePost, useUpdate} from "../react-query";
import {apiRoutes} from "../routes";
import {UseQueryResult} from "react-query";
import {ApiResponse} from "../../type/ApiResponse";
import {pathToUrl} from "../router";
import {messageSuccess} from "../message-success";
import {Reference} from "../../type/reference/Reference";
import {ReferenceForRecipe} from "../../type/reference/ReferenceForRecipe";
import {globalConfig} from "../config";

const key: string = 'referencesDataGrid';

export const useListNameReferences = () => {
    const context: UseQueryResult<ReferenceForRecipe[], Error> = useFetch<ReferenceForRecipe[]>(
        "listNameReferences",
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.referenceListName)}`,
        undefined,
        { retry: false, keepPreviousData: true,  }
    );
    return { ...context, data: context.data };
};

export const useReferenceByPartName = (partName?: string)=> {
    const context: UseQueryResult<ReferenceForRecipe, Error> = useFetch<ReferenceForRecipe>(
        "referenceByPartName",
        partName ? `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.referencePartName)}` : null,
        {partName: partName},
        { retry: false, keepPreviousData: true,  }
    );
    return { ...context, data: context.data };
};

export const useGetReferences = (params: object) => {
    const context: UseQueryResult<ApiResponse<Reference>, Error> = useFetch<ApiResponse<Reference>>(
        key,
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.reference)}`,
        params,
        { retry: false, keepPreviousData: true,  }
    );
    return { ...context, data: context.data?.content, totalElements: context.data?.totalElements };
};
export const useUpdateReference = (
    id: number,
    params: object,
    updater?: ((oldData: ApiResponse<Reference>, newData: Reference) => ApiResponse<Reference>) | undefined) =>
    useUpdate<ApiResponse<Reference>, Reference>(
        key,
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.reference, {id})}`,
        true,
        messageSuccess<Reference>(
            (reference) => `Данные типа ${reference.modelDescription} обновленны`,
            `Данные типа обновленны`),
        params,
        updater);

export const useAddReference = (
    params: object,
    updater?: ((oldData: ApiResponse<Reference>, newData: Reference) => ApiResponse<Reference>) | undefined) =>
    usePost<ApiResponse<Reference>, Reference>(
        key,
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.reference)}`,
        true,
        messageSuccess<Reference>(
            (reference) => `Тип ${reference.modelDescription} добавлен`,
            `Тип добавлен`),
        params,
        updater);

export const useDeleteReference = (
    params: object,
    updater: (
        oldData: ApiResponse<Reference>,
        deletedId: string | number
    ) => ApiResponse<Reference>) => {
    return useDelete<ApiResponse<Reference>>(
        key,
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.reference)}`,
        true,
        messageSuccess<Reference>(
            (reference) => `Тип ${reference.modelDescription} удален`,
            `Тип удален`),
        params,
        updater);
};