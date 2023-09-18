import * as React from 'react';
import {Typography, Box, Toolbar, IconButton, Container, Stack, Fab} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {AppBar} from "../../style/template/app-bar";
import {DrawerHeader} from "../../style/template/drawer";
import {CustomMenu} from "../custom/CustomMenu";
import {ReactElement} from "react";
import {CustomButton} from "../custom/CustomButton";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Indicators} from "../indicator/Indicators";
import {GetPageName} from "../../service/GetPageName";
import {useGetProfile} from "../../utils/api/auth";
import {TokenService} from "../../service/login/TokenService";
import {pageRoutes} from "../../utils/routes";
import {Loading} from "../main/Loading";
import {observer} from "mobx-react-lite";
import {useStore} from "../main/RootStoreProvided";
import {StoreService} from "../../service/StoreService";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {ScrollTop} from "../main/ScrollToTop";

const IndicatorsMemo = React.memo(Indicators);
const OutletMemo = React.memo(Outlet);

export const MainTemplate = observer((): ReactElement|null => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const authStore = useStore().authStore;
    const {data: user, isLoading} = useGetProfile();
    const locationParameter = useLocation();

    const logout = () => {
        TokenService.removeToken();
        authStore.updateAuth(false);
        StoreService.removeAllData();
        navigate(pageRoutes.auth, {replace: true});
    }

    return (
        isLoading ? <Loading /> : <Stack sx={{height: '100vh'}}>
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{gap: '1em'}}>
                    <IconButton color="inherit" aria-label="open drawer" onClick={() => setOpen(!open)} edge="start"
                                sx={{marginRight: 5}}>
                        <MenuIcon/>
                    </IconButton>
                    <IndicatorsMemo />
                    <Typography variant="h6" noWrap component="div">
                        {user?.name}
                    </Typography>
                    <CustomButton onClick={logout}
                                  type='submit' variant="contained"
                                  sx={{backgroundColor: '#9698a2'}}>Выход</CustomButton>
                </Toolbar>
            </AppBar>
            <Box sx={{display: 'flex', height: '100%'}}>
                <CustomMenu open={open}/>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <DrawerHeader/>
                    <Typography id="back-to-top-anchor" sx={{fontSize: '27px', marginBottom: '1em', marginLeft: '1em'}}>
                        {GetPageName.getPageName(locationParameter)}
                    </Typography>
                    <Container maxWidth="xl" sx={{height: '100%'}}>
                        <OutletMemo/>
                        <ScrollTop>
                            <Fab size="small" aria-label="scroll back to top">
                                <KeyboardArrowUpIcon />
                            </Fab>
                        </ScrollTop>
                    </Container>
                </Box>
            </Box>
        </Stack>
    );
})
