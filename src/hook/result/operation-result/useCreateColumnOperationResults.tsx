import React, {useMemo} from "react";
import {MRT_ColumnDef} from "material-react-table";
import {OperationResult} from "../../../type/result/operation-result/OperationResult";
import {Box} from "@mui/material";

export const useCreateColumnOperationResults = () => {
    return useMemo<MRT_ColumnDef<OperationResult>[]>(
        () => [
            {
                accessorKey: 'referenceTags.tags.pathTag',
                header: 'Путь к тегу',
                enableColumnFilter: false,
                enableHiding: true
            },
            {
                accessorKey: 'referenceTags.tags.description',
                header: 'Параметер',
                enableColumnFilter: false
            },
            {
                accessorKey: 'value',
                header: 'Результат',
                Cell: ({cell}) => (
                    cell.row?.original?.referenceTags?.tags?.typeOpc?.name === "Bool" ?
                    <Box
                        component="span"
                        sx={(theme) => ({
                            backgroundColor: cell.getValue() === "OK" ?
                                theme.palette.success.dark :
                                theme.palette.error.dark,
                            borderRadius: '0.25rem',
                            color: '#fff',
                            maxWidth: '9ch',
                            p: '0.25rem',
                        })}
                    >
                        {cell.getValue() as string}
                    </Box> : <Box> {cell.getValue() as string} </Box>
                ),
            },
            {
                accessorKey: 'referenceTags.tags.unit.name',
                header: 'Единицы измерения',
                enableColumnFilter: false
            },
        ],
        [],
    );
};
