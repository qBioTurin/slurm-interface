export type SortConfig<T> = {
    key: keyof T | null;
    direction: 'asc' | 'desc';
};

export function sortItems<T>(items: T[], sortConfig: SortConfig<T>): T[] {
    if (!sortConfig.key) return items;

    return [...items].sort((a, b) => {
        const aValue = a[sortConfig.key!] as string | number;
        const bValue = b[sortConfig.key!] as string | number;

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        return sortConfig.direction === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    });
}
