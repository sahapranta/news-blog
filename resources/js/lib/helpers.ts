export const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
export const url = (path = '') => `${import.meta.env.VITE_APP_URL || ''}${path}`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;

    return function (...args: Parameters<T>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export function numberMapper(value: string): string {
    const map: Record<string, string> = {
        '০': '0',
        '১': '1',
        '২': '2',
        '৩': '3',
        '৪': '4',
        '৫': '5',
        '৬': '6',
        '৭': '7',
        '৮': '8',
        '৯': '9',
        ' ': '',
    };

    return value.replace(/[০-৯ ]/g, (char) => map[char] ?? char);
}

export function bnNum(value: string | number): string {
    if (value === null || value === undefined || value === '') return '';

    if (typeof value === 'number') {
        value = value.toString();
    }

    const num = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

    value = value.toString().replaceAll(/\D+/g, '');

    return value
        .split('')
        .map((v) => num[parseInt(v, 10)])
        .join('');
}
