import React from 'react';
import {ModalAddAndUpdate} from "../../type/template-data-grid/ModalAddAndUpdate";
import {ApiResponse} from "../../type/ApiResponse";
import {Reference} from "../../type/reference/Reference";
import {useAddReference} from "../../utils/api/reference";
import {DialogReferenceTemplate} from "./DialogReferenceTemplate";
import {ReferenceRequest} from "../../type/reference/ReferenceRequest";

export const NewReferenceDialog = (
    {modalProps, paramsRequest}: {
        modalProps: ModalAddAndUpdate,
        paramsRequest: ReferenceRequest,
    }) => {
    const reference =
        {id: -1, dataRecordNumber: 0, partTypeId: 0, modelDescription: "", user: {id: -1, name: ""}};
    const referenceAdd= useAddReference(
        paramsRequest,
        (oldData, newData: Reference): ApiResponse<Reference> =>
        {
            oldData.content = [...oldData.content, newData];
            return oldData;
        });

    return (
        <DialogReferenceTemplate modalProps={modalProps}
                                 paramsRequest={paramsRequest}
                                 mutationFunc={referenceAdd}
                                 reference={reference} />
    );
}
