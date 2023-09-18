import {SimpleUser} from "../user/SimpleUser";

export interface Reference {
    id: number,
    dataRecordNumber: number,
    partTypeId: number,
    modelDescription: string,
    user: SimpleUser
    changeTime?: Date,
}