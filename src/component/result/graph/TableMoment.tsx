import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {observer} from "mobx-react-lite";
import {PointGraphMomentTemplate} from "../../../type/result/graph-result/PointGraphMomentTemplate";
import {PointGraphMomentBoolBar} from "../../../type/result/graph-result/PointGraphMomentBoolBar";

export const TableMoment = observer(
    (props:
         {
             data: PointGraphMomentTemplate|undefined,
             boolBars: PointGraphMomentBoolBar[] | undefined,
             idTableMoment: string
         }) => {
    const {data, boolBars, idTableMoment} = props;
    const rightMinAssistance = data?.rightMinAssistance;
    const rightMaxAssistance = data?.rightMaxAssistance;

    return (
        <TableContainer id = {idTableMoment} sx={{width: '50%', height: "700px"}} component={Paper}>
            <Table sx={{ width: '100%' }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell rowSpan={2} align="center">
                            Давление
                        </TableCell>
                        <TableCell colSpan={3} align="center">
                            Момент
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center">Максимум</TableCell>
                        <TableCell align="center">Номинал</TableCell>
                        <TableCell align="center">Минимум</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {
                        rightMinAssistance && rightMaxAssistance && boolBars &&
                        rightMinAssistance.length > 0 && rightMaxAssistance.length === rightMinAssistance.length &&
                            rightMaxAssistance.length === boolBars.length ?
                            rightMinAssistance.slice(0).reverse().map((min, index) => (
                            <TableRow key={`TableRowCommonCell${min?.bar + index}`}>
                                <TableCell align="center" key={`TableCellBar${min?.bar + index}`}> {min?.bar} </TableCell>
                                <TableCell colSpan={1} align="center" key={`TableCellMaxAssistance${min?.bar + index}`}>
                                    {rightMaxAssistance?.at(rightMaxAssistance.length - 1 - index)?.moment?.toFixed(2) ?? 0}
                                </TableCell>
                                <TableCell colSpan={1} align="center" key={`TableCellNormalize${min?.bar + index}`}>
                                    {boolBars?.at(rightMaxAssistance.length - 1 - index)?.moment?.toFixed(2)}
                                </TableCell>
                                <TableCell colSpan={1} align="center" key={`TableCellMinAssistance${min?.bar + index}`}>
                                    {min?.moment?.toFixed(2) ?? 0}
                                </TableCell>
                            </TableRow>
                        )) : null
                    }

                </TableBody>
            </Table>
        </TableContainer>
    );
});