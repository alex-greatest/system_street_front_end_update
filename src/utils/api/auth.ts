import axios, {AxiosResponse} from "axios";
import {Tokens} from "../../type/login/Tokens";
import {TokenService} from "../../service/login/TokenService"
import {Token} from "../../type/login/Token";
import {apiRoutes} from "../routes";
import {User} from "../../type/user/User";
import {UseQueryResult} from "react-query";
import {useFetch} from "../react-query";
import {globalConfig} from "../config";

export async function login(userName: string, password: string): Promise<AxiosResponse<Tokens>> {
    return axios.post(`${globalConfig.config.apiUrl}${apiRoutes.getTokenByPassword}`, {}, {
        auth: {
            username: userName,
            password: password
        }
    });
}

export const useGetProfile = ()=> {
    const context: UseQueryResult<User, Error> = useFetch<User>(
        "getProfile",
        TokenService.getToken() ? `${globalConfig.config.apiUrl}${apiRoutes.getProfile}` : null,
        undefined,
        { retry: false, staleTime: Infinity }
    );
    return { ...context, data: context.data };
};

export async function checkAuth(): Promise<AxiosResponse<Token>> {
    const refreshToken: Token = {
        token: TokenService.getRefreshToken()
    }
    return axios.post(`${globalConfig.config.apiUrl}${apiRoutes.getTokenByRefresh}`, JSON.stringify(refreshToken), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}
