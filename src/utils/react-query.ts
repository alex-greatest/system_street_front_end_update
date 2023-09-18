import {axiosApi} from "./axios-api";
import {useMutation, useQuery, useQueryClient, UseQueryOptions} from 'react-query';
import {QueryFunctionContext} from "react-query/types/core/types";
import {AxiosError, AxiosResponse} from "axios";
import {NotificationDisplayService} from "../service/NotificationDisplayService";
import {TokenService} from "../service/login/TokenService";

type QueryKeyT = [string, object | undefined];

export const fetcher = async <T>({queryKey, pageParam}: QueryFunctionContext<QueryKeyT>, url: string): Promise<T> => {
  const params = queryKey[1];
  const res = await axiosApi.get<T>(url, {params: {...params, pageParam}});
  return res.data;
};

export const useFetch = <T>(
    key: string,
    url: string|null,
    params?: object,
    config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  return useQuery<T, Error, T, QueryKeyT>(
      [key, params],
      ({queryKey}) =>
          fetcher({meta: undefined, pageParam: undefined, signal: undefined, queryKey}, url!),
      {
        enabled: !!url && !!TokenService.getToken(),
        ...config,
      },
  );
};

const useGenericMutation = <T, S>(
    func: (data: T | S) => Promise<AxiosResponse<S>>,
    key: string,
    isShowError: boolean,
    messageSuccess?: (data: AxiosResponse<any, any>) => string,
    params?: object,
    updater?: (oldData: T, newData: S) => T
) => {
  const queryClient = useQueryClient();
  return useMutation<AxiosResponse, AxiosError, T | S>(func, {
    onMutate: async (data) => {
      await queryClient.cancelQueries([key!, params]);

      const previousData = queryClient.getQueryData([key!, params]);

      queryClient.setQueryData<T>([key!, params], (oldData) => {
        return updater ? updater(oldData!, data as S) : (data as T);
      });

      return previousData;
    },
    onError: (error, _, context) => {
      queryClient.setQueryData([key!, params], context);
      if (isShowError) {
        NotificationDisplayService.showMessageQuery(error, "errorMutate");
      }
    },
    onSuccess: (data) => {
      messageSuccess && NotificationDisplayService.showMessageSuccess(messageSuccess(data));
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries([key!, params]);
    },
  });
};

export const useDelete = <T>(
    key: string,
    url: string,
    isShowError: boolean,
    messageSuccess?: (data: AxiosResponse<any, any>) => string,
    params?: object,
    updater?: (oldData: T, id: string | number) => T) => {
  return useGenericMutation<T, string | number>(
      (id) => axiosApi.delete(`${url}/${id}`),
      key,
      isShowError,
      messageSuccess,
      params,
      updater,
  );
};

export const usePost = <T, S>(
    key: string,
    url: string,
    isShowError: boolean,
    messageSuccess?: (data: AxiosResponse<any, any>) => string,
    params?: object,
    updater?: (oldData: T, newData: S) => T) => {
  return useGenericMutation<T, S>(
      (data) => axiosApi.post<S>(url, data),
      key,
      isShowError,
      messageSuccess,
      params,
      updater,
  );
};

export const usePatch = <T, S>(
    key: string,
    url: string,
    isShowError: boolean,
    messageSuccess?: (data: AxiosResponse<any, any>) => string,
    params?: object,
    updater?: (oldData: T, newData: S) => T
) => {
  return useGenericMutation<T, S>(
      (data) => axiosApi.patch<S>(url, data),
      key,
      isShowError,
      messageSuccess,
      params,
      updater,
  );
};

export const useUpdate = <T, S>(
    key: string,
    url: string,
    isShowError: boolean,
    messageSuccess?: (data: AxiosResponse<any, any>) => string,
    params?: object,
    updater?: (oldData: T, newData: S) => T
) => {
  return useGenericMutation<T, S>(
      (data) => axiosApi.put<S>(url, data),
      key,
      isShowError,
      messageSuccess,
      params,
      updater,
  );
};
