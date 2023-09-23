import {useCreateColumnRecipe} from "../hook/recipe/useCreateColumnRecipe";
import {apiRoutes} from "../utils/routes";
import {PageTagsTemplate} from "../component/tags/PageTagsTemplate";
import {observer} from "mobx-react-lite";
import {ToastContainer} from "react-toastify";
import React from "react";

const keyQuery = "recipeDataGrid";

const Recipes = observer(() => {

    return (
        <>
            <ToastContainer />
            <PageTagsTemplate
                key={"recipesTemplatePage"}
                keyQuery={keyQuery}
                pathPage={apiRoutes.recipe}
                useCreateColumTags={useCreateColumnRecipe}
                keyTemplate={"recipesTemplatePageTags"}
            />
        </>
    );
});


export default Recipes;