import { Book, BookInstance } from "./book.types"
import { Reader } from "./reader.types"

export type OverdueLoan = {
  loanId: number,
  loanDate: string,
  expectedReturnDate: string,
  overdueBookInstanceViewModel: {
    id: number,
    internalCode: string,
    book: {
      id: number,
      title: string,
      author: string,
      publisher: string,
      isbn: string,
      category: string,
      notes: string
    }
  },
  overdueReaderViewModel: {
    id: number,
    cpf: string,
    name: string
  }
}

export type Loan = {
  loanId: number,
  loanDate: string,
  expectedReturnDate: string,
  actualReturnDate: string,
  bookInstanceViewModel: BookInstance,
  readerViewModel: Reader
}