import {globalConfig} from "./config";

export const axiosApi = {
  get: <T>(url: string, params?: object) =>
      globalConfig.getApiRequest().get<T>(url, {...params,}),
  post: <T>(url: string, data: any) =>
      globalConfig.getApiRequest().post<T>(url, data, {}),
  put: <T>(url: string, data: any) =>
      globalConfig.getApiRequest().put<T>(url, data, {}),
  patch: <T>(url: string, data: any) =>
      globalConfig.getApiRequest().patch<T>(url, data, {}),
  delete: <T>(url: string) =>
      globalConfig.getApiRequest().delete<T>(url, {}),
};
