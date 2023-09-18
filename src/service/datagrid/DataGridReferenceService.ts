import {MRT_PaginationState} from "material-react-table";
import {ReferenceRequest} from "../../type/reference/ReferenceRequest";
import {DataGridService} from "./DataGridService";
import {Filter} from "../../type/helper/Filter";
import {Reference} from "../../type/reference/Reference";

export class DataGridReferenceService extends DataGridService<Reference> {
    public createParams(modelDescription: Filter, pagination: MRT_PaginationState): ReferenceRequest {
        return {
            modelDescription: modelDescription?.value?.toString() ?? "",
            offset: pagination.pageIndex * pagination.pageSize,
            limit: pagination.pageSize
        };
    }
}