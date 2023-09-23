import React, {useEffect, useState} from 'react';
import {useListNameReferences} from "../../utils/api/reference";
import {ReferenceForRecipe} from "../../type/reference/ReferenceForRecipe";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {StoreService} from "../../service/StoreService";

type selectList = React.Dispatch<React.SetStateAction<ReferenceForRecipe>>;

export const SelectorReference = (
    props: {
        setSelectReferences: selectList,
        selectReference?: ReferenceForRecipe,
        pathPage: string}) => {
    const {data: listReferences} = useListNameReferences();
    const [selectModelDescription, setSelectModelDescription] = useState("");
    const {setSelectReferences, pathPage} = props;
    const [firstRender, setFirstRender] = useState(false);

    useEffect(() => {
        const selectReferenceStore = StoreService.getData(pathPage);
        const reference: ReferenceForRecipe = selectReferenceStore?.selectReferences ?? {id: -1, modelDescription: ""};
        setSelectReferences(reference);
        setSelectModelDescription(reference.modelDescription);
        setFirstRender(true);
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(firstRender) {
            const reference = listReferences?.find(reference =>
                reference.modelDescription === selectModelDescription) ?? {id: -1, modelDescription: ""};
            setSelectReferences(reference);
            StoreService.addData(pathPage, {selectReferences: reference});
        }
        //eslint-disable-next-line
    }, [listReferences, pathPage, selectModelDescription, setSelectReferences]);

    return (
        <Box sx={{width: '100%', display: 'flex'}}>
            <Box sx={{display: 'flex', width: '20%', gap: '1em', margin: '1em 0 1em auto'}}>
                <FormControl fullWidth>
                    <InputLabel key={`referenceListInputModelDescriptionKey`} id={`referenceListInputModelDescriptionId`}>Тип детали</InputLabel>
                    <Select
                        id={`referenceListModelDescriptionId`}
                        key={`referenceListModelDescriptionKey`}
                        value={(listReferences && listReferences?.length > 0 && selectModelDescription) || ""}
                        onChange={(e) => setSelectModelDescription(e.target.value)}
                        labelId={`referenceListLabelModelDescription`}
                        label="Тип детали"
                        defaultValue="">
                        {listReferences && listReferences?.length > 0 ?
                            listReferences.map(reference =>
                                <MenuItem key={reference.modelDescription} value={reference.modelDescription}>
                                    {reference.modelDescription}
                                </MenuItem>
                            ) : <MenuItem key={"referenceDefaultSelectValue"} value={""}> </MenuItem>}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};