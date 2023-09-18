import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from '@mui/material';
import {User} from "../../type/user/User";
import {ModalAddAndUpdate} from "../../type/template-data-grid/ModalAddAndUpdate";
import {Control, Controller, FieldErrors, useForm, UseFormGetValues} from "react-hook-form";
import {Role} from "../../type/user/Role";
import {UserRequest} from "../../type/user/UserRequest";
import {UseMutationResult} from "react-query";
import {AxiosError, AxiosResponse} from "axios";
import {ApiResponse} from "../../type/ApiResponse";

export const DialogUserTemplate = (
    props: {
        modalProps: ModalAddAndUpdate,
        paramsRequest: UserRequest,
        rolesList: Role[] | undefined,
        mutationFunc: UseMutationResult<AxiosResponse<any, any>, AxiosError<unknown, any>, User | ApiResponse<User>>,
        user: User,
        children?: (control: Control<User>, errors: FieldErrors<User>, getValues: UseFormGetValues<User>)
            => React.JSX.Element
    }) => {
    const {onClose, open, header} = props.modalProps;
    const mutationFunc = props.mutationFunc;
    const roles = props.rolesList;
    const [selectRole, setSelectRole] = useState("")
    const {control,
        handleSubmit,
        getValues,
        formState: {errors}} = useForm<User>({
        defaultValues: {
            ...props.user
        }});

    useEffect(() => {
        setSelectRole(props.user.role.roleName ?? roles?.at(0)?.roleName);
    }, [props.user.role.roleName, roles]);

    const onSubmit = (data: User) => {
        data.role = selectRole ?
            {...(roles?.find(tempRole => tempRole.roleName === selectRole) ?? {id: 1, roleName: ""})} :
            {...data.role};
        data.password = selectRole !== "operator" ? data.password : "default";
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
                            name="name"
                            control={control}
                            rules={{required: true, minLength: 3}}
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    onChange={(e) =>
                                        onChange(e.target.value.replace(/[^A-Za-z0-9 ]/ig,''))}
                                    sx={{mt: '0.5em'}}
                                    id="userFieldId"
                                    key="userFieldKey"
                                    error={!!errors?.name}
                                    label='Имя *'
                                    value={value || ""}
                                    placeholder='Введите имя *'
                                    fullWidth
                                    helperText={errors?.name ? "Необходимо ввести минимум три символа" : null}/>
                            )}
                        />
                        <Controller
                            name="role.roleName"
                            control={control}
                            render={({field: {onChange, value}}) => (
                                <FormControl fullWidth>
                                    <InputLabel id="roleInputFieldId">Роль</InputLabel>
                                    <Select
                                        id="roleFieldId"
                                        key="roleFieldKey"
                                        value={(!!roles && value) || ""}
                                        onChange={(e) => {
                                            setSelectRole(e.target.value as string);
                                            onChange(e);
                                        }}
                                        labelId="roleLabelId"
                                        label="Роль">
                                        {roles ? roles.map(role=>
                                            <MenuItem key={role.roleName} value={role.roleName}>
                                                {role.roleName}
                                            </MenuItem>
                                        ) : null}
                                    </Select>
                                </FormControl>
                            )}/>
                        {props.children && selectRole !== "operator" && props.children(control, errors, getValues)}
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
