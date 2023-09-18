import {useFetch} from "../react-query";
import {apiRoutes} from "../routes";
import {UseQueryResult} from "react-query";
import {pathToUrl} from "../router";
import {OperationResult} from "../../type/result/operation-result/OperationResult";
import {globalConfig} from "../config";

const key: string = 'operationResultDataGrid';

export const useGetOperationResult = (operationId: number) => {
    const context: UseQueryResult<OperationResult[], Error> = useFetch<OperationResult[]>(
        key,
        operationId !== -1 ? `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.operationResults)}` : null,
        {operationId: operationId},
        { retry: false, keepPreviousData: true, staleTime: Infinity }
    );
    return { ...context, data: context.data};
};
