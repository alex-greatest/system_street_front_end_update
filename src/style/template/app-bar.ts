import {styled} from "@mui/material/styles";
import {AppBarProps} from "../../type/AppBarProps";
import MuiAppBar from '@mui/material/AppBar';
import {StyledComponent} from "@emotion/styled";
import {common_style_header_footer} from "./common_style_header_footer";

export const AppBar: StyledComponent<any> = styled(MuiAppBar, {
    shouldForwardProp: (prop: PropertyKey): boolean => prop !== 'open'})
    <AppBarProps>(({theme, open}) => ({
        ...common_style_header_footer(theme, open),
}));
