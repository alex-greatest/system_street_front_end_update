import {apiRoutes} from "../utils/routes";
import {PageTagsTemplate} from "../component/tags/PageTagsTemplate";
import {useCreateColumnTags} from "../hook/tags/useCreateColumnTags";
import {observer} from "mobx-react-lite";
import {ToastContainer} from "react-toastify";
import React from "react";

const keyQuery = "tagResultsSettingDataGrid";

const TagResults = observer(() => {
    return (
        <>
            <ToastContainer />
            <PageTagsTemplate
                key={"tagResultsTemplatePage"}
                keyQuery={keyQuery}
                pathPage={apiRoutes.tagResults}
                useCreateColumTags={useCreateColumnTags}
                isRecipe={true}
                keyTemplate={"tagResultsTemplatePageTags"}
            />
        </>
    );
});

export default TagResults;
