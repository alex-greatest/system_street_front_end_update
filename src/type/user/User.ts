import {Role} from "./Role"

export interface User {
    id: number,
    name: string,
    role: Role,
    plcPassword?: string,
    password?: string,
    confirmPassword?: string
}