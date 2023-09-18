import {StatusOperation} from "../StatusOperation";
import {SimpleUser} from "../../user/SimpleUser";

export interface Operation {
    id: number;
    status: StatusOperation;
    user: SimpleUser;
    changeTime?: Date;
}