import React, {useMemo} from 'react';
import {observer} from "mobx-react-lite";
import {useGetGraphResultMoment} from "../../../../utils/api/graph-result";
import {Typography} from "@mui/material";
import {LineChartGraphMoment} from "./LineChartGraphMoment";

export const GraphMomentData = observer((props:
                                         {
                                             operationId: string | -1,
                                             modelDescription: string
                                             idGraphMoment: string,
                                             idTableMoment: string,
                                             setLoadedSecondGraph?: React.Dispatch<React.SetStateAction<boolean>>,
                                         }) => {
    const {
        operationId,
        modelDescription,
        idGraphMoment,
        idTableMoment,
        setLoadedSecondGraph
    } = props;

    const {
        data,
        isError,
        isSuccess
    } = useGetGraphResultMoment(modelDescription, isNaN(+operationId) ? -1 : +operationId);

    const dataMemo = useMemo(() => data, [data])

    if (isError || (isSuccess && (!data || !data.pointsGraph || data.pointsGraph.length === 0))) {
        return <Typography color={"primary.error"}> Ошибка загрузки графика усилия </Typography>
    }

    return (
        <LineChartGraphMoment
            data={dataMemo}
            idGraphMoment={idGraphMoment}
            idTableMoment={idTableMoment}
            setLoadedSecondGraph={setLoadedSecondGraph}/>
    );
});