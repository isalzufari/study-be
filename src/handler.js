const books = require('./books');
const { nanoid } = require('nanoid');

const addBookHandler = (request, h) => {
  const { name, year, publisher } = request.payload;
  console.log(name, year);

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku!'
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const createdAt = new Date().toISOString();

  const newBook = {
    id,
    name,
    year,
    publisher,
    createdAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201);
    return response;
  }
}

const getBooksHandler = (request, h) => {
  return {
    status: 'success',
    data: {
      books: books,
    }
  }
}

module.exports = {
  addBookHandler,
  getBooksHandler,
};
