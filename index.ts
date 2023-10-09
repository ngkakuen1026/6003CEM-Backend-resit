import Koa from "koa";
import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";

import { router as users } from "./routes/users";

const app: Koa = new Koa();
const router: Router = new Router();

const indextestAPI = async (ctx: RouterContext, next: any) => {
  ctx.body = {
    message: "testing testing!"
  };
  await next();
}

router.get('/api/indextestAPI', indextestAPI);
app.use(logger());
app.use(json());
app.use(router.routes());
app.use(users.routes());
app.listen(10888);
