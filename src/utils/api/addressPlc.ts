import {useFetch, useUpdate} from "../react-query";
import {apiRoutes} from "../routes";
import {UseQueryResult} from "react-query";
import {pathToUrl} from "../router";
import {AddressPlc} from "../../type/AddressPlc";
import {globalConfig} from "../config";

const key: string = 'addressPlcRequest';

export const useAddressPlc = () => {
    const context: UseQueryResult<AddressPlc, Error> = useFetch<AddressPlc>(
        key,
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.addressPlc)}`,
        undefined,
        { retry: false, keepPreviousData: true }
    );
    return { ...context, data: context.data };
}

export const useUpdateAddressPlc = (
    id: number,
    params: object,
    updater?: ((oldData: AddressPlc, newData: AddressPlc) => AddressPlc) | undefined) =>
    useUpdate<AddressPlc, AddressPlc>(
        key,
        `${globalConfig.config.apiUrl}${pathToUrl(apiRoutes.addressPlc, {id})}`,
        false,
        undefined,
        params,
        updater);