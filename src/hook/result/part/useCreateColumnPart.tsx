import React, {useMemo} from "react";
import {MRT_ColumnDef} from "material-react-table";
import {Part} from "../../../type/result/part/Part";
import {useCreateStatusColumn} from "../useCreateStatusColumn";
import {TemplateSelectorFilter} from "../../../component/template/column/TemplateSelectorFilter";
import {StyleColumnResult} from "../../../component/template/column/StyleColumnResult";

export const useCreateColumnPart = (
    statusOperationsListName: string[]|undefined,
    modelDescriptionList: string[]|undefined) => {
    const dataForStatus =
        useCreateStatusColumn<Part>(
            statusOperationsListName, (cell) => <StyleColumnResult cell={cell} />,
            'Результат');
    const dataForStatusMemo = useMemo(() => dataForStatus, [dataForStatus]);
    return useMemo<MRT_ColumnDef<Part>[]>(
        () => [
            {
                accessorKey: 'partName',
                header: 'Код детали',
                enableColumnFilter: false
            },
            {
                accessorKey: 'status.statusName',
                ...dataForStatusMemo
            },
            {
                accessorKey: 'changeTime',
                header: 'Дата добавления',
                enableColumnFilter: false
            },
            {
                accessorKey: 'reference.modelDescription',
                header: 'Модель',
                enableColumnFilter: true,
                Filter: ({column}) => (
                    <TemplateSelectorFilter
                        column={column}
                        list={modelDescriptionList}
                        isListReady={!!modelDescriptionList} />
                ),
            },
        ],
        [dataForStatusMemo, modelDescriptionList],
    );
};
