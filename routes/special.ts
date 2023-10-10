import Router, { RouterContext } from "koa-router";
import { basicAuth } from '../controllers/auth'
const router = new Router({ prefix: '/api' });

// Just for testing
router.get('/', async (ctx: RouterContext, next: any) => {
  ctx.body = {
    message: 'Public API return'
  };
  await next();
})

router.get("/private", basicAuth, async (ctx: RouterContext, next: any) => {
  ctx.body = {
    message: 'Private API return'
  };
  await next();
});

export { router };
