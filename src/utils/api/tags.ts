import {useDelete, useFetch, usePost, useUpdate} from "../react-query";
import {UseQueryResult} from "react-query";
import {pathToUrl} from "../router";
import {messageSuccess} from "../message-success";
import {TagsSimple} from "../../type/tag/TagsSimple";
import {ReferenceTags} from "../../type/tag/ReferenceTags";
import {globalConfig} from "../config";

export const useGetTags = (id: number, pathPage: string, key: string) => {
    const context: UseQueryResult<ReferenceTags[], Error> = useFetch<ReferenceTags[]>(
        key,
        id !== -1 ? `${globalConfig.config.apiUrl}${pathToUrl(pathPage)}` : null,
        {referenceId: id},
        { retry: false, keepPreviousData: true,  }
    );
    return { ...context, data: context.data };
};

export const useUpdateRecipe = (
    id: number,
    referenceId: number,
    key: string,
    pathPage: string,
    updater?: ((oldData: ReferenceTags[], newData: ReferenceTags) => ReferenceTags[]) | undefined) =>
    useUpdate<ReferenceTags[], ReferenceTags>(
        key,
        `${globalConfig.config.apiUrl}${pathToUrl(pathPage, {id})}`,
        true,
        messageSuccess<ReferenceTags>(
            (referenceRecipe) => `Тег ${referenceRecipe.tags.pathTag} обновлен`,
            `Тег обновлен`),
        {referenceId: referenceId},
        updater);


export const useAddRecipe = (
    params: object,
    key: string,
    pathPage: string,
    updater?: ((oldData: ReferenceTags[], newData: TagsSimple) => ReferenceTags[]) | undefined) =>
    usePost<ReferenceTags[], TagsSimple>(
        key,
        `${globalConfig.config.apiUrl}${pathToUrl(pathPage)}`,
        true,
        messageSuccess<ReferenceTags>(
            (referenceRecipe) => `Тег ${referenceRecipe.tags.pathTag} добавлен`,
            `Тег добавлен`),
        params,
        updater);

export const useDeleteRecipe = (
    params: object,
    key: string,
    pathPage: string,
    updater: (
        oldData: ReferenceTags[],
        deletedId: string | number
    ) => ReferenceTags[]
) => {
    return useDelete<ReferenceTags[]>(
        key,
        `${globalConfig.config.apiUrl}${pathToUrl(pathPage)}`,
        true,
        messageSuccess<ReferenceTags>(
            (referenceRecipe) => `Тег ${referenceRecipe.tags.pathTag} удалён`,
            `Тег удален`),
        params,
        updater);
};