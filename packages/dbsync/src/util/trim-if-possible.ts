export function trimIfPossible(value: string) {
    if (value && typeof value === 'string') {
        return value.trim();
    }
    return '';
}
