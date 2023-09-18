import React, {FunctionComponent} from "react";
import {observer} from "mobx-react-lite";

const bars = new Map([[1, 1], [3, 2], [5, 3], [7, 4], [10, 5], [25, 6], [50, 7], [80, 8]]);

export const CustomDot: FunctionComponent<any> = observer((props: any) => {
    const { x, y, stroke, value } = props;

    if (bars.has(value)) {
        return (
            <>
                <svg x={x - 6} y={y - 6} width={50} height={50} fill="white">
                    <g transform="translate(6 6)">
                        <circle r="6" fill="#FFA500" />
                    </g>
                </svg>
                <text x={x} y={y} dy={-10} fill={stroke} fontSize={15} textAnchor="middle">
                    {value}
                </text>
            </>
        );
    }

    return null;
});