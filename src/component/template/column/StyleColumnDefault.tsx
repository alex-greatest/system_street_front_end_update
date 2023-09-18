import React from "react";
import {Box} from "@mui/material";
import {observer} from "mobx-react-lite";
import {MRT_Cell} from "material-react-table";

export const StyleColumnDefault = observer(<T extends Record<string, any>,>
(props: {cell: MRT_Cell<T>}) => {

    const {cell} = props;

    return (
        <Box>
            {cell.getValue() as string}
        </Box>
    );
});
