import {Tokens} from "../../type/login/Tokens";
import Cookies from "js-cookie";

export class TokenService {
    public static removeToken(): void {
        Cookies.remove('token');
    }

    public static setToken(tokens: Tokens): void {
        Cookies.set('token', JSON.stringify(tokens), {sameSite: 'lax'});
    }

    public static getToken(): string|undefined {
        return Cookies.get('token');
    }

    public static getAccessToken(): string {
        const token: string|undefined = Cookies.get('token');
        return token ? `Bearer ${JSON.parse(token).accessToken}` : "";
    }

    public static getRefreshToken(): string {
        const token: string|undefined = Cookies.get('token');
        return token ? JSON.parse(token).refreshToken : "";
    }

    public static updateAccessToken(accessToken: string): void {
        const token: string|undefined = Cookies.get('token');
        const tokens: Tokens = TokenService.getTokensFromStorage(token);
        tokens.accessToken = accessToken;
        Cookies.set('token', JSON.stringify(tokens));
    }

    private static getTokensFromStorage(token: string|undefined): Tokens {
        if (!token) {
            return {accessToken: "", refreshToken: ""};
        }
        return JSON.parse(token);
    }
}