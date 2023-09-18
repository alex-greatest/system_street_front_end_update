export class StoreService {
    public static addData(pagePath: string, data: object) {
        sessionStorage.setItem(pagePath, JSON.stringify(data));
    }

    public static getData(pagePath: string) {
        const value = sessionStorage.getItem(pagePath);
        return value ? JSON.parse(value) : null;
    }

    public static removeAllData() {
        sessionStorage.clear();
    }

    public static addDataLocal(pagePath: string, data: object) {
        localStorage.setItem(pagePath, JSON.stringify(data));
    }

    public static getDataLocal(pagePath: string) {
        const value = localStorage.getItem(pagePath);
        return value ? JSON.parse(value) : null;
    }

    public static removeDataLocal(pagePath: string) {
        localStorage.removeItem(pagePath);
    }
}