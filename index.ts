import Koa from "koa";
import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import serve from 'koa-static-folder';
import cors from '@koa/cors';

import { router as users } from "./routes/users";
import { router as books } from "./routes/books";
import { router as applications } from "./routes/applications";

import { router as special } from "./routes/special";

const app: Koa = new Koa();
const router: Router = new Router();

const indextestAPI = async (ctx: RouterContext, next: any) => {
  ctx.body = {
    message: "testing testing!"
  };
  await next();
}

router.get('/api/indextestAPI', indextestAPI);
app.use(cors());
app.use(logger());
app.use(json());
app.use(router.routes());
app.use(users.routes());
app.use(books.routes());
app.use(applications.routes());

app.use(special.middleware());

app.use(serve('./docs'));
app.listen(10888);
