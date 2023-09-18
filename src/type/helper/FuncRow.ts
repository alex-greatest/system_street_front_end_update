import React from "react";
import {MRT_Row} from "material-react-table";

export type FuncRow<T extends Record<string, any>> = React.Dispatch<React.SetStateAction<MRT_Row<T>|undefined>>;