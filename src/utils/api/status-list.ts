import {useFetch} from "../react-query";
import {apiRoutes} from "../routes";
import {UseQueryResult} from "react-query";
import {pathToUrl} from "../router";
import {StatusOperation} from "../../type/result/StatusOperation";
import {globalConfig} from "../config";

export const useGetStatusList = () => {
    const context: UseQueryResult<StatusOperation[], Error> = useFetch<StatusOperation[]>(
        'getStatusOperationsDataGrid',
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.getOperationList)}`,
        undefined,
        { retry: false, keepPreviousData: true, staleTime: Infinity }
    );
    return { ...context, data: context.data };
}