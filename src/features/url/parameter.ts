import { urlPropKey } from "../../types";


class URLParameter {
    params: URLSearchParams;

    constructor() {
        this.params = new URLSearchParams(window.location.search);
    }

    get(key: urlPropKey, defaultValue: any): string | any;
    get(key: urlPropKey, defaultValue?: any): string | any | undefined {
        const value = this.params.get(key);
        return value != undefined ? value : defaultValue;
    }

    getInt(key: urlPropKey, defaultValue: number): number;
    getInt(key: urlPropKey, defaultValue?: number): number | undefined {
        const value = this.get(key, defaultValue);
        return value ? parseInt(value) : undefined;
    }

    getJSON(key: urlPropKey, defaultValue: any): any;
    getJSON(key: urlPropKey, defaultValue?: any): any | undefined {
        const value = this.get(key, defaultValue);
        if (typeof value === "string") {
            return JSON.parse(value);
        }
        return value || undefined;
    }

    set(key: urlPropKey, value: any): string {
        const stringValue = typeof value === "string"
            ? value : JSON.stringify(value);
        this.params.set(key, stringValue);
        return this.params.toString();
    }
}


export default URLParameter;
