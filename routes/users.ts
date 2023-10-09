import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from '../models/users';

const router = new Router({ prefix: '/api/users' });

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

router.post('/', bodyParser(), createUser);

export { router };