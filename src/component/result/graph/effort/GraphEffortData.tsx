import React, {useMemo} from 'react';
import {observer} from "mobx-react-lite";
import {useGetGraphResultEffort} from "../../../../utils/api/graph-result";
import {Typography} from "@mui/material";
import {LineChartGraphEffort} from "./LineChartGraphEffort";

export const GraphEffortData = observer((props:
                                         {
                                             operationId: string | -1,
                                             idGraphEffort: string,
                                             setLoadedFirstLine?: React.Dispatch<React.SetStateAction<boolean>>,
                                         }) => {
    const {
        operationId,
        idGraphEffort,
        setLoadedFirstLine
    } = props;

    const {
        data,
        isError,
        isSuccess
    } = useGetGraphResultEffort(isNaN(+operationId) ? -1 : +operationId);

    const dataMemo = useMemo(() => data, [data]);

    if (isError || (isSuccess && (!data || !data.pointsGraphLeft || data.pointsGraphLeft.length === 0))) {
        return <Typography color={"primary.error"}> Ошибка загрузки графика усилия </Typography>
    }

    return (
        <LineChartGraphEffort idGraphEffort={idGraphEffort} data={dataMemo} setLoadedFirstGraph={setLoadedFirstLine}/>
    );
});