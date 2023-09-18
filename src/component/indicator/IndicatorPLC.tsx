import Box from "@mui/system/Box";
import React from "react";
import {Typography} from "@mui/material";
import {useQuery} from "react-query";
import axios, {AxiosResponse} from "axios";
import {apiRoutes} from "../../utils/routes";
import {PlcConnectionIndicator} from "../../type/PlcConnectionIndicator";
import {observer} from "mobx-react-lite";
import {globalConfig} from "../../utils/config";

export const IndicatorPLC =  observer(() => {
    const {data: plcConnection} = useQuery<AxiosResponse<PlcConnectionIndicator>>(
        'getIndicatorPlc',
        () => axios.get(`${globalConfig.config.apiUrl}${apiRoutes.getPlcIndication}`, {}),
        { retry: false,
            keepPreviousData: true,
            refetchInterval: 2000,
            refetchIntervalInBackground: true, }
    );

    return(
        <Box sx={{display: 'flex', gap: "0.3em", marginTop: 'auto', marginBottom: 'auto'}}>
            <Typography fontSize='20px' noWrap component="div">
                Связь с PLC
            </Typography>
            <Box sx={{width: '30px', height: '30px', bgcolor: plcConnection?.data?.isConnection ? 'green' : 'red',
                borderRadius: '50px' }}/>
        </Box>
    )
});
