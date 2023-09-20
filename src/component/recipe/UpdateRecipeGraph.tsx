import React from 'react';
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
import {RecipeGraph} from "../../type/recipe/RecipeGraph";
import {useUpdateRecipeGraph} from "../../utils/api/recipe-graph";

export const UpdateRecipeGraph = (
    props: {
        modalProps: ModalAddAndUpdate,
        referenceId: number,
        row: MRT_Row<RecipeGraph> | undefined,
        nameGraph: string,
        keyQuery: string
    }
    ) => {
    const {onClose, open, header} = props.modalProps;
    const recipeGraph = {...props.row?.original ?? {id: -1, value: 0, user: {id: -1, name: ""}}};
    const {referenceId, nameGraph, keyQuery} = props;

    const {control,
        handleSubmit,
        formState: {errors}} = useForm<RecipeGraph>({
        defaultValues: {
            ...recipeGraph
        }});

    const useUpdate=
        useUpdateRecipeGraph(+recipeGraph.id,
            referenceId,
            nameGraph,
            keyQuery,
            (oldData): RecipeGraph[] => {
            return oldData;
        });

    const onSubmit = (data: RecipeGraph) => {
        useUpdate.mutate(data);
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
                            name="value"
                            control={control}
                            rules={{required: true,
                                validate: (v) => !isNaN(Number(v)) || "Необходимо ввести число"}}
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    onChange={(e) =>
                                        onChange(e.target.value.replace(/[^0-9\\.-]/ig,''))}
                                    sx={{mt: '0.5em'}}
                                    id="valueRecipeGraphFieldId"
                                    key="valueRecipeGraphFieldKey"
                                    error={!!errors?.value}
                                    label={`Значение координаты ${(props?.row?.index ?? 0) + 1} *`}
                                    value={value}
                                    placeholder={`Введите значение координаты ${(props?.row?.index ?? 0) + 1} *`}
                                    fullWidth
                                    helperText={errors?.value?.type === 'validate' ?
                                        errors?.value?.message :
                                        errors?.value ? "Поле не может быть пустым" : null}
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
