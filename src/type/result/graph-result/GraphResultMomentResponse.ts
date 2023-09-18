import {PointGraphMoment} from "./PointGraphMoment";
import {PointGraphMomentBoolBar} from "./PointGraphMomentBoolBar";
import {PointGraphMomentTemplate} from "./PointGraphMomentTemplate";

export interface GraphResultMomentResponse {
    pointsGraph: PointGraphMoment[],
    graphResultMomentTemplate: PointGraphMomentTemplate,
    boolBars: PointGraphMomentBoolBar[]
}
