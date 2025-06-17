export class SesonStorage {
    public static INTRODUCTION: string = 'intro';

    public static setItem(key: string, item:  any): void {
        sessionStorage.setItem(key, item);
    }

    public static getItem(key: string): string | null {
        return sessionStorage.getItem(key);
    }
}