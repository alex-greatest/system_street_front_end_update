import React from "react";
import {PartRequest} from "../../result/part/PartRequest";

export interface PartHook {
    startTime: Date,
    endTime: Date,
    setStartTime: React.Dispatch<React.SetStateAction<Date>>,
    setEndTime: React.Dispatch<React.SetStateAction<Date>>,
    paramRequest: PartRequest
}