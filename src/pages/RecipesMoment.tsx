import React from 'react';
import {GraphTemplate} from "../component/recipe/GraphTemplate";
import {observer} from "mobx-react-lite";
import {ToastContainer} from "react-toastify";

const RecipesMoment = observer(() => {
    return (
        <>
            <ToastContainer />
            <GraphTemplate
                keyQuery={"recipeGraphMomentDataGrid"}
                key={"recipe_graph_moment"}
                nameGraph={"moment"}
                pathPage={"/recipe_graph/moment"}
            />
        </>
    );
});

export default RecipesMoment;