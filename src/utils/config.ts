import axios, {AxiosInstance} from "axios";

export const pathToProperties = "config.json";

export interface productionConfig {
    apiUrl: string;
    environment: "DEV" | "TST" | "AKC" | "PROD";
}

export const defaultProperties: productionConfig = {
    apiUrl: "http://10.213.210.137:8080",
    environment: "DEV"
}

class GlobalConfig {
    config: productionConfig = defaultProperties;
    notDefinedYet = true;
    _apiRequest: AxiosInstance = axios.create({
        withCredentials: true,
        baseURL: this.config.apiUrl,
    });

    public get(): productionConfig {
        if (this.notDefinedYet) {
            throw new Error("Ошибка при загрузке файла свойств")
        } else {
            return this.config;
        }
    }

    public getApiRequest(): AxiosInstance {
        if (this.notDefinedYet) {
            throw new Error("Ошибка при загрузке файла свойств")
        } else {
            return this._apiRequest;
        }
    }

    public set(value: productionConfig): void {
        if (this.notDefinedYet) {
            this.config = value;
            this._apiRequest = axios.create({
                withCredentials: true,
                baseURL: this.config.apiUrl,
            });
            this.notDefinedYet = false;
        } else {
            throw new Error(
                "Глобальная конфигурация уже загружена."
            );
        }
    }
}

export const globalConfig = new GlobalConfig();