import * as React from "react";
import {Drawer, DrawerHeader} from "../../style/template/drawer";
import {Box, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import {ReactComponent as Logo} from "../../logo.svg"
import {ReactComponent as MiniLogo} from "../../mini-logo.svg";
import {ReactElement} from "react";
import { Link, LinkProps } from "react-router-dom";
import DatasetIcon from '@mui/icons-material/Dataset';
import LanIcon from '@mui/icons-material/Lan';
import SettingsIcon from '@mui/icons-material/Settings';
import CompressIcon from '@mui/icons-material/Compress';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import SaveIcon from '@mui/icons-material/Save';
import {HideMenuItem} from "./HideMenuItem";
import BuildIcon from '@mui/icons-material/Build';
import LoopIcon from '@mui/icons-material/Loop';
import TimelineIcon from '@mui/icons-material/Timeline';
import {observer} from "mobx-react-lite";

export const CustomMenu = observer(({open}: {open: boolean}): ReactElement|null => {
    const [openRecipe, setOpenRecipe] = React.useState(false);

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader sx={{justifyContent: 'center', alignItems: 'flex-end'}}>
                <Box>
                    {open ? <Logo /> : <MiniLogo />}
                </Box>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItemButton component={Link as React.ComponentType<LinkProps>} to="/"
                                key="partsListItemLink"
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}>
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}>
                        <BuildIcon />
                    </ListItemIcon>
                    <ListItemText primary="Рулевые механизмы" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                <Divider />
                <ListItemButton component={Link as React.ComponentType<LinkProps>} to="/operations"
                                key="operationstListItemLink"
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}>
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}>
                        <LoopIcon />
                    </ListItemIcon>
                    <ListItemText primary="Результаты циклов" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                <Divider />
                <ListItemButton
                    key="recipeSettingsListItemLink"
                    onClick={() => setOpenRecipe(!openRecipe)}
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}>
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Настройки" sx={{ opacity: open ? 1 : 0 }} />
                    {openRecipe ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Divider />
                <Collapse in={openRecipe} timeout="auto" unmountOnExit>
                    <List>
                        <ListItemButton component={Link as React.ComponentType<LinkProps>} to="/reference"
                                        key="referenceListItemLink"
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}>
                                <PermDataSettingIcon />
                            </ListItemIcon>
                            <ListItemText primary="Управление типами" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton component={Link as React.ComponentType<LinkProps>} to="/tags"
                                        key="recipeListItemLink"
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}>
                                <DatasetIcon />
                            </ListItemIcon>
                            <ListItemText primary="Рецепты" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton component={Link as React.ComponentType<LinkProps>} to="/tag_results"
                                        key="tagsResultListItemLink"
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}>
                                <SaveIcon />
                            </ListItemIcon>
                            <ListItemText primary="Теги для сохранения" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton component={Link as React.ComponentType<LinkProps>} to="/recipe_graph_moment"
                                        key="recipeGraphMomentListItemLink"
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}>
                                <TimelineIcon />
                            </ListItemIcon>
                            <ListItemText primary="График момента" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton component={Link as React.ComponentType<LinkProps>} to="/recipe_graph_pressure"
                                        key="recipeGraphPressuretListItemLink"
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}>
                                <CompressIcon />
                            </ListItemIcon>
                            <ListItemText primary="График давления" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                        <Divider />
                        <HideMenuItem>
                            <ListItemButton
                                component={Link as React.ComponentType<LinkProps>} to="/users"
                                key="usersListItemLink"
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5}}>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}>
                                    <PeopleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Пользователи" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton
                                component={Link as React.ComponentType<LinkProps>} to="/plc"
                                key="plcListItemLink"
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5
                                }}>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}>
                                    <LanIcon />
                                </ListItemIcon>
                                <ListItemText primary="Сеть PLC" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </HideMenuItem>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );
});