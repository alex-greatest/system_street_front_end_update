import {UseQueryResult} from "react-query";
import {Unit} from "../../type/recipe/Unit";
import {useFetch} from "../react-query";
import {pathToUrl} from "../router";
import {apiRoutes} from "../routes";
import {globalConfig} from "../config";

export const useGetTypesOpc = () => {
    const context: UseQueryResult<Unit[], Error> = useFetch<Unit[]>(
        'getTypeOpcListDataGrid',
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.getTypeOpc)}`,
        undefined,
        { retry: false, keepPreviousData: true, staleTime: Infinity }
    );
    return { ...context, data: context.data };
}