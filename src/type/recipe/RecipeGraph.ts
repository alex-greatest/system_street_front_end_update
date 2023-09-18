import {SimpleUser} from "../user/SimpleUser";

export interface RecipeGraph {
    id: number,
    value: number,
    user: SimpleUser,
    changeTime?: Date,
}