import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, FormControl, InputLabel, MenuItem, Select,
    Stack, TextField,
} from '@mui/material';
import {ModalAddAndUpdate} from "../../type/template-data-grid/ModalAddAndUpdate";
import {Controller, useForm} from "react-hook-form";
import {MRT_Row} from "material-react-table";
import {useUpdateRecipe} from "../../utils/api/tags";
import {useGetUnits} from "../../utils/api/unit";
import {useGetTypesOpc} from "../../utils/api/typeOpc";
import {ReferenceTags} from "../../type/tag/ReferenceTags";

export const UpdateRecipe = (
    props: {
        modalProps: ModalAddAndUpdate,
        referenceId: number,
        row: MRT_Row<ReferenceTags> | undefined,
        isRecipe: boolean,
        pathPage: string,
        keyQuery: string,
        isShowPathTag: boolean
    }
    ) => {
    const {onClose, open, header} = props.modalProps;
    const {data: units, isSuccess: isSuccessUnits} = useGetUnits();
    const {data: typesOpc, isSuccess: isSuccessType} = useGetTypesOpc();
    const [selectUnit, setSelectUnit] = useState("")
    const [selectTypeOpc, setSelectTypeOpc] = useState("")
    const referenceTag = {...props.row?.original ??
        {id: -1, value: "", changeTime: new Date(), user: {id: -1, name: ""},
            tags: {id: -1, description: "", pathTag: "", unit: {id: -1, name: ""}, typeOpc: {id: -1, name: ""}}}};

    useEffect(() => {
        setSelectUnit(referenceTag.tags.unit.name ?? units?.at(0)?.name);
    }, [isSuccessUnits, referenceTag.tags.unit.name, units]);

    useEffect(() => {
        setSelectTypeOpc(referenceTag.tags.typeOpc.name ?? typesOpc?.at(0)?.name);
    }, [isSuccessType, referenceTag.tags.typeOpc.name, typesOpc]);

    const {control,
        handleSubmit,
        formState: {errors}} = useForm<ReferenceTags>({
        defaultValues: {
            ...referenceTag
        }});

    const useRecipeUpdate=
        useUpdateRecipe(+referenceTag.id,
            props.referenceId,
            props.keyQuery,
            props.pathPage,
            (oldData): ReferenceTags[] => {
            return oldData;
        });

    const onSubmit = (data: ReferenceTags) => {
        data.tags.unit = selectUnit ?
            {...(units?.find(tempUnit => tempUnit.name === selectUnit) ?? {id: -1, name: ""})} : {...data.tags.unit};
        data.tags.typeOpc = selectTypeOpc ?
            {...(typesOpc?.find(tempTypeOpc => tempTypeOpc.name === selectTypeOpc) ?? {id: -1, name: ""})} : {...data.tags.typeOpc};
        setSelectUnit("");
        setSelectTypeOpc("");
        useRecipeUpdate.mutate(data);
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
                        {props.isShowPathTag &&
                            <Controller
                                name="tags.pathTag"
                                control={control}
                                rules={{required: true, maxLength: 300}}
                                render={({field: {onChange, value}}) => (
                                    <TextField
                                        onChange={onChange}
                                        multiline={true}
                                        sx={{mt: '0.5em'}}
                                        id="PathTagUpdateRecipeFieldId"
                                        key="PathTagUpdateRecipeFieldKey"
                                        error={!!errors?.tags?.pathTag}
                                        label='Путь к тегу*'
                                        value={value || ""}
                                        placeholder='Введите путь к тэгу*'
                                        fullWidth
                                        helperText={errors?.tags?.pathTag?.type === "required" ?
                                            "Поле не может быть пуcтым" :
                                            errors?.tags?.pathTag?.type === "maxLength" ?
                                                "Максимальное кол-во символов равно 300" : null}
                                    />
                                )}
                            />
                        }
                        <Controller
                            name="tags.description"
                            control={control}
                            rules={{maxLength: 600}}
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    onChange={onChange}
                                    multiline={true}
                                    sx={{mt: '0.5em'}}
                                    id="descriptionRecipeFieldId"
                                    key="descriptionRecipeFieldKey"
                                    error={!!errors?.tags?.description}
                                    label='Комментаарий к тегу'
                                    value={value || ""}
                                    placeholder='Введите комментарий к тэгу'
                                    fullWidth
                                    helperText={errors?.tags?.description?.type ? "Можно ввести максимум 600 символов" : null}
                                />
                            )}
                        />
                        {props.isRecipe && <Controller
                            name="value"
                            control={control}
                            rules={{required: true,
                                validate: (v) => !isNaN(Number(v)) || "Необходимо ввести число"}}
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    onChange={(e) =>
                                        onChange(e.target.value.replace(/[^0-9\\.-]/ig,''))}
                                    sx={{mt: '0.5em'}}
                                    id="valueRecipeFieldId"
                                    key="valueRecipeFieldKey"
                                    error={!!errors?.value}
                                    label='Значение тэга *'
                                    value={value || ""}
                                    placeholder='Введите значение тэга *'
                                    fullWidth
                                    helperText={errors?.value?.type === 'validate' ?
                                        errors?.value?.message :
                                        errors?.value ? "Поле не может быть пустым" : null}
                                />
                            )}
                        />}
                        <Controller
                            name="tags.unit.name"
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <FormControl fullWidth>
                                    <InputLabel id="unitRecipeNameInputId">Единицы измерения</InputLabel>
                                    <Select
                                        id="unitRecipeFieldId"
                                        key="unitRecipeFieldKey"
                                        value={(!!units && value) || ""}
                                        onChange={(e) => {
                                            setSelectUnit(e.target.value as string);
                                            onChange(e);
                                        }}
                                        labelId="roleLabelId"
                                        label="Единицы измерения">
                                        {units ? units.map(unit=>
                                            <MenuItem key={unit.name} value={unit.name}>
                                                {unit.name}
                                            </MenuItem>
                                        ) : null}
                                    </Select>
                                </FormControl>
                            )}/>
                        <Controller
                            name="tags.typeOpc.name"
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <FormControl fullWidth>
                                    <InputLabel id="typeOpcecipeNameInputId">Тип</InputLabel>
                                    <Select
                                        id="typeOpcNameRecipeFieldId"
                                        key="typeOpcNameFieldKey"
                                        value={(!!typesOpc && value) || ""}
                                        onChange={(e) => {
                                            setSelectTypeOpc(e.target.value as string);
                                            onChange(e);
                                        }}
                                        labelId="unitRecipeLabelId"
                                        label="Тип">
                                        {typesOpc ? typesOpc.map(typeOpc =>
                                            <MenuItem key={typeOpc.name} value={typeOpc.name}>
                                                {typeOpc.name}
                                            </MenuItem>
                                        ) : null}
                                    </Select>
                                </FormControl>
                            )}/>
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
