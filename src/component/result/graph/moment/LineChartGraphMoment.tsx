import React, {useEffect, useState} from 'react';
import {
    CartesianGrid,
    Label, LabelList,
    Legend,
    Line,
    LineChart, ReferenceLine,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts";
import {observer} from "mobx-react-lite";
import {CustomDot} from "../CustomDot";
import {Box} from "@mui/material";
import {TableMoment} from "../TableMoment";
import {GraphResultMomentResponse} from "../../../../type/result/graph-result/GraphResultMomentResponse";

export const LineChartGraphMoment = observer((props:
                                         {
                                             data: GraphResultMomentResponse | undefined
                                             idGraphMoment: string,
                                             idTableMoment: string,
                                             setLoadedSecondGraph?: React.Dispatch<React.SetStateAction<boolean>>
                                         }) => {
    const {
        data,
        idGraphMoment,
        idTableMoment,
        setLoadedSecondGraph} = props;
    const isExistsStatusNokBool = data?.boolBars?.find((boolBar) => !boolBar.status);
    const [isLoadFirstLine, setIsLoadFirstLine] = useState(false);
    const [isLoadSecondLine, setIsLoadSecondLine] = useState(false);
    const [isLoadThirdLine, setIsLoadThirdLine] = useState(false);
    const [isLoadFourthLine, setIsLoadFourthLine] = useState(false);
    const [isLoadFifthLine, setIsLoadFifthLine] = useState(false);

    useEffect(() => {
        const isReady = isLoadFirstLine && isLoadSecondLine && isLoadThirdLine && isLoadFourthLine && isLoadFifthLine;
        if (isReady) {
            setLoadedSecondGraph && setLoadedSecondGraph(true);
            setIsLoadFirstLine(false);
            setIsLoadSecondLine(false);
            setIsLoadThirdLine(false);
            setIsLoadFourthLine(false);
            setIsLoadFifthLine(false);
        }
    }, [isLoadFirstLine, isLoadFifthLine, isLoadFourthLine, isLoadSecondLine, isLoadThirdLine, setLoadedSecondGraph]);

    return (
        <Box sx={{width: '100%', display: 'flex', gap: '2em', padding: "0 1em"}}>
            <ResponsiveContainer key={"responsiveContainerGraphMoment"} id={idGraphMoment} width={"50%"} height={900}>
                <LineChart
                    key={"lineChartGraphMoment"}
                    width={500}
                    height={300}
                    margin={{
                        top: 5,
                        right: 25,
                        left: 20,
                        bottom: 25
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Legend verticalAlign="top"/>
                    <XAxis allowDecimals={true} tickCount={20} interval={0} dataKey="moment" type="number" allowDuplicatedCategory={false}>
                        <Label style={{fill: 'blue', fontSize: '25px',}} offset={-100} dy={25} position="center" >
                            Момент
                        </Label>
                    </XAxis>
                    <YAxis dataKey="bar"
                           type="number"
                           allowDecimals={true}
                           allowDuplicatedCategory={false}
                           strokeWidth={0}
                           label={{
                               style: { textAnchor: "middle" },
                               angle: -90,
                               position: "left",
                               offset: 0}}>
                        <Label style={{fill: 'blue', fontSize: '25px',}} angle={-90} dx={-20} position="center" >
                            Давление
                        </Label>
                    </YAxis>
                    <Line
                        data={data?.pointsGraph}
                        onAnimationEnd={() => {setIsLoadFirstLine(true)}}
                        type="linear"
                        dataKey="bar"
                        stroke="#FFA500"
                        activeDot={{ r: 8 }}
                        dot={false}
                        name="Разница давлений">
                        <LabelList content={<CustomDot />} />
                    </Line>
                    <Line
                        data={data?.graphResultMomentTemplate?.rightMinAssistance}
                        onAnimationEnd={() => {setIsLoadSecondLine(true)}}
                        type="linear"
                        dataKey="bar"
                        stroke="green"
                        legendType={'none'}
                        activeDot={{ r: 8 }}
                        dot={true}
                        strokeDasharray={"3, 3"}
                        name="Минимум" />
                    <Line
                        data={data?.graphResultMomentTemplate?.rightMaxAssistance}
                        onAnimationEnd={() => {setIsLoadThirdLine(true)}}
                        dataKey="bar"
                        stroke="#8b00ff"
                        activeDot={{ r: 8 }}
                        strokeDasharray={"3, 3"}
                        name="Максимум" />
                    <Line
                        data={data?.graphResultMomentTemplate?.leftMinAssistance}
                        onAnimationEnd={() => {setIsLoadFourthLine(true)}}
                        type="linear"
                        dataKey="bar"
                        stroke="green"
                        activeDot={{ r: 8 }}
                        dot={true}
                        strokeDasharray={"3, 3"}
                        name="Минимум" />
                    <Line
                        data={data?.graphResultMomentTemplate?.leftMaxAssistance}
                        onAnimationEnd={() => {setIsLoadFifthLine(true)}}
                        type="linear"
                        dataKey="bar"
                        stroke="#8b00ff"
                        legendType={'none'}
                        activeDot={{ r: 8 }}
                        strokeDasharray={"3, 3"}
                        name="Максимум" />
                    <ReferenceLine
                        x={0}
                        stroke="gray"
                        strokeWidth={1.5}
                        strokeOpacity={0.65}
                    />
                    {isExistsStatusNokBool && <Line
                        type="linear"
                        stroke="red"
                        name="NOK" /> }
                    {data?.boolBars && isExistsStatusNokBool && data?.boolBars?.map((bar, index) => (
                        !data.boolBars.at(index)?.status &&
                            <ReferenceLine
                                key={`graphMomentNokLine${bar.bar}`}
                                x={bar?.moment ?? 0}
                                stroke="red"
                                strokeWidth={1.5}
                                strokeOpacity={1}
                            >
                                <Label style={{fontSize: '20px',}} angle={-90} dx={-20} position="right" >
                                    {`Момент: ${bar.moment}`}
                                </Label>
                            </ReferenceLine>
                    ))}
                </LineChart>
            </ResponsiveContainer>
            <TableMoment data={data?.graphResultMomentTemplate} boolBars={data?.boolBars}
                         idTableMoment={idTableMoment}/>
        </Box>
    );
});