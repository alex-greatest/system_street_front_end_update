import React from 'react';
import {FormControl, MenuItem, Select} from "@mui/material";
import {MRT_Column} from "material-react-table";
import {observer} from "mobx-react-lite";

export const TemplateSelectorFilter = observer(<T extends Record<string, any>,>(
    props: {
        column: MRT_Column<T>,
        list: string[]|undefined,
        isListReady: boolean
    }) => {
    const {column, isListReady, list} = props;

    return (
        <FormControl variant="standard" sx={{ minWidth: '150px' }}>
            <Select
                value={(isListReady && column.getFilterValue()) || ""}
                onChange={e => column.setFilterValue(e.target.value)}
                id="defaultValueSelectorFilterId"
                key="defaultValueSelectorFilterKey">
                <MenuItem key={"statusOperationsListNameNullKey"} value={""}>Все</MenuItem>
                {list ? list.map(item =>
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
                ) : null}
            </Select>
        </FormControl>
    );
});