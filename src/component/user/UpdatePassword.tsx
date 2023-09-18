import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack,} from '@mui/material';
import {User} from "../../type/user/User";
import {ModalAddAndUpdate} from "../../type/template-data-grid/ModalAddAndUpdate";
import {useForm} from "react-hook-form";
import {MRT_Row} from "material-react-table";
import {usePatchUser} from "../../utils/api/user";
import {UserRequest} from "../../type/user/UserRequest";
import {UserLayoutPassword} from "./UserLayoutPassword";
import {ApiResponse} from "../../type/ApiResponse";

export const UpdatePassword = (
    props: {
        modalProps: ModalAddAndUpdate,
        paramsRequest: UserRequest,
        row: MRT_Row<User> | undefined
    }
) => {
    const {onClose, open, header} = props.modalProps;
    const user = {...props.row?.original ?? {id: -1, name: "", role: {roleName: ""}}};

    const {
        control,
        handleSubmit,
        getValues,
        formState: {errors}
    } = useForm<User>({
        defaultValues: {
            ...user
        }
    });

    const userPasswordUpdate =
        usePatchUser(+user.id, props.paramsRequest,
            (oldData): ApiResponse<User> => {
                return oldData;
            });

    const onSubmit = (data: User) => {
        userPasswordUpdate.mutate(data);
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
                            minWidth: {xs: '300px', sm: '360px', md: '400px'},
                            gap: '1.5rem',
                        }}>
                        <UserLayoutPassword control={control} errors={errors} getValues={getValues}/>
                    </Stack>
                    <DialogActions sx={{p: '1.25rem'}}>
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
