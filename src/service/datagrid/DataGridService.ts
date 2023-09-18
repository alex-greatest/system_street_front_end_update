import {ModalAddAndUpdate} from "../../type/template-data-grid/ModalAddAndUpdate";
import {FuncOpen} from "../../type/helper/FuncOpen";
import {FuncRow} from "../../type/helper/FuncRow";

export abstract class DataGridService<T extends Record<string, any>> {
    public createModalProps(setOpen: FuncOpen,
                                   setRow: FuncRow<T>,
                                   open: boolean,
                                   header: string): ModalAddAndUpdate {
        return {
            onClose: () => {
                setOpen(false);
                setRow(undefined);
            },
            open: open,
            header: header
        };
    }
}