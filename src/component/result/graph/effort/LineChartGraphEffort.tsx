import React, {useEffect, useState} from 'react';
import {
    CartesianGrid,
    Label,
    Legend,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    XAxis,
    YAxis
} from "recharts";
import {observer} from "mobx-react-lite";
import {GraphResultEffortResponse} from "../../../../type/result/graph-result/GraphResultEffortResponse";

export const LineChartGraphEffort = observer((props:
                                         {
                                             data: GraphResultEffortResponse | undefined
                                             idGraphEffort: string,
                                             setLoadedFirstGraph?: React.Dispatch<React.SetStateAction<boolean>>,
                                         }) => {
    const [isLoadFirstLine, setIsLoadFirstLine] = useState(false);
    const [isLoadSecondLine, setIsLoadSecondLine] = useState(false);
    const {data, idGraphEffort, setLoadedFirstGraph} = props;

    useEffect(() => {
        if (isLoadFirstLine && isLoadSecondLine) {
            setLoadedFirstGraph && setLoadedFirstGraph(true);
            setIsLoadFirstLine(false);
            setIsLoadSecondLine(false);
        }
    }, [isLoadFirstLine, isLoadSecondLine, setLoadedFirstGraph]);

    return (
        <ResponsiveContainer key={"responsiveContainerGraphEffort"} id={idGraphEffort} width={"80%"} height={750}>
            <LineChart
                key={"lineChartGraphEffort"}
                width={500}
                height={300}
                margin={{
                    top: 5,
                    right: 25,
                    left: 20,
                    bottom: 25
                }}>
                <CartesianGrid horizontal={true} vertical={true} />
                <XAxis
                    type="number"
                    domain={[(dataMin: number) => Math.round(dataMin),
                        (dataMax: number) => Math.round(dataMax)]}
                    dataKey="x">
                    <Label style={{fill: 'blue', fontSize: '25px',}} offset={-100} dy={25} position="center" >
                        Ход рейки, мм
                    </Label>
                </XAxis>
                <YAxis type="number"
                       tickCount={8} interval={0}
                       dataKey={"y"}
                       domain={[(dataMin: number) => Math.round((dataMin * 0.33) + dataMin),
                           (dataMax: number) => Math.round((dataMax * 0.33) + dataMax)]}>
                    <Label style={{fill: 'blue', fontSize: '25px',}} angle={-90} dx={-20} position="center" >
                        Усилие преремещения рейки, Н
                    </Label>
                </YAxis>
                <Legend verticalAlign="top"/>
                <Line
                    onAnimationEnd={() => {setIsLoadFirstLine(true)}}
                    type="monotone"
                    data={data?.pointsGraphRight}
                    dataKey="y"
                    stroke="#FFA500"
                    activeDot={{ r: 8 }}
                    dot={false}
                    name="Усилие слева"
                />
                <Line
                    onAnimationEnd={() => {setIsLoadSecondLine(true)}}
                    name="Усилие справа"
                    data={data?.pointsGraphLeft}
                    type="monotone"
                    dataKey="y"
                    stroke="#0000FF"
                    dot={false}
                />
                <Line name="Среднее значение справа" dataKey="y" stroke="green" />
                <Line name="Среднее значение слева" strokeDasharray="1 3" dataKey="y" stroke="red" />
                <ReferenceLine strokeDasharray="15 3" name={"Среднее значение справа"} y={data?.cwAvg} stroke="green" />
                <ReferenceLine strokeDasharray="10 7" name={"Среднее значение слева"} y={data?.cwwAvg} stroke="red" />
            </LineChart>
        </ResponsiveContainer>
    );
});