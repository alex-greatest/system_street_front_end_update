import React from "react";
import {PartRequest} from "../../result/part/PartRequest";
import dayjs from "dayjs";

export interface PartHook {
    startTime: dayjs.Dayjs,
    endTime: dayjs.Dayjs,
    setStartTime: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>,
    setEndTime: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>,
    paramRequest: PartRequest
}