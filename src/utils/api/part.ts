import {useFetch} from "../react-query";
import {apiRoutes} from "../routes";
import {UseQueryResult} from "react-query";
import {pathToUrl} from "../router";
import {ApiResponse} from "../../type/ApiResponse";
import {PartRequest} from "../../type/result/part/PartRequest";
import {Part} from "../../type/result/part/Part";
import {globalConfig} from "../config";

const key: string = 'partDataGrid';

export const useGetParts = (params: PartRequest, isRequest: boolean) => {
    const context: UseQueryResult<ApiResponse<Part>, Error> = useFetch<ApiResponse<Part>>(
        key,
        isRequest ? `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.part)}` : null,
        params,
        { retry: false, keepPreviousData: true,  }
    );
    return { ...context, data: context.data?.content, totalElements: context.data?.totalElements };
};