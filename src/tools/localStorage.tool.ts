export function setLS(key: string, value: any): void {
    try {
        const data = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, data);
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}
export function getLS<T = any>(key: string): T | null {
    try {
        const data = localStorage.getItem(key);
        if (!data) return null;
        try {
            return JSON.parse(data) as T;
        } catch {
            return data as unknown as T;
        }
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

export function removeLS(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
}
