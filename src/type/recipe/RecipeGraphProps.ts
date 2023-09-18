import React from "react";
import {MRT_Row} from "material-react-table";
import {RecipeGraph} from "./RecipeGraph";
import {ReferenceForRecipe} from "../reference/ReferenceForRecipe";

export interface RecipeGraphProps {
    updateRecipeGraph: boolean,
    setUpdateRecipeGraph:  React.Dispatch<React.SetStateAction<boolean>>,
    selectedReferenceRow: MRT_Row<RecipeGraph> | undefined,
    setSelectedReferenceRow: React.Dispatch<React.SetStateAction<MRT_Row<RecipeGraph> | undefined>>,
    selectReferences: ReferenceForRecipe,
    setSelectReferences: React.Dispatch<React.SetStateAction<ReferenceForRecipe>>
}