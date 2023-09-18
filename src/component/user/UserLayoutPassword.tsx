import React from 'react';
import {IconButton, InputAdornment, TextField,
} from '@mui/material';
import {Control, Controller, FieldErrors, UseFormGetValues} from "react-hook-form";
import {User} from "../../type/user/User";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export const UserLayoutPassword = (
    props: {
        control: Control<User>,
        errors: FieldErrors<User>,
        getValues: UseFormGetValues<User>
    }) => {
    const {control, errors, getValues} = props;
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        React.useState(false);

    return (
        <>
            <Controller
                name="password"
                control={control}
                defaultValue = {getValues().password}
                rules={{required: true, minLength: 3}}
                render={({field: {onChange, value}}) => (
                    <TextField
                        id="passwordUserLayoutFieldId"
                        autoComplete={"off"}
                        type={showPassword ? 'text' : 'password'}
                        error={!!errors?.password}
                        key={"passwordUserLayoutFieldKey"}
                        label='Пароль *'
                        value={value || ""}
                        onChange={(e) =>
                            onChange(e.target.value.replace(/[^A-Za-z0-9]/ig,''))}
                        placeholder='Введите пароль *'
                        helperText={errors?.password ? "Необходимо ввести минимум три символа" : null}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        key="IconButtonPasswordUserConfirm"
                                        aria-label="Переключить"
                                        onClick={() => setShowPassword((show) => !show)}
                                        onMouseDown={(event) => event.preventDefault()}
                                        edge="end">
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                                )
                            }}
                    />
                )}
            />
            <Controller
                name="confirmPassword"
                control={control}
                defaultValue = {getValues().confirmPassword}
                rules={{required: true, minLength: 3,
                    validate: (v) => v === getValues().password || "Пароли не совпадают"
                }}
                render={({field: {onChange, value}}) => (
                    <TextField
                        id="confirmUserLayoutPasswordFieldId"
                        autoComplete={"off"}
                        type={showConfirmPassword ? 'text' : 'password'}
                        error={!!errors?.confirmPassword}
                        key={"confirmUserLayoutPasswordFieldKey"}
                        label='Подтвердите пароль *'
                        value={value || ""}
                        onChange={(e) =>
                            onChange(e.target.value.replace(/[^A-Za-z0-9]/ig,''))}
                        placeholder='Подтвердите пароль *'
                        helperText={errors?.confirmPassword?.type === 'validate' ? "Пароли не совпадают" :
                            errors?.confirmPassword ? "Необходимо ввести минимум три символа" : null}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        key="IconButtonPasswordUserConfirm"
                                        aria-label="Переключить"
                                        onClick={() => setShowConfirmPassword((show) => !show)}
                                        onMouseDown={(event) => event.preventDefault()}
                                        edge="end">
                                        {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                )}
            />
        </>
    );
};
