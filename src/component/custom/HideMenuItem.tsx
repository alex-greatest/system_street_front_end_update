import {observer} from "mobx-react-lite";
import React from "react";
import {useGetProfile} from "../../utils/api/auth";

export const HideMenuItem = observer((props: {children: React.ReactNode}) => {
    const {children} = props;
    const {data: user, isSuccess} = useGetProfile();

    if (isSuccess && user?.role?.roleName === "ROLE_admin") {
        return <> {children} </>
    }

    return null;
});