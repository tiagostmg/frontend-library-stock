export type BookInstance = {
  id: number,
  internalCode: string,
  acquisitionDate: string,
  preservationState: string,
  status: string,
  book: {
    id: number,
    title: string,
    author: string,
    publisher: string,
    isbn: string,
    category: string,
    notes: string
  },
  location: {
    id: number,
    sector: string,
    aisle: string,
    shelf: string,
    shelfLevel: string,
    position: string,
    classificationCode: string
  }
}