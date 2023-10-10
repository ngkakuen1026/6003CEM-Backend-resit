import * as db from "../helpers/database";

//get all book SQL statement
export const getAll = async () => {
  let query = "SELECT * FROM books;"
  let data = await db.run_query(query, null);
  return data;
}

//get specific book by book ID SQL statement 
export const getById = async (id: any) => {
  let query = "SELECT * FROM books WHERE book_id = ?"
  let values = [id]
  let data = await db.run_query(query, values);
  return data;
}

//create book SQL statement
export const add = async (book: any) => {
  let keys = Object.keys(book);
  let values = Object.values(book);
  let key = keys.join(',');
  let param = '';
  for (let i: number = 0; i < values.length; i++) { param += '?,' }
  param = param.slice(0, -1);
  let query = `INSERT INTO books (${key}) VALUES (${param})`;
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

//update book by bookID SQL statement
export const update = async (book_id: number, book: any) => {
  let keys = Object.keys(book);
  let values = Object.values(book);
  let set = '';
  for (let i: number = 0; i < keys.length; i++) { set += `${keys[i]} = ? ,` }
  set = set.slice(0, -1);
  let query = `UPDATE books SET ${set} WHERE book_id = ?`;
  try {
    await db.run_query(query, [...values, book_id]);
    return { status: 200 };
  } catch (err: any) {
    return err;
  }
}

//delete book by bookID SQL statement
export const remove = async (book_id: number) => {
  let query = `DELETE FROM books WHERE book_id = ?`;
  try {
    await db.run_query(query, [book_id]);
    return { status: 200 };
  } catch (err: any) {
    return err;
  }
};