import {Theme} from "@mui/material/styles";

const drawerWidth = 240;

export const common_style_header_footer = (theme: Theme, open: boolean|undefined) => {
    return {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
        ...(!open && {
            width: `calc(100% - ${theme.spacing(7)})`,
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${theme.spacing(8)} - 1px)`,
            },
        }),
    }
}