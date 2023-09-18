import React from "react";
import {MRT_Cell, MRT_ColumnDef} from "material-react-table";
import {TemplateSelectorFilter} from "../../component/template/column/TemplateSelectorFilter";

export const useCreateStatusColumn = <T extends Record<string, any>,>(
    statusOperationsListName: string[]|undefined,
    component: (cell: MRT_Cell<T>) => React.JSX.Element,
    header: string):
    MRT_ColumnDef<T> => {
    return {
        header: header,
        enableColumnFilter: true,
        Filter: ({column}) => (
            <TemplateSelectorFilter
                column={column}
                list={statusOperationsListName}
                isListReady={!!statusOperationsListName} />
        ),
        Cell: ({cell}) => (
            component(cell)
        ),
    };
}
