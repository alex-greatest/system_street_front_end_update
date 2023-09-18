import React, {useState} from 'react';
import {Box, Typography} from "@mui/material";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import {observer} from "mobx-react-lite";

type setTime = React.Dispatch<React.SetStateAction<Date>>;

export const DataTimeComponent = observer((
    props: {
        startTime: Date,
        endTime: Date
        setStartTime: setTime,
        setEndTime: setTime
    }) => {
    const {startTime, endTime, setStartTime, setEndTime} = props;
    const [startTimeTemp, setStartTimeTemp] = useState(startTime);
    const [endTimeTemp, setEndTimeTemp] = useState(endTime);

    return (
        <Box sx={{width: '100%', display: 'flex'}}>
            <Box sx={{display: 'flex', width: '50%', gap: '1em', margin: '1em 0 1em auto'}}>
                <Typography sx={{m: 'auto 0'}}>От</Typography>
                <DateTimePicker onChange={e =>
                    setStartTimeTemp(e?.toDate() ?? new Date())}
                                key={"dateTimePickerStartTime"}
                                value={dayjs(startTimeTemp)}
                                defaultValue={dayjs(startTimeTemp)} ampm={false} label="Начало"
                                slotProps={{
                                    actionBar: {
                                        actions: ['accept', 'today']
                                    },
                                }}/>
                <Typography sx={{m: 'auto 0'}}>До</Typography>
                <DateTimePicker onChange={e => setEndTimeTemp(e?.toDate() ?? new Date())}
                                key={"dateTimePickerEndTime"}
                                value={dayjs(endTimeTemp)}
                                defaultValue={dayjs(endTimeTemp)} ampm={false} label="Конец"
                                slotProps={{
                                    actionBar: {
                                        actions: ['accept', 'today']
                                    },
                                }}/>
                <Button sx={{width: '40%'}}
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            setStartTime(startTimeTemp);
                            setEndTime(endTimeTemp);
                        }}>
                    Найти
                </Button>
            </Box>
        </Box>
    );
});