import {MRT_PaginationState} from "material-react-table";
import {DataGridService} from "./DataGridService";
import {Part} from "../../type/result/part/Part";
import {Filter} from "../../type/helper/Filter";
import {PartRequest} from "../../type/result/part/PartRequest";

export class DataGridPartService extends DataGridService<Part> {
    public createParams(startTime: string,
                        endTime: string,
                        reference: Filter,
                        statusFilter: Filter,
                        pagination: MRT_PaginationState): PartRequest {
        return {
            startTime: startTime,
            endTime: endTime,
            reference: reference?.value?.toString() ?? "",
            status: statusFilter?.value?.toString() ?? "",
            offset: pagination.pageIndex * pagination.pageSize,
            limit: pagination.pageSize
        };
    }
}