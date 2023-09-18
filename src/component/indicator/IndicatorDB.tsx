import Box from "@mui/system/Box";
import React from "react";
import {Typography} from "@mui/material";
import {useQuery} from "react-query";
import {HealthDB} from "../../type/HealthDB";
import {apiRoutes} from "../../utils/routes";
import axios, {AxiosResponse} from "axios";
import {observer} from "mobx-react-lite";
import {globalConfig} from "../../utils/config";

export const IndicatorDB =  observer(() => {
    const {data: healthDB} = useQuery<AxiosResponse<HealthDB>>(
        'getIndicatorDB',
        () => axios.get(`${globalConfig.config.apiUrl}${apiRoutes.getDBIndication}`, {}),
        { retry: false,
            keepPreviousData: true,
            refetchInterval: 2000,
            refetchIntervalInBackground: true, }
    );

    return(
        <Box sx={{display: 'flex', gap: "0.3em", marginTop: 'auto', marginBottom: 'auto'}}>
            <Typography fontSize='20px' noWrap component="div">
                Связь с БД
            </Typography>
            <Box sx={{width: '30px', height: '30px', bgcolor: healthDB?.data?.status === 'UP' ? 'green' : 'red',
                borderRadius: '50px' }}/>
        </Box>
    )
});
