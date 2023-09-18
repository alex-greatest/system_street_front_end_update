import React, {useState} from 'react';
import {Box, Stack, TextField, Tooltip, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {observer} from "mobx-react-lite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";
import {pageRoutes} from "../../utils/routes";

type setPart = React.Dispatch<React.SetStateAction<string>>;

export const InputPartName = observer((props: { partName: string, setPartName: setPart, modelDescription: string}) => {
    const {partName, setPartName, modelDescription} = props;
    const [value, setValue] = useState(partName);
    const navigate = useNavigate();

    return (
        <Box sx={{width: '100%', display: 'flex', marginTop: '5em'}}>
            <Stack>
                <Tooltip sx={{margin: '1em'}} title={"К списку деталей"}>
                    <ArrowBackIcon fontSize={"large"} color={"primary"}
                                   onClick={() => navigate(pageRoutes.main, { replace: true })} />
                </Tooltip>
                {partName &&
                    <Typography sx={{margin: 'auto 0 1em 1em'}} variant="h5" component="div">
                        Выбранный механизм: {partName}
                    </Typography>
                }
                {modelDescription &&
                    <Typography sx={{margin: 'auto 0 1em 1em'}} variant="h5" component="div">
                        Тип механизма: {modelDescription}
                    </Typography>
                }
            </Stack>
            <Box sx={{display: 'flex', width: '35%', gap: '1em', margin: '1em 0 1em auto'}}>
                <TextField
                    key={"InputPartNamePartData"}
                    sx={{width: '60%'}}
                    value={value}
                    onChange={(e) => { setValue(e.target.value) }}
                />
                <Button sx={{width: '40%', maxHeight: '55px'}} color="primary" onClick={() => setPartName(value)}  variant="contained">
                    Найти
                </Button>
            </Box>
        </Box>
    );
});