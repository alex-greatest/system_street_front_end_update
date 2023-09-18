import React from "react";
import {MRT_ColumnDef, MRT_Row} from "material-react-table";
import {QueryObserverResult, RefetchOptions, RefetchQueryFilters, UseMutationResult} from "react-query";
import {AxiosError, AxiosResponse} from "axios";
import {ReferenceTags} from "../../tag/ReferenceTags";
import {ReferenceForRecipe} from "../../reference/ReferenceForRecipe";

export interface TagsHook {
    updateRecipe: boolean,
    setUpdateRecipes: React.Dispatch<React.SetStateAction<boolean>>,
    addRecipe: boolean,
    setAddRecipe: React.Dispatch<React.SetStateAction<boolean>>,
    selectedReferenceRow: MRT_Row<ReferenceTags>|undefined,
    setSelectedReferenceRow: React.Dispatch<React.SetStateAction<MRT_Row<ReferenceTags>|undefined>>
    selectReferences: ReferenceForRecipe,
    setSelectReferences: React.Dispatch<React.SetStateAction<ReferenceForRecipe>>,
    mutationDeleteTags: UseMutationResult<AxiosResponse<any, any>, AxiosError<unknown, any>, string | number | ReferenceTags[], unknown>,
    data: ReferenceTags[]|undefined,
    isLoading: boolean,
    isErrorGetList: boolean,
    isFetching: boolean,
    isRecipe: boolean,
    pathPage: string,
    keyQuery: string,
    refetch:  <TPageData>(options?: ((RefetchOptions & RefetchQueryFilters<TPageData>) | undefined)) => Promise<QueryObserverResult<ReferenceTags[], Error>>,
    useCreateColumTags: (typesOpc: string[] | undefined, units: string[] | undefined) => MRT_ColumnDef<ReferenceTags>[]
}