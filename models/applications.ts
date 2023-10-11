import * as db from "../helpers/database";

//get all application SQL statement
export const getAll = async () => {
  let query = "SELECT * FROM applications;"
  let data = await db.run_query(query, null);
  return data;
}

//get specific application by application ID SQL statement 
export const getById = async (id: any) => {
  let query = "SELECT * FROM applications WHERE application_id = ?"
  let values = [id]
  let data = await db.run_query(query, values);
  return data;
}

//create application SQL statement
export const add = async (application: any) => {
  let keys = Object.keys(application);
  let values = Object.values(application);
  let key = keys.join(',');
  let param = '';
  for (let i: number = 0; i < values.length; i++) { param += '?,' }
  param = param.slice(0, -1);
  let query = `INSERT INTO applications (${key}) VALUES (${param})`;
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

//delete application by applicationID SQL statement
export const remove = async (application_id: number) => {
  let query = `DELETE FROM applications WHERE application_id = ?`;
  try {
    await db.run_query(query, [application_id]);
    return { status: 200 };
  } catch (err: any) {
    return err;
  }
};

// update application SQL statement
export const update = async (id: any, application: any) => {
  let fieldsToUpdate = Object.keys(application).map(key => `${key} = ?`).join(', ');
  let values = Object.values(application);
  values.push(id);
  let query = `UPDATE applications SET ${fieldsToUpdate} WHERE application_id = ?`;
  try {
    await db.run_query(query, values);
    return { status: 200 };
  } catch (err: any) {
    return err;
  }
}

//Search function for frontend SQL statement
export const getByApplicationId = async (application_id: any) => {
  let query = "SELECT * FROM applications WHERE application_id LIKE ?"
  let values = [`%${application_id}%`]
  let data = await db.run_query(query, values);
  return data;
}

export const getByUserId = async (user_id: any) => {
  let query = "SELECT * FROM applications WHERE user_id LIKE ?"
  let values = [`%${user_id}%`]
  let data = await db.run_query(query, values);
  return data;
}

export const getByBookId = async (book_id: any) => {
  let query = "SELECT * FROM applications WHERE book_id LIKE ?"
  let values = [`%${book_id}%`]
  let data = await db.run_query(query, values);
  return data;
}

export const getByStatus = async (status: any) => {
  let query = "SELECT * FROM applications WHERE status LIKE ?"
  let values = [`%${status}%`]
  let data = await db.run_query(query, values);
  return data;
}