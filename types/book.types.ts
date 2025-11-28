export type Book = {
  id: number,
  title: string,
  author: string,
  publisher: string,
  isbn: string,
  category: string,
  notes: string
}

export type BookInstance = {
  id: number,
  internalCode: string,
  acquisitionDate: string,
  preservationState: string,
  status: string,
  book: Book,
  location: Location
}

export type Location = {
  id: number,
  sector: string,
  aisle: string,
  shelf: string,
  shelfLevel: string,
  position: string,
  classificationCode: string
}