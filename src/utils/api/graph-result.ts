import {useFetch} from "../react-query";
import {apiRoutes} from "../routes";
import {UseQueryResult} from "react-query";
import {pathToUrl} from "../router";
import {GraphResultEffortResponse} from "../../type/result/graph-result/GraphResultEffortResponse";
import {GraphResultMomentResponse} from "../../type/result/graph-result/GraphResultMomentResponse";
import {globalConfig} from "../config";

export const useGetGraphResultEffort = (operationId?: number) => {
    const context: UseQueryResult<GraphResultEffortResponse, Error> = useFetch<GraphResultEffortResponse>(
        'graphResultEffort',
        operationId !== -1 ? `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.graphResultEffort)}` : null,
        {operationId: operationId},
        { retry: false, keepPreviousData: true, refetchOnWindowFocus: false, staleTime: Infinity }
    );
    return { ...context, data: context.data };
};

export const useGetGraphResultMoment = (referenceName?: string, operationId?: number) => {
    const context: UseQueryResult<GraphResultMomentResponse, Error> = useFetch<GraphResultMomentResponse>(
        'graphResultMoment',
        operationId !== -1 && referenceName ? `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.graphResultMoment)}` : null,
        {operationId: operationId, referenceName: referenceName},
        { retry: false, keepPreviousData: true, refetchOnWindowFocus: false, staleTime: Infinity }
    );
    return { ...context, data: context.data };
};