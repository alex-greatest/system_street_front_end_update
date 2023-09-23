import React from 'react';
import {GraphTemplate} from "../component/recipe/GraphTemplate";
import {observer} from "mobx-react-lite";
import {ToastContainer} from "react-toastify";

const RecipesPressure = observer(() => {
    return (
        <>
            <ToastContainer />
            <GraphTemplate
                keyQuery={"recipeGraphPressureDataGrid"}
                key={"recipe_graph_pressure"}
                nameGraph={"pressure"}
                pathPage={"/recipe_graph/pressure"}
            />
        </>
    );
});

export default RecipesPressure;