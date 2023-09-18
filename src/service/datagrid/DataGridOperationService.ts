import {MRT_PaginationState} from "material-react-table";
import {DataGridService} from "./DataGridService";
import {Part} from "../../type/result/part/Part";
import {OperationRequest} from "../../type/result/operation/OperationRequest";
import {Filter} from "../../type/helper/Filter";

export class DataGridOperationService extends DataGridService<Part> {
    public createParams(
        startTime: string,
        endTime: string,
        partName: string,
        statusFilter: Filter,
        pagination: MRT_PaginationState): OperationRequest {
        return {
            startTime: startTime,
            endTime: endTime,
            partName: partName,
            status: statusFilter?.value?.toString() ?? "",
            offset: pagination.pageIndex * pagination.pageSize,
            limit: pagination.pageSize
        };
    }
}