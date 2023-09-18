import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';
import {User} from "../../type/user/User";
import {ModalAddAndUpdate} from "../../type/template-data-grid/ModalAddAndUpdate";
import {Control, Controller, FieldErrors, useForm, UseFormGetValues} from "react-hook-form";
import {ApiResponse} from "../../type/ApiResponse";
import {UseMutationResult} from "react-query";
import {AxiosError, AxiosResponse} from "axios";
import {Reference} from "../../type/reference/Reference";
import {ReferenceRequest} from "../../type/reference/ReferenceRequest";
import {useGetProfile} from "../../utils/api/auth";
type funcMutation = UseMutationResult<AxiosResponse<any, any>,
    AxiosError<unknown, any>,
    Reference | ApiResponse<Reference>>;

export const DialogReferenceTemplate = (
    props: {
        modalProps: ModalAddAndUpdate,
        paramsRequest: ReferenceRequest,
        mutationFunc: funcMutation
        reference: Reference,
        children?: (control: Control<User>, errors: FieldErrors<User>, getValues: UseFormGetValues<Reference>)
            => React.JSX.Element
    }) => {
    const {onClose, open, header} = props.modalProps;
    const {data: user} = useGetProfile();
    const mutationFunc = props.mutationFunc;
    const {control,
        handleSubmit,
        formState: {errors}} = useForm<Reference>({
        defaultValues: {
            ...props.reference
        }});

    const onSubmit = (data: Reference) => {
        data.user.name = user?.name ?? "";
        mutationFunc.mutate(data!);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">{header}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                        }}>
                        <Controller
                            name="modelDescription"
                            control={control}
                            rules={{required: true}}
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    onChange={onChange}
                                    sx={{mt: '0.5em'}}
                                    id="modelDescriptionFieldId"
                                    key="modelDescriptionIdField"
                                    error={!!errors?.modelDescription}
                                    label='Название детали *'
                                    value={value || ""}
                                    placeholder='Введите название детали *'
                                    fullWidth
                                    helperText={errors?.modelDescription ? "Поле не может быть пустым" : null}
                                />
                            )}
                        />
                        <Controller
                            name="dataRecordNumber"
                            control={control}
                            rules={{required: true, minLength: 1,
                                validate: {
                                    checkOne: (v) => v >= 1 || "Вводимое значение должно быть больше единицы",
                                    checkNumber: (v) => !isNaN(Number(v)) || "Необходимо ввести число"
                                }}}
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    onChange={(e) =>
                                        onChange(e.target.value.replace(/[^0-9]/ig,''))}
                                    sx={{mt: '0.5em'}}
                                    id="dataRecordNumberFieldId"
                                    key="dataRecordNumberField"
                                    error={!!errors?.dataRecordNumber}
                                    label='Номер детали *'
                                    value={value || ""}
                                    placeholder='Введите номер детали *'
                                    fullWidth
                                    helperText={errors?.dataRecordNumber?.type === 'checkOne' ||
                                        errors?.dataRecordNumber?.type === 'checkNumber' ?
                                        errors?.dataRecordNumber?.message :
                                        errors?.dataRecordNumber ? "Поле не может быть пустым" : null}
                                />
                            )}
                        />
                        <Controller
                            name="partTypeId"
                            control={control}
                            rules={{required: true, minLength: 1,
                                validate: {
                                    checkOne: (v) => v >= 1 || "Вводимое значение должно быть больше единицы",
                                    checkNumber: (v) => !isNaN(Number(v)) || "Необходимо ввести число"
                                }}}
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    onChange={(e) =>
                                        onChange(e.target.value.replace(/[^0-9]/ig,''))}
                                    sx={{mt: '0.5em'}}
                                    id="partTypeIdFieldId"
                                    key="partTypeIdField"
                                    error={!!errors?.partTypeId}
                                    label='Идентификатор детали *'
                                    value={value || ""}
                                    placeholder='Введите идентификатор детали *'
                                    fullWidth
                                    helperText={errors?.partTypeId?.type === 'checkOne' ||
                                        errors?.partTypeId?.type === 'checkNumber' ?
                                        errors?.partTypeId?.message :
                                        errors?.partTypeId ? "Поле не может быть пустым" : null}
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
