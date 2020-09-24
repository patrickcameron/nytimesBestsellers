export interface Book {
    title?: string,
    description?: string,
    author?: string,
    price?: number,
    book_image: string,
    primary_isbn13: number,
    rank: number,
    isSaved: boolean
}