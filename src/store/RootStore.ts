import AuthStore from "./AuthStore";

export class RootStore {
    private readonly _auth: AuthStore;

    constructor() {
        this._auth = new AuthStore();
    }

    get authStore() {
        return this._auth;
    }
}