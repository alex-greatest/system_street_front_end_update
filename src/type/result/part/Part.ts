import {StatusOperation} from "../StatusOperation";
import {ReferenceForRecipe} from "../../reference/ReferenceForRecipe";

export interface Part {
    id: number;
    partName: string,
    changeTime: Date;
    reference: ReferenceForRecipe,
    status: StatusOperation;
}