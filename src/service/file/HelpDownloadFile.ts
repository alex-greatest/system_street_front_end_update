import {AxiosResponse} from "axios";
import { saveAs } from 'file-saver';
import {ReactElement} from "react";
import {toPng} from "html-to-image";
import {pdf} from "@react-pdf/renderer";

export class HelpDownloadFile {
    protected downloadFileCsv(response: AxiosResponse<unknown, any>) {
        const headerLine = response.headers["content-disposition"];
        const lastIndex = headerLine?.lastIndexOf("''") + 2;
        const fileName = headerLine?.substring(lastIndex, headerLine.length);
        saveAs(response?.data as Blob, fileName);
    }

    public async downloadPdf(documentData: (ulrToGraphEffort: string, urlToGraphMoment: string, urlToTableMoment: string) =>
        ReactElement, fileName: string, idGraphEffort: string, idGraphMoment: string, idTableMoment: string) {
        const idHtmlGraphEffort = document.getElementById(idGraphEffort);
        const idHtmlGraphMoment = document.getElementById(idGraphMoment);
        const idHtmlTableMoment = document.getElementById(idTableMoment);
        const ulrToGraphEffort = idHtmlGraphEffort ? await toPng(idHtmlGraphEffort) : "";
        const ulrToGraphMoment = idHtmlGraphMoment ? await toPng(idHtmlGraphMoment) : "";
        const urlToTableMoment = idHtmlTableMoment ? await toPng(idHtmlTableMoment) : "";
        const graphElementEffort = documentData(ulrToGraphEffort, ulrToGraphMoment, urlToTableMoment);
        const blob = await pdf(graphElementEffort).toBlob();
        saveAs(blob, fileName);
    }
}