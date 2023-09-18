import React, {useState} from 'react';
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Stack, TextField,
} from '@mui/material';
import {ModalAddAndUpdate} from "../../type/template-data-grid/ModalAddAndUpdate";
import {Controller, useForm} from "react-hook-form";
import {MRT_Row} from "material-react-table";
import {useAddRecipe} from "../../utils/api/tags";
import {TagsSimple} from "../../type/tag/TagsSimple";
import {ReferenceTags} from "../../type/tag/ReferenceTags";

export const AddRecipe = (
    props: {
        modalProps: ModalAddAndUpdate,
        referenceId: number,
        row: MRT_Row<ReferenceTags> | undefined,
        pathPage: string,
        keyQuery: string,
    }) => {
    const {onClose, open, header} = props.modalProps;
    const [actualTag, setActualTag] = useState("");
    const templateRecipe: ReferenceTags = {id: -1, value: "", changeTime: new Date(), user: {id: -1, name: ""},
            tags: {id: -1, value: "", description: "", pathTag: actualTag, unit: {id: -1, name: ""}, typeOpc: {id: -1, name: ""}}};

    const {control,
        handleSubmit,
        formState: {errors}} = useForm<TagsSimple>({
        defaultValues: {
            ...{id: -1, pathTag: ""}
        }});

    const useRecipeUpdate=
        useAddRecipe(
            {referenceId: props.referenceId},
            props.keyQuery,
            props.pathPage,
            (oldData): ReferenceTags[] =>
            {
                oldData = [...oldData, templateRecipe];
                return oldData;
            });

    const onSubmit = (data: TagsSimple) => {
        data.referenceId = props.referenceId;
        useRecipeUpdate.mutate(data!);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">{header}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack
                        sx={{
                            mt: '0.5em',
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                        }}>
                        <Controller
                            name="pathTag"
                            control={control}
                            rules={{required: true, maxLength: 300}}
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    onChange={(e) => {
                                        setActualTag(e.target.value);
                                        onChange(e);
                                    }}
                                    multiline={true}
                                    sx={{mt: '0.5em'}}
                                    id="PathTagAddRecipeFieldId"
                                    key="PathTagAddRecipeFieldKey"
                                    error={!!errors?.pathTag}
                                    label='Путь к тегу*'
                                    value={value || ""}
                                    placeholder='Введите путь к тэгу*'
                                    fullWidth
                                    helperText={errors?.pathTag?.type === "required" ? "Поле не может быть пуcтым" :
                                         errors?.pathTag?.type === "maxLength" ?
                                        "Максимальное кол-во символов равно 300" : null}
                                />
                            )}
                        />
                    </Stack>
                    <DialogActions sx={{ p: '1.25rem' }}>
                        <Button color="secondary" type="submit" variant="contained">
                            Сохранить
                        </Button>
                        <Button onClick={onClose}>Выйти</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};
