import {PointGraphEffort} from "./PointGraphEffort";

export interface GraphResultEffortResponse {
    pointsGraphRight: PointGraphEffort[],
    pointsGraphLeft: PointGraphEffort[],
    cwAvg: number,
    cwwAvg: number
}