import {SimpleUser} from "../user/SimpleUser";
import {Tags} from "./Tags";

export interface ReferenceTags {
    id: number,
    value: string,
    changeTime: Date,
    user: SimpleUser,
    tags: Tags
}