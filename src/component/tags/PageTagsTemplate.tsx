import {useEffect, useMemo, useState} from "react";
import {MRT_ColumnDef, MRT_Row} from "material-react-table";
import {StoreService} from "../../service/StoreService";
import {ReferenceTags} from "../../type/tag/ReferenceTags";
import {useDeleteRecipe, useGetTags} from "../../utils/api/tags";
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
    const selectReferenceStore = StoreService.getData(pathPage);
    const [updateRecipe, setUpdateRecipes] = useState(false);
    const [addRecipe, setAddRecipe] = useState(false);
    const [selectedReferenceRow, setSelectedReferenceRow] = useState<MRT_Row<ReferenceTags>>();
    const [selectReferences, setSelectReferences] =
        useState(selectReferenceStore?.selectReferences ?? {id: -1, modelDescription: ""});
    const memoSelectReferences =
        useMemo(
            () => selectReferences,
            [selectReferences]);
    const memoSetSelectReferences =
        useMemo(
            () => setSelectReferences,
            [setSelectReferences]);

    const mutationDelete = useDeleteRecipe({referenceId: selectReferences.id},
        keyQuery,
        pathPage,
        (oldData, id) => {
            oldData = oldData?.filter((item) => item.id !== id) ?? null;
            return oldData;
        });

    useEffect(() => {
        StoreService.addData(pathPage, {
            selectReferences: selectReferences
        });
    }, [pathPage, selectReferences]);

    const { data,
        isError,
        isFetching,
        isLoading,
        refetch } = useGetTags(selectReferences.id, pathPage, keyQuery);

    const mainProps: TagsHook = {
        updateRecipe: updateRecipe,
        setUpdateRecipes: setUpdateRecipes,
        addRecipe: addRecipe,
        setAddRecipe: setAddRecipe,
        selectedReferenceRow: selectedReferenceRow,
        setSelectedReferenceRow: setSelectedReferenceRow,
        selectReferences: memoSelectReferences,
        setSelectReferences: memoSetSelectReferences,
        mutationDeleteTags: mutationDelete,
        data: data,
        isLoading: isLoading,
        isErrorGetList: isError,
        isFetching: isFetching,
        isRecipe: !isRecipe,
        pathPage: pathPage,
        keyQuery: keyQuery,
        refetch: refetch,
        useCreateColumTags: useCreateColumTags
    };

    return ( <TagsTemplate key={props.keyTemplate} mainProps={mainProps}/> );
});
