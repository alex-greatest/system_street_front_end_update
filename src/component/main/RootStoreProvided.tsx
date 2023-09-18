import {createContext, useContext} from "react";
import {RootStore} from "../../store/RootStore";

const rootStore = new RootStore();
export const RootStoreContext = createContext(rootStore);

export const useStore = () => {
    return useContext<typeof rootStore>(RootStoreContext);
};

export const RootStoreProvider = (props: { children: any }) => {
    return (
        <RootStoreContext.Provider value={rootStore}>
            {props.children}
        </RootStoreContext.Provider>
    );
}