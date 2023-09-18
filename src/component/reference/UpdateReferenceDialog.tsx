import React from 'react';
import {ModalAddAndUpdate} from "../../type/template-data-grid/ModalAddAndUpdate";
import {MRT_Row} from "material-react-table";
import {ApiResponse} from "../../type/ApiResponse";
import {ReferenceRequest} from "../../type/reference/ReferenceRequest";
import {DialogReferenceTemplate} from "./DialogReferenceTemplate";
import {Reference} from "../../type/reference/Reference";
import {useUpdateReference} from "../../utils/api/reference";

export const UpdateReferenceDialog = (
    {modalProps, paramsRequest, row}: {
        modalProps: ModalAddAndUpdate,
        paramsRequest: ReferenceRequest,
        row: MRT_Row<Reference>|undefined
    }) => {
    const reference = {...row?.original ??
        {id: -1, dataRecordNumber: 0, partTypeId: 0, modelDescription: "", user: {id: -1, name: ""}}};
    const referenceUpdate= useUpdateReference(
        +reference.id,
        paramsRequest,
        (oldData, newData: Reference): ApiResponse<Reference> =>
        {
            oldData.content = oldData.content?.map(u => u.id === newData.id ? newData : u) ?? null;
            return oldData;
        });

    return (
        <DialogReferenceTemplate modalProps={modalProps}
                            paramsRequest={paramsRequest}
                            mutationFunc={referenceUpdate}
                            reference={reference} />
    );
}