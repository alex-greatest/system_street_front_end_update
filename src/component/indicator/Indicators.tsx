import Box from "@mui/system/Box";
import React from "react";
import {IndicatorPLC} from "./IndicatorPLC";
import {IndicatorDB} from "./IndicatorDB";
import {observer} from "mobx-react-lite";

export const Indicators = observer(() => {
    return(
        <Box sx={{display: 'flex',
            marginLeft: 'auto',
            gap: '1em',
            marginRight: '2em',
            height: '100%'}}>
            <IndicatorPLC />
            <IndicatorDB />
        </Box>
    )
});
