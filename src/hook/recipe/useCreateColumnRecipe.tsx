import React, {useMemo} from "react";
import {MRT_ColumnDef} from "material-react-table";
import {TemplateSelectorFilter} from "../../component/template/column/TemplateSelectorFilter";
import {ReferenceTags} from "../../type/tag/ReferenceTags";

export const useCreateColumnRecipe = (typesOpc: string[]|undefined,
                                      units: string[]|undefined) => {
    return useMemo<MRT_ColumnDef<ReferenceTags>[]>(
        () => [
            {
                accessorKey: 'tags.pathTag',
                header: 'Тэг',
            },
            {
                accessorKey: 'tags.description',
                header: 'Комментарий',
            },
            {
                accessorKey: 'tags.typeOpc.name',
                header: 'Тип',
                Filter: ({column}) => (
                    <TemplateSelectorFilter
                        column={column}
                        list={typesOpc}
                        isListReady={!!typesOpc} />
                ),
            },
            {
                accessorKey: 'tags.unit.name',
                header: 'Единицы измерения',
                Filter: ({column}) => (
                    <TemplateSelectorFilter
                        column={column}
                        list={units}
                        isListReady={!!units} />
                ),
            },
            {
                accessorKey: 'user.name',
                header: 'Автор',
            },
            {
                accessorKey: 'changeTime',
                header: 'Дата изменения'
            },
            {
                accessorKey: 'value',
                header: 'Значение',
            },
        ],
        [typesOpc, units],
    );
};
