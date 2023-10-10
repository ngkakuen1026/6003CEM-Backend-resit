import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from '../models/users';
import { validateUser } from '../controllers/validation';

const router = new Router({ prefix: '/api/users' });

//get all users
const getAll = async (ctx: RouterContext, next: any) => {
  let userss = await model.getAll();
  if (userss.length) {
    ctx.body = userss;
  } else {
    ctx.body = {}
  }
  await next();
}

//get specific user by usersID
const getByUserId = async (ctx: RouterContext, next: any) => {
  let id = ctx.params.id;
  let users = await model.getById(id);
  if (users.length) {
    ctx.body = users[0];
  } else {
    ctx.status = 404;
    ctx.body = { error: 'User ID not found' };
  }
  await next();
}

// Get specific user by username (BaiscAuth)
const getByUsername = async (ctx: RouterContext, next: any) => {
  const username = ctx.params.username;
  const user = await model.getByUsername(username);
  if (user.length) {
    ctx.body = user[0];
  } else {
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
  }
  await next();
}

//create users
const createUser = async (ctx: RouterContext, next: any) => {
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

//update user information
const updateUser = async (ctx: RouterContext, next: any) => {
  const user_id = ctx.params.id;
  const body = ctx.request.body;
  let result = await model.update(user_id, body);
  if (result.status == 200) {
    ctx.status = 200;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "update data failed" };
  }
  await next();
}

//delete user by userID
const deleteUser = async (ctx: RouterContext, next: any) => {
  const { id } = ctx.params;
  const user = await model.getById(id);
  if (user.length) {
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
    ctx.body = { err: "user not found" };
  }
  await next();
};

router.get('/', getAll);
router.get('/:username', getByUsername);
router.get('/:id([0-9]{1,})', getByUserId);
router.post('/', bodyParser(), validateUser, createUser);
router.put('/:id([0-9]{1,})', bodyParser(), updateUser, validateUser);
router.del('/:id([0-9]{1,})', deleteUser);

export { router };