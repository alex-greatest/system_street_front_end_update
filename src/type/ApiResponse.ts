export interface ApiResponse<T> {
    content: Array<T>;
    totalElements: number;
}