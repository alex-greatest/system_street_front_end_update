import {AxiosError} from "axios";
import {
    notificationHideLoading,
    pushNotificationError,
    pushNotificationLoading,
    pushNotificationSuccess
} from "../utils/notifications";
import {Id} from "react-toastify";

export class NotificationDisplayService {
    public static showMessageForLogin(error: any, toastId?: Id) {
        console.log(error);
        const status = error?.response?.status ?? 0;
        switch (status) {
            case 401:
                return pushNotificationError("Неверное имя пользователя или пароль", toastId);
            case 0:
                return pushNotificationError("Нет ответа от сервера", toastId);
            default:
                return pushNotificationError("Неизвестная ошибка", toastId);
        }
    }

    public static showMessageQuery(error: AxiosError, toastId?: Id) {
        const errorServer = "Ошибка на стороне сервера";
        const status = error?.response?.status ?? 0;
        const data = !!error?.response?.data ?
            error?.response?.data as {message: string} : null;
        const message = data?.message ?? errorServer;
        switch (status) {
            case 404:
            case 500:
                return pushNotificationError(message, toastId);
            case 401:
            case 0:
                return;
            default:
                return pushNotificationError(errorServer, toastId);
        }
    }

    public static showMessageSuccess(message: string, toastId?: Id){
        pushNotificationSuccess(message, toastId);
    }

    public static showMessageError(message: string, toastId?: Id){
        pushNotificationError(message, toastId);
    }

    public static showLoading(toastId: Id) {
        pushNotificationLoading(toastId);
    }

    public static hideLoading(toastId: Id) {
        notificationHideLoading(toastId);
    }
}