export interface PaginationDto {
    pageSize?: number;
    page?: number;
    search?: string;
}

export interface DeleteWordDto {
    wordId: string;
}
