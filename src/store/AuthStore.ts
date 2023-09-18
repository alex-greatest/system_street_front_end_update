import {action, makeObservable, observable, runInAction} from "mobx";
import {StoreService} from "../service/StoreService";

export default class AuthStore {
    public isAuth: boolean = false;
    private logoutChannel = new BroadcastChannel('logout');

    constructor() {
        makeObservable(this, {
            isAuth: observable,
            updateAuth: action,
        });
        this.createLogout();
    }

    private createLogout() {
        this.logoutChannel.onmessage = () => {
            runInAction(() => {
                this.isAuth = false;
                StoreService.removeAllData();
                this.logoutChannel.close();
            });
        }
    }

     updateAuth = (isAuthUpdate: boolean) => {
        this.isAuth = isAuthUpdate;
        if (!isAuthUpdate && this.logoutChannel) {
            this.logoutChannel.postMessage("logout");
        }
    }
}
