import React, {useEffect} from 'react';
import {Box, Button, Paper, Stack, TextField, Typography} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {AddressPlc} from "../type/AddressPlc";
import {useAddressPlc, useUpdateAddressPlc} from "../utils/api/addressPlc";
import {NotificationDisplayService} from "../service/NotificationDisplayService";
import {Id, ToastContainer} from "react-toastify";
import {observer} from "mobx-react-lite";

const PLC = observer(() => {
    const toastLoadingAddress: Id = 'toastLoadingAddress';
    const toastUpdateAddress: Id = 'toastUpdateAddress';
    const [isDisabledButton, setIsDisabledButton] = React.useState(false);
    const regexIp = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
    const {data, isError, isSuccess, isLoading} = useAddressPlc();
    const updateAddress= useUpdateAddressPlc(
        data?.id ?? 1,
        (oldData: AddressPlc, newData: AddressPlc) => newData);

    const formData = data ? data : {id: 1, ip: "", port: 0};

    const { control,
        handleSubmit,
        setValue,
        formState: {errors}} =
        useForm<AddressPlc>({
            defaultValues: {
                ...formData
            },
        });

    useEffect(() => {
        setValue('id', data?.id ?? 1);
        setValue('ip', data?.ip ?? "");
        setValue('port', data?.port ?? 0);
    }, [data, setValue]);

    const onSubmit = async (data: AddressPlc) => {
        try {
            NotificationDisplayService.showLoading(toastUpdateAddress);
            setIsDisabledButton(true);
            await updateAddress.mutateAsync(data);
            NotificationDisplayService.showMessageSuccess("Адрес успешно обновлён");
        } catch (error: any) {
            NotificationDisplayService.showMessageQuery(error, "toastUpdateAddressError");
        } finally {
            NotificationDisplayService.hideLoading(toastUpdateAddress);
            setIsDisabledButton(false);
        }
    };

    return (
        <>
            <ToastContainer />
            {isLoading && NotificationDisplayService.showLoading(toastLoadingAddress)}
            {(isSuccess || isError) && NotificationDisplayService.hideLoading(toastLoadingAddress)}
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Paper elevation={6} sx= {{ minHeight: 330, width: 350, mt: '10em' }}>
                    <Box sx={{p: "30px 50px"}}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack sx={{display: 'flex'}}>
                                <Typography variant="h5" sx={{ margin: '0 auto 1em'}}> Адрес PLC </Typography>
                            </Stack>
                            <Controller
                                name="ip"
                                control={control}
                                rules={{required: true, maxLength: 15,
                                    validate: value => value.match(regexIp) !== null
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField sx={{ mb: "20px" }}
                                               value={value}
                                               onChange={onChange}
                                               error={!!errors?.ip}
                                               helperText={errors?.ip ? "Неккоректный IP адрес" : null}
                                               label='IP*'
                                               id="ipPlcFieldId"
                                               key="ipPlcFieldKey"
                                               placeholder='Введите ip адрес*'
                                               fullWidth
                                    />
                                )}
                            />
                            <Controller
                                name="port"
                                control={control}
                                rules={{required: true, maxLength: 6, validate: (v) => v > 0 && v <= 65536}}
                                render={({ field: { onChange, value, } }) => (
                                    <TextField
                                        onChange={(e) =>
                                            onChange(!isNaN(Number(e.target.value)) ? e.target.value : "")}
                                               sx={{ mb: "20px" }}
                                               error={!!errors?.port}
                                               helperText={errors?.port ? "Неккоректный порт" : null}
                                               label='Порт'
                                               id="portPlcFieldId"
                                               key="portPlcFieldKey"
                                               value={value}
                                               placeholder='Введите порт*'
                                               fullWidth
                                               required
                                    />
                                )}
                            />
                            <Button type='submit'
                                    color='primary'
                                    variant="contained"
                                    disabled={isDisabledButton}
                                    sx={{ m: '8px 0' }} fullWidth>
                                Обновить
                            </Button>
                        </form>
                    </Box>
                </Paper>
            </Box>
        </>
    );
});

export default PLC;