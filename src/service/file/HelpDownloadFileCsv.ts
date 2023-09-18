import {AxiosError, AxiosResponse} from "axios";
import {NotificationDisplayService} from "../NotificationDisplayService";
import {
    downloadCsvFile,
    downloadCsvFileFilterOperation,
    DownloadCsvPartsFile
} from "../../utils/api/csv";
import React from "react";
import {HelpDownloadFile} from "./HelpDownloadFile";
import {PartRequest} from "../../type/result/part/PartRequest";

type setBoolean = React.Dispatch<React.SetStateAction<boolean>>

export class HelpDownloadFileCsv extends HelpDownloadFile {
    public async DownloadFileCsv(partId: number, setDisable: setBoolean, idToast: string, status?: string) {
        return this.requestDownloadFileCsv(setDisable, idToast, () => downloadCsvFile(partId, status));
    }

    public async DownloadFileCsvOperation(partName: string,
                                          setDisable: setBoolean,
                                          idToast: string,
                                          status?: string,
                                          startTime?: string,
                                          endTime?: string) {
        return this.requestDownloadFileCsv(setDisable, idToast, () =>
            downloadCsvFileFilterOperation(
                partName,
                status,
                startTime,
                endTime));
    }

    public async DownloadFileCsvParts(paramRequest: PartRequest, setDisable: setBoolean, idToast: string) {
        return this.requestDownloadFileCsv(setDisable, idToast, () => DownloadCsvPartsFile(paramRequest));
    }

    private async requestDownloadFileCsv(setDisable: setBoolean,
                                         idToast: string,
                                         downloadCsv: () => Promise<AxiosResponse<unknown, any>>) {
        try {
            NotificationDisplayService.showLoading(idToast);
            setDisable(true);
            const response = await downloadCsv();
            this.downloadFileCsv(response);
        } catch (e) {
            NotificationDisplayService.showMessageQuery(e as AxiosError);
        } finally {
            NotificationDisplayService.hideLoading(idToast);
            setDisable(false);
        }
    }
}