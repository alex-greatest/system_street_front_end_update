import React from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Typography,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import {ModalAddAndUpdate} from "../../type/template-data-grid/ModalAddAndUpdate";

export const DeleteDialog = (
    props:
        {
            modalProps: ModalAddAndUpdate,
            message: string,
            onAction: (id: number) => void,
            idNumber: number
        }) => {
    const {onClose, open, header} = props.modalProps;
    const {message, onAction, idNumber} = props;

    const onSubmit = () => {
        onAction(idNumber);
        onClose();
    };

    return (
        <Dialog maxWidth="sm" fullWidth open={open}>
            <DialogTitle textAlign="center">{header}</DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    <ErrorIcon fontSize={"large"} color={"error"} />
                    <Typography sx={{ wordBreak: "break-word" }} fontSize={"17px"}> {message} </Typography>
                </Box>
                <DialogActions sx={{ p: '1.25rem' }}>
                    <Button onClick={onSubmit} color="secondary" type="submit" variant="contained">
                        OK
                    </Button>
                    <Button onClick={onClose}>Выйти</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};
