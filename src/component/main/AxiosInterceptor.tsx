import React, {ReactNode, useState} from 'react';
import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {TokenService} from "../../service/login/TokenService";
import {Token} from "../../type/login/Token";
import {checkAuth} from "../../utils/api/auth";
import {Loading} from "./Loading";
import {pageRoutes} from "../../utils/routes";
import {observer} from "mobx-react-lite";
import {useStore} from "./RootStoreProvided";
import {StoreService} from "../../service/StoreService";
import {globalConfig} from "../../utils/config";

const AxiosInterceptor = ({children}: {children: ReactNode}): React.JSX.Element | null => {
    const navigate = useNavigate();
    const authStore = useStore().authStore;
    const [isSet, setIsSet] = useState(false);

    useEffect(() => {
        setIsSet(true);

        const isServerNoAccess = (status: number) => {
            if (status !== 0) {
                return;
            }
            redirect();
        };

        const reqInterceptor = (config: InternalAxiosRequestConfig<any>) => {
            if (TokenService.getToken()) {
                config.headers.Authorization = TokenService.getAccessToken();
                return config;
            }
            redirect();
            throw new axios.Cancel("Token");
        };

        const errReqInterceptor = (error: AxiosError) => {
            return Promise.reject(error);
        };

        const resInterceptor = (config: AxiosResponse<any, Error>) => {
            return config;
        };

        const redirect = () => {
            TokenService.removeToken();
            authStore.updateAuth(false);
            StoreService.removeAllData();
            navigate(pageRoutes.auth, {replace: true});
        }

        const errInterceptor = async (error: any) => {
            const originalRequest: any = error.config;
            isServerNoAccess(error?.response?.status ?? 0);
            const isContinue: boolean = error?.response?.status && error.response.status === 401 &&
                error.config && !error.config._isRetry && TokenService.getToken();
            if (isContinue) {
                try {
                    originalRequest._isRetry = true;
                    const response: AxiosResponse<Token> = await checkAuth();
                    TokenService.updateAccessToken(response.data.token);
                    return globalConfig.getApiRequest().request(originalRequest);
                } catch (e) {
                    redirect();
                }
            }
            return Promise.reject(error);
        };

        const interceptorRequest = globalConfig.getApiRequest().interceptors.request.use(reqInterceptor, errReqInterceptor);
        const interceptorResponse = globalConfig.getApiRequest().interceptors.response.use(resInterceptor, errInterceptor);

        return () => {
            globalConfig.getApiRequest().interceptors.request.eject(interceptorRequest);
            globalConfig.getApiRequest().interceptors.response.eject(interceptorResponse);
        };
        // eslint-disable-next-line
    }, []);

    return isSet ? <>{children}</> : <Loading/>;
}

export const ObservedAxios = observer(AxiosInterceptor);