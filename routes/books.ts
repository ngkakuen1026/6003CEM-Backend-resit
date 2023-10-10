import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from '../models/books';
import { validateBook } from '../controllers/validation';

const router = new Router({ prefix: '/api/books' });

//get all book
const getAll = async (ctx: RouterContext, next: any) => {
  let books = await model.getAll();
  if (books.length) {
    ctx.body = books;
  } else {
    ctx.body = {}
  }
  await next();
}

//get specific book by book ID
const getByBookId = async (ctx: RouterContext, next: any) => {
  let id = ctx.params.id;
  let books = await model.getById(id);
  if (books.length) {
    ctx.body = books[0];
  } else {
    ctx.status = 404;
    ctx.body = { err: "Book ID not found" };
  }
  await next();
}

//create book
const createBook = async (ctx: RouterContext, next: any) => {
  const body = ctx.request.body;
  let result = await model.add(body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "insert data failed" };
  }
  await next();
}

//update book information
const updateBook = async (ctx: RouterContext, next: any) => {
  const book_id = ctx.params.id;
  const body = ctx.request.body;
  let result = await model.update(book_id, body);
  if (result.status == 200) {
    ctx.status = 200;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "update data failed" };
  }
  await next();
}

//delete book by bookID
const deleteBook = async (ctx: RouterContext, next: any) => {
  const { id } = ctx.params;
  const book = await model.getById(id);
  if (book.length) {
    const result = await model.remove(id);
    if (result.status == 200) {
      ctx.status = 204;
      ctx.body = { err: "delete data success" };
    } else {
      ctx.status = 500;
      ctx.body = { err: "delete data failed" };
    }
  } else {
    ctx.status = 404;
    ctx.body = { err: "book not found" };
  }
  await next();
};


router.get('/', getAll);
router.get('/:id([0-9]{1,})', getByBookId);
router.post('/', bodyParser(), validateBook, createBook);
router.put('/:id([0-9]{1,})', bodyParser(), updateBook, validateBook);
router.del('/:id([0-9]{1,})', deleteBook);

export { router };