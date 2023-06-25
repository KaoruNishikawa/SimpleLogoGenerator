class URLParameter {
    params: URLSearchParams;

    constructor() {
        this.params = new URLSearchParams(window.location.search);
    }

    get(key: string, defaultValue?: any): string;
    get(key: string, defaultValue?: any): string | undefined {
        const value = this.params.get(key);
        return value !== undefined ? value : defaultValue;
    }

    getInt(key: string, defaultValue?: number): number;
    getInt(key: string, defaultValue?: number): number | undefined {
        const value = this.get(key, defaultValue);
        return value ? parseInt(value) : undefined;
    }

    getJSON(key: string, defaultValue?: any): any;
    getJSON(key: string, defaultValue?: any): any | undefined {
        const value = this.get(key, defaultValue);
        return value ? JSON.parse(value) : undefined;
    }

    set(key: string, value: any): string {
        this.params.set(key, JSON.stringify(value));
        return this.params.toString();
    }
}


export default URLParameter;
