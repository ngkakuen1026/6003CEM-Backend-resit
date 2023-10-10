import * as db from "../helpers/database";

//get all user SQL statement
export const getAll = async () => {
  let query = "SELECT * FROM users;"
  let data = await db.run_query(query, null);
  return data;
}

//get specific user by userID SQL statement 
export const getById = async (id: any) => {
  let query = "SELECT * FROM users WHERE user_id = ?"
  let values = [id]
  let data = await db.run_query(query, values);
  return data;
}

//get a single user by username SQL statement
export const getByUsername = async (username: string) => {
  const query = "SELECT * FROM users WHERE username = ?";
  const user = await db.run_query(query, [username]);
  return user;
}

//create user SQL statement
export const add = async (user: any) => {
  let keys = Object.keys(user);
  let values = Object.values(user);
  let key = keys.join(',');
  let param = '';
  for (let i: number = 0; i < values.length; i++) { param += '?,' }
  param = param.slice(0, -1);
  let query = `INSERT INTO users (${key}) VALUES (${param})`;
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

//update user by userID SQL statement
export const update = async (user_id: number, user: any) => {
  let keys = Object.keys(user);
  let values = Object.values(user);
  let set = '';
  for (let i: number = 0; i < keys.length; i++) { set += `${keys[i]} = ? ,` }
  set = set.slice(0, -1);
  let query = `UPDATE users SET ${set} WHERE user_id = ?`;
  try {
    await db.run_query(query, [...values, user_id]);
    return { status: 200 };
  } catch (err: any) {
    return err;
  }
}

//delete user by userID SQL statement
export const remove = async (user_id: number) => {
  let query = `DELETE FROM users WHERE user_id = ?`;
  try {
    await db.run_query(query, [user_id]);
    return { status: 200 };
  } catch (err: any) {
    return err;
  }
};