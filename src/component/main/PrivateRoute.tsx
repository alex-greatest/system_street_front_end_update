import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useGetProfile} from "../../utils/api/auth";
import {observer} from "mobx-react-lite";
import {Loading} from "./Loading";

export const PrivateRoute = observer(() => {
    const location = useLocation();
    const {
        isSuccess,
        isLoading,
        data
    } = useGetProfile();

    if (isLoading) {
        return <Loading />;
    }

    return (
        isSuccess && data?.role?.roleName === "ROLE_admin" ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
    );
});