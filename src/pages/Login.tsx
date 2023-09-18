import React, {ReactElement, useState} from 'react';
import {Paper, Avatar, TextField, Button, Box, Stack, InputAdornment, IconButton} from '@mui/material';
import {Controller, useForm} from "react-hook-form";
import {LoginFormInputs} from "../type/login/LoginFormInputs";
import {login} from "../utils/api/auth";
import {AxiosResponse} from "axios";
import {Tokens} from "../type/login/Tokens";
import {useQueryClient} from "react-query";
import {TokenService} from "../service/login/TokenService";
import {NotificationDisplayService} from "../service/NotificationDisplayService";
import {Loading} from "../component/main/Loading";
import 'react-toastify/dist/ReactToastify.css';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {pageRoutes} from "../utils/routes";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {ToastContainer} from "react-toastify";
import {useStore} from "../component/main/RootStoreProvided";

export const Login = observer((): ReactElement|null => {
    const queryClient= useQueryClient();
    const authStore = useStore().authStore;
    const navigate: NavigateFunction = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const { control, handleSubmit} =
        useForm<LoginFormInputs>({
            defaultValues: {
                userName: "",
                password: ""
            },
        });

    const onSubmit = async (data: LoginFormInputs): Promise<void> => {
        setLoading(true);
        try {
            const resp: AxiosResponse<Tokens, any> = await login(data.userName, data.password);
            if (!resp.data.accessToken) {
                NotificationDisplayService.showMessageError("Не удалось авторизоваться!");
                return;
            }
            TokenService.setToken(resp.data);
            queryClient.clear();
            authStore.updateAuth(true);
            navigate(pageRoutes.main, { replace: true });
        } catch (e: any) {
            NotificationDisplayService.showMessageForLogin(e);
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
            <ToastContainer />
            {isLoading ? <Loading /> :
                <Box sx={{display: 'flex', alignItems: 'center', 'justifyContent': 'center', height: '100vh'}}>
                    <Paper elevation={6} sx= {{ width: 390 }}>
                        <Box sx={{p: "30px 50px"}}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Stack sx={{display: 'flex'}}>
                                    <Avatar sx={{ backgroundColor:'#1bbd7e', margin: 'auto' }}></Avatar>
                                    <h2 style={{ margin: '14px auto 20px'}}> Вход </h2>
                                </Stack>
                                <Controller
                                    name="userName"
                                    control={control}
                                    rules={{required: true}}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            sx={{ mb: "20px" }}
                                            onChange={(e) =>
                                                onChange(e.target.value.replace(/[^A-Za-z0-9]/ig,''))}
                                            label='Имя'
                                            id="userNameFieldLoginId"
                                            key="userNameFieldLoginKey"
                                            value={value || ""}
                                            placeholder='Введите имя'
                                            fullWidth
                                            required
                                        />
                                    )}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{required: true}}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            sx={{ mb: "15px" }}
                                            id="passwordFielLogindId"
                                            autoComplete={"on"}
                                            type={showPassword ? 'text' : 'password'}
                                            key={"passwordFieldLoginKey"}
                                            label='Пароль'
                                            value={value || ""}
                                            onChange={(e) =>
                                                onChange(e.target.value.replace(/[^A-Za-z0-9]/ig,''))}
                                            placeholder='Введите пароль'
                                            fullWidth
                                            required
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowPassword((show) => !show)}
                                                            onMouseDown={(event) =>
                                                                event.preventDefault()}
                                                            edge="end">
                                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    )}
                                />
                                <Button type='submit'
                                        color='primary'
                                        variant="contained"
                                        sx={{ m: '8px 0' }} fullWidth>
                                    Войти
                                </Button>
                            </form>
                        </Box>
                    </Paper>
                </Box>}
        </>
    );
})
