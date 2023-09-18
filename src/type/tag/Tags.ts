import {TypeOpc} from "../recipe/TypeOpc";
import {Unit} from "../recipe/Unit";

export interface Tags {
    id: number,
    value: string,
    description: string,
    pathTag: string,
    unit: Unit,
    typeOpc: TypeOpc,
}