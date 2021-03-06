export enum SortOrder {
    ASCENDING = 'asc',
    DESCENDING = 'desc'
}

export enum SortType {
    String = 'string',
    Number = 'number'
}

type GetKey<T> = (item: T) => string | number;

export const sortUtil = <T>(
    data: T[],
    getKey: GetKey<T>,
    sortOrder: SortOrder = SortOrder.ASCENDING,
    sortType: SortType = SortType.String,
): T[] => {
    const orderOfSort = sortOrder === SortOrder.ASCENDING
        ? 1
        : sortOrder === SortOrder.DESCENDING
            ? -1
            : 1;

    return [...data].sort((a: T, b: T) => {
        const x = sortType === SortType.String ? (getKey(a) || '').toString().toLowerCase().trim() : +(getKey(a));
        const y = sortType === SortType.String ? (getKey(b) || '').toString().toLowerCase().trim() : +(getKey(b));

        const result = x < y ? -1 : x > y ? 1 : 0;

        return result * orderOfSort;
    });
};
