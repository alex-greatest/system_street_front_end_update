import {AxiosResponse} from "axios";

export const messageSuccess = <T>(message: (user: T) => string, defaultMessage: string) => {
    return (data: AxiosResponse<any, any>) => {
        const responseData = data?.data ?? null;
        if (!(responseData as T)) {
            return defaultMessage;
        }
        return message(responseData as T);
    };
}
