import {UserRequest} from "../../type/user/UserRequest";
import {MRT_PaginationState} from "material-react-table";
import QRCode from 'qrcode';
import {pushNotificationError} from "../../utils/notifications";
import {Filter} from "../../type/helper/Filter";
import {DataGridService} from "./DataGridService";
import {User} from "../../type/user/User";

export class DataGridUserService extends DataGridService<User> {
    public createParams(nameFilter: Filter,
                               roleFilter: Filter,
                               pagination: MRT_PaginationState): UserRequest {
        return {
            userName: nameFilter?.value?.toString() ?? "",
            roleName: roleFilter?.value?.toString() ?? "",
            offset: pagination.pageIndex * pagination.pageSize,
            limit: pagination.pageSize
        };
    }

    public generateQrCode(data: string, name: string) {
        QRCode.toDataURL(data, {
            width: 210,
            margin: 2,
        }, (err: any, qrData: string) => {
            if (err) {
                pushNotificationError("Не удалось сгенериовать QR", "qrCodeId");
                return;
            }
            const link = document.createElement("a");
            link.download = `${name}.png`;
            link.href = qrData;
            link.click();
        })
    }
}