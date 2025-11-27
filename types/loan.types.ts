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