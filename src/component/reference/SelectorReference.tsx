import React, {useEffect, useMemo, useState} from 'react';
import {useListNameReferences} from "../../utils/api/reference";
import {ReferenceForRecipe} from "../../type/reference/ReferenceForRecipe";
import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import Button from "@mui/material/Button";

type selectList = React.Dispatch<React.SetStateAction<ReferenceForRecipe>>;

export const SelectorReference = (
    props: {
        setSelectReferences: selectList,
        selectReference?: ReferenceForRecipe
    }) => {
    const {
        setSelectReferences,
        selectReference
    } = props;
    const {data: listReferences, isSuccess, isRefetching} = useListNameReferences();
    const [selectModelDescription, setSelectModelDescription] =
        useState("");
    const defaultValueReference = useMemo(() => {
        return {id: -1, modelDescription: ""}
    }, []);

    useEffect(() => {
        if (isSuccess && listReferences && !isRefetching) {
            const foundModelDescription = listReferences?.find(temp => temp.id === selectReference?.id)?.modelDescription
            setSelectModelDescription(foundModelDescription ?? "");
            setSelectReferences(foundModelDescription ? {...selectReference ?? defaultValueReference} : defaultValueReference);
        }
    }, [defaultValueReference, isRefetching, isSuccess, listReferences, selectReference, selectReference?.id, setSelectReferences]);

    const changeReference = () => {
        setSelectReferences({
            ...listReferences?.find(temp => temp.modelDescription === selectModelDescription)
            ?? defaultValueReference
        });
    }

    return (
        <Box sx={{width: '100%', display: 'flex'}}>
            <Typography fontSize={"25px"} sx={{margin: '1em 0 1em 0'}}>
                {selectReference?.id === -1 ? "Тип не выбран" : `Выбранный тип: ${selectReference?.modelDescription}`}
            </Typography>
            <Box sx={{display: 'flex', width: '30%', gap: '1em', margin: '1em 0 1em auto'}}>
                <FormControl fullWidth>
                    <InputLabel id={`referenceListInputModelDescriptionId`}>Тип детали</InputLabel>
                    <Select
                        id={`referenceListModelDescriptionId`}
                        key={`referenceListModelDescriptionKey`}
                        value={(listReferences && listReferences?.length > 0 && selectModelDescription) || ""}
                        onChange={(e) => setSelectModelDescription(e.target.value)}
                        labelId={`referenceListLabelModelDescription`}
                        defaultValue=""
                        label="Тип детали">
                        <MenuItem key={"referenceDefaultSelectValue"} value={""}> Не выбрано </MenuItem>
                        {listReferences && listReferences?.length > 0 ?
                            listReferences.map(reference =>
                                <MenuItem key={reference.modelDescription} value={reference.modelDescription}>
                                    {reference.modelDescription}
                                </MenuItem>
                            ) : null}
                    </Select>
                </FormControl>
                <Button sx={{width: '40%'}} color="primary" onClick={() => changeReference()} variant="contained">
                    Выбрать
                </Button>
            </Box>
        </Box>
    );
};