import React from "react";
import {MRT_ColumnDef} from "material-react-table";
import {ReferenceTags} from "../../tag/ReferenceTags";

export interface TagsHook {
    updateRecipe: boolean,
    setUpdateRecipes: React.Dispatch<React.SetStateAction<boolean>>,
    addRecipe: boolean,
    setAddRecipe: React.Dispatch<React.SetStateAction<boolean>>,
    isRecipe: boolean,
    keyQuery: string,
    pathPage: string,
    useCreateColumTags: (typesOpc: string[] | undefined, units: string[] | undefined) => MRT_ColumnDef<ReferenceTags>[]
}