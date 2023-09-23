import {useMemo, useState} from "react";
import {MRT_ColumnDef} from "material-react-table";
import {ReferenceTags} from "../../type/tag/ReferenceTags";
import {TagsHook} from "../../type/template-data-grid/hook/TagsHook";
import {TagsTemplate} from "./TagsTemplate";
import {observer} from "mobx-react-lite";

export const PageTagsTemplate = observer((
    props: {
        keyQuery: string,
        pathPage: string,
        useCreateColumTags: (typesOpc: string[] | undefined, units: string[] | undefined) => MRT_ColumnDef<ReferenceTags>[],
        isRecipe?: boolean,
        keyTemplate?: string
    }) => {
    const {keyQuery, pathPage, useCreateColumTags, isRecipe} = props;
    const [updateRecipe, setUpdateRecipes] = useState(false);
    const [addRecipe, setAddRecipe] = useState(false);
    const updateRecipeMemo = useMemo(() => updateRecipe, [updateRecipe]);
    const addRecipeMemo = useMemo(() => addRecipe, [addRecipe]);
    const setUpdateRecipesMemo = useMemo(() => setUpdateRecipes, [setUpdateRecipes]);
    const setAddRecipeMemo = useMemo(() => setAddRecipe, [setAddRecipe]);

    const mainProps: TagsHook = {
        updateRecipe: updateRecipeMemo,
        setUpdateRecipes: setUpdateRecipesMemo,
        addRecipe: addRecipeMemo,
        setAddRecipe: setAddRecipeMemo,
        isRecipe: !isRecipe,
        pathPage: pathPage,
        keyQuery: keyQuery,
        useCreateColumTags: useCreateColumTags
    };

    return ( <TagsTemplate key={props.keyTemplate} mainProps={mainProps}/> );
});
