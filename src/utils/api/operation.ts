import {useFetch} from "../react-query";
import {apiRoutes} from "../routes";
import {UseQueryResult} from "react-query";
import {pathToUrl} from "../router";
import {ApiResponse} from "../../type/ApiResponse";
import {OperationRequest} from "../../type/result/operation/OperationRequest";
import {Operation} from "../../type/result/operation/Operation";
import {globalConfig} from "../config";

const key: string = 'operationsDataGrid';

export const useGetOperations = (params: OperationRequest) => {
    const context: UseQueryResult<ApiResponse<Operation>, Error> = useFetch<ApiResponse<Operation>>(
        key,
        params.partName ? `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.operation)}` : null,
        params,
        { retry: false, keepPreviousData: true,  }
    );
    return { ...context, data: context.data?.content, totalElements: context.data?.totalElements };
};
