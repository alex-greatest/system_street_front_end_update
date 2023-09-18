import {ReferenceTagsOperationResult} from "./ReferenceTagsOperationResult";

export interface OperationResult {
    id: number,
    value: string,
    referenceTags: ReferenceTagsOperationResult
}