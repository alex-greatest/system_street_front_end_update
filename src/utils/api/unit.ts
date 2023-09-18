import {UseQueryResult} from "react-query";
import {Unit} from "../../type/recipe/Unit";
import {useFetch} from "../react-query";
import {pathToUrl} from "../router";
import {apiRoutes} from "../routes";
import {globalConfig} from "../config";

export const useGetUnits = () => {
    const context: UseQueryResult<Unit[], Error> = useFetch<Unit[]>(
        'getUnitsListDataGrid',
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.getUnit)}`,
        undefined,
        { retry: false, keepPreviousData: true, staleTime: Infinity }
    );
    return { ...context, data: context.data };
}