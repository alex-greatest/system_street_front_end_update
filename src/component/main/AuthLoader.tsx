import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useGetProfile} from "../../utils/api/auth";
import {Loading} from "./Loading";
import {observer} from "mobx-react-lite";
import {TokenService} from "../../service/login/TokenService";
import {useStore} from "./RootStoreProvided";

export const AuthLoader = observer(() => {
    const location = useLocation();
    const authStore = useStore().authStore;
    const {
        isSuccess,
        isLoading,
        data
    } = useGetProfile();

    if(TokenService.getToken()) {
        authStore.updateAuth(true);
    }

    const isAccessIsAllowed = authStore.isAuth && isSuccess && data?.role?.roleName !== "ROLE_operator";

    if (isLoading) {
        return <Loading />;
    }

    return (
        isAccessIsAllowed ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />
    );
});
