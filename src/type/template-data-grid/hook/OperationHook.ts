import React from "react";
import {OperationRequest} from "../../result/operation/OperationRequest";

export interface OperationHook {
    partName: string,
    setPartName: React.Dispatch<React.SetStateAction<string>>,
    paramRequest: OperationRequest,
    startFilter: Date|null,
    endFilter: Date|null,
    setStartFilter: React.Dispatch<React.SetStateAction<Date|null>>,
    setEndFilter: React.Dispatch<React.SetStateAction<Date|null>>,
}