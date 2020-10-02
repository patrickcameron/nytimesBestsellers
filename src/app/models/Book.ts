export interface Book {
    id?: string,
    primary_isbn13: string,
    title?: string,
    description?: string,
    author?: string,
    price?: number,
    book_image?: string,
    rank?: number,
    isSaved?: boolean
}