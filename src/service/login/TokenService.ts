import {Tokens} from "../../type/login/Tokens";
import Cookies from "js-cookie";

export class TokenService {
    public static removeToken(): void {
        Cookies.remove('token_rulev_system_GUR');
    }

    public static setToken(tokens: Tokens): void {
        Cookies.set('token_rulev_system_GUR', JSON.stringify(tokens), {sameSite: 'lax'});
    }

    public static getToken(): string|undefined {
        return Cookies.get('token_rulev_system_GUR');
    }

    public static getAccessToken(): string {
        const token: string|undefined = Cookies.get('token_rulev_system_GUR');
        return token ? `Bearer ${JSON.parse(token).accessToken}` : "";
    }

    public static getRefreshToken(): string {
        const token: string|undefined = Cookies.get('token_rulev_system_GUR');
        return token ? JSON.parse(token).refreshToken : "";
    }

    public static updateAccessToken(accessToken: string): void {
        const token: string|undefined = Cookies.get('token_rulev_system_GUR');
        const tokens: Tokens = TokenService.getTokensFromStorage(token);
        tokens.accessToken = accessToken;
        Cookies.set('token_rulev_system_GUR', JSON.stringify(tokens), {sameSite: 'lax'});
    }

    private static getTokensFromStorage(token: string|undefined): Tokens {
        if (!token) {
            return {accessToken: "", refreshToken: ""};
        }
        return JSON.parse(token);
    }
}