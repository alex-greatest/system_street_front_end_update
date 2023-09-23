import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {observer} from "mobx-react-lite";
import {StoreService} from "../../service/StoreService";

type setTime = React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;

export const DataTimeComponent = observer((
    props: {
        startTime: dayjs.Dayjs,
        endTime: dayjs.Dayjs
        setStartTime: setTime,
        setEndTime: setTime
    }) => {
    const {startTime, endTime, setStartTime, setEndTime} = props;
    const [firstRender, setFirstRender] = useState(false);

    useEffect(() => {
        const storageOperation = StoreService.getData("/parts_time");
        const startTimeStorage = storageOperation?.startTime;
        const endTimeStorage = storageOperation?.endTime;
        setStartTime(startTimeStorage ?? dayjs().startOf('day'));
        setEndTime(endTimeStorage ??  dayjs().endOf('day'));
        setFirstRender(true);
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (firstRender) {
            StoreService.addData("/parts_time", {
                startTime,
                endTime
            });
        }
        //eslint-disable-next-line
    }, [endTime, startTime]);

    return (
        <Box sx={{width: '100%', display: 'flex'}}>
            <Box sx={{display: 'flex', width: '50%', gap: '1em', margin: '1em 0 1em auto'}}>
                <Typography sx={{m: 'auto 0'}}>От</Typography>
                <DateTimePicker onChange={e =>
                    setStartTime(e ?? dayjs().startOf('day'))}
                                key={"dateTimePickerStartTime"}
                                value={dayjs(startTime)}
                                defaultValue={dayjs(startTime)} ampm={false} label="Начало"
                                slotProps={{
                                    actionBar: {
                                        actions: ['accept', 'today']
                                    },
                                }}/>
                <Typography sx={{m: 'auto 0'}}>До</Typography>
                <DateTimePicker onChange={e => setEndTime(e ?? dayjs().endOf('day'))}
                                key={"dateTimePickerEndTime"}
                                value={dayjs(endTime)}
                                defaultValue={dayjs(endTime)} ampm={false} label="Конец"
                                slotProps={{
                                    actionBar: {
                                        actions: ['accept', 'today']
                                    },
                                }}/>
            </Box>
        </Box>
    );
});