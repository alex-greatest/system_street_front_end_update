import React, {useState} from 'react';
import {MRT_Row,} from 'material-react-table';
import {RecipeGraph} from "../type/recipe/RecipeGraph";
import {StoreService} from "../service/StoreService";
import {GraphTemplate} from "../component/recipe/GraphTemplate";
import {observer} from "mobx-react-lite";
import {ToastContainer} from "react-toastify";

export const RecipesGraph = observer((props: {nameGraph: string, keyQuery: string}) => {
    const {nameGraph, keyQuery } = props;
    const selectReferenceStore = StoreService.getData(nameGraph);
    const [updateRecipeGraph, setUpdateRecipeGraph] = useState(false);
    const [selectedReferenceRow, setSelectedReferenceRow] = useState<MRT_Row<RecipeGraph>>();
    const [selectReferences, setSelectReferences] =
        useState(selectReferenceStore?.selectReferences ?? {id: -1, modelDescription: ""});

    return (
        <>
            <ToastContainer />
            <GraphTemplate selectorData={{updateRecipeGraph,
                setUpdateRecipeGraph,
                selectedReferenceRow,
                setSelectedReferenceRow,
                selectReferences,
                setSelectReferences}} nameGraph={nameGraph} keyQuery={keyQuery}/>
        </>
    );
});