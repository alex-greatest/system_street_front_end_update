import React from 'react';
import {Box, IconButton} from "@mui/material";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {observer} from "mobx-react-lite";
import {Clear} from "@mui/icons-material";

export const DataTimeComponentFilter = observer((props: {
    startTime: Date|null,
    endTime: Date|null,
    setStartTime: React.Dispatch<React.SetStateAction<Date|null>>,
    setEndTime: React.Dispatch<React.SetStateAction<Date|null>>
}) => {
    const {
        startTime,
        endTime,
        setStartTime,
        setEndTime} = props;

    return (
        <Box sx={{display: 'flex', gap: "5px", marginTop: '1em'}}>
            <DateTimePicker
                onChange={(e) => setStartTime(e?.toDate() ?? new Date())}
                sx={{width: '215px'}}
                key={"dateTimePickerEndStart"}
                value={startTime ? dayjs(startTime) : null}
                defaultValue={null} ampm={false} label="Начало"
                slotProps={{
                    actionBar: {
                        actions: ['accept', 'today']
                    },
                }}/>
            <DateTimePicker
                onChange={(e) => setEndTime(e?.toDate() ?? new Date())}
                sx={{width: '215px'}}
                key={"dateTimePickerEndTime"}
                value={endTime ? dayjs(endTime) : null}
                defaultValue={null} ampm={false} label="Конец"
                slotProps={{
                    actionBar: {
                        actions: ['accept', 'today']
                    },
                }}/>
            <IconButton onClick={() => {
                setStartTime(null);
                setEndTime(null);
            }}
                        edge="end">
                <Clear />
            </IconButton>
        </Box>
    );
});