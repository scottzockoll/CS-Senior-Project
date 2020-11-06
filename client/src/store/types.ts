export interface Paginated<T> {
    /**
     * Set of all acquired ids.
     */
    ids: number[];
    /**
     * Mapping of ids to their corresponding entities.
     */
    entities: Record<number, T>;
    /**
     * Set of all page numbers fetched.
     */
    pages: number[];
    /**
     * Previous page URL
     */
    prevPage: string;
    /**
     * Next page URL
     */
    nextPage: string;
    /**
     * If a request is pending or not.
     */
    isFetching: boolean;
}
