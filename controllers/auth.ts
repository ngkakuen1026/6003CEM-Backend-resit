import passport from "koa-passport";
import { BasicStrategy } from "passport-http";
import { RouterContext } from "koa-router";
import * as users from '../models/users';

const verifyPassword = (username: any, password: string) => {
  return username.password === password;
}

passport.use(new BasicStrategy(async (username, password, done) => {
  let result: any[] = [];
  try {
    result = await users.getByUsername(username);
  } catch (error) {
    console.error(`Error during authentication for user ${username}: ${error}`);
    done(null, false);
  }
  if (result.length) {
    const user = result[0];
    if (verifyPassword(user, password)) {
      done(null, { user: user });
    } else {
      done(`Password incorrect for ${username}`);
    }
  } else {
    done(`No user found with username ${username}`);
  }
}));


export const basicAuth = async (ctx: RouterContext, next: any) => {
  await passport.authenticate("basic", { session: false }, (err, user, info) => {
    if (err) {
      ctx.status = 401;
      ctx.body = {
        message: err
      };
    } else if (user) {
      return next();
    } else {
      ctx.status = 401;
      ctx.body = {
        message: 'you are not authorized'
      };
    }
  })(ctx, next);
}