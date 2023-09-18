import React, {ReactElement} from 'react';
import ReactDOM from 'react-dom/client';
import {CssBaseline} from "@mui/material";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {BrowserRouter} from 'react-router-dom';
import {QueryCache, QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {NotificationDisplayService} from "./service/NotificationDisplayService";
import axios, {AxiosError} from "axios";
import {ObservedAxios} from "./component/main/AxiosInterceptor";
import {RootStoreProvider} from "./component/main/RootStoreProvided";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { ruRU } from '@mui/x-date-pickers/locales';
import {LocalizationProvider} from "@mui/x-date-pickers";
import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';
import dayjs from "dayjs";
import {ComponentPreviews, useInitial} from "./dev";
import {globalConfig, pathToProperties} from "./utils/config"
import {App} from "./App";

dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.locale("ru");

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, query) => {
            if (query.state.data !== undefined) {
                NotificationDisplayService.showMessageQuery(error as AxiosError, "toastGlobalIdErrorGet");
            }
        },
    })
});

const app: ReactElement =
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs}
                          adapterLocale={"ru"}
                          localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CssBaseline/>
                    <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
                        <RootStoreProvider>
                            <ObservedAxios>
                                <App />
                            </ObservedAxios>
                        </RootStoreProvider>
                    </DevSupport>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </BrowserRouter>
        </LocalizationProvider>
    </React.StrictMode>

axios.get(pathToProperties)
    .then((response) => {
        globalConfig.set(response.data);
        return app;
    })
    .catch((_) => {
        if (process.env.NODE_ENV === "development") {
            return app;
        } else {
            return (
                <p style={{ color: "red", textAlign: "center" }}>{"Не удалось загрузить конфигурацию"}</p>
            );
        }
    })
    .then((reactElement: ReactElement) => {
        ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(reactElement);
    });


