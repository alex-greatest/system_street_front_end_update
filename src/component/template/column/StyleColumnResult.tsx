import React from "react";
import {Box} from "@mui/material";
import {observer} from "mobx-react-lite";
import {MRT_Cell} from "material-react-table";

export const StyleColumnResult = observer(<T extends Record<string, any>,>
(props: {cell: MRT_Cell<T>}) => {

    const {cell} = props;

    return (
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
        </Box>
    );
});
