import {useFetch, useUpdate} from "../react-query";
import {apiRoutes} from "../routes";
import {UseQueryResult} from "react-query";
import {pathToUrl} from "../router";
import {messageSuccess} from "../message-success";
import {RecipeGraph} from "../../type/recipe/RecipeGraph";
import {globalConfig} from "../config";

export const useGetRecipeGraph = (id: number, nameGraph: string, key: string) => {
    const context: UseQueryResult<RecipeGraph[], Error> = useFetch<RecipeGraph[]>(
        key,
        id !== -1 ? `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.recipeGraph)}` : null,
        {referenceId: id, nameGraph: nameGraph},
        { retry: false, keepPreviousData: true,  }
    );
    return { ...context, data: context.data };
};

export const useUpdateRecipeGraph = (
    id: number,
    referenceId: number,
    nameGraph: string,
    key: string,
    updater?: ((oldData: RecipeGraph[], newData: RecipeGraph) => RecipeGraph[]) | undefined) =>
    useUpdate<RecipeGraph[], RecipeGraph>(
        key,
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.recipeGraph, {id})}`,
        true,
        messageSuccess<RecipeGraph>(
            (_) => `Координата обновлена`,
            `Координата обновлена`),
        {referenceId: referenceId, nameGraph: nameGraph},
        updater);