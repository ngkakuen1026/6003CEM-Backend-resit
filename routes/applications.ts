import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from '../models/applications';
import { validateApplication } from '../controllers/validation';

const router = new Router({ prefix: '/api/applications' });

//get all application
const getAll = async (ctx: RouterContext, next: any) => {
  let applications = await model.getAll();
  if (applications.length) {
    ctx.body = applications;
  } else {
    ctx.body = {}
  }
  await next();
}

//get specific application by application ID
const getByApplicationId = async (ctx: RouterContext, next: any) => {
  let id = ctx.params.id;
  let applications = await model.getById(id);
  if (applications.length) {
    ctx.body = applications[0];
  } else {
    ctx.status = 404;
    ctx.body = { err: "application ID not found" };
  }
  await next();
}

//create application
const createApplication = async (ctx: RouterContext, next: any) => {
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

//delete application by applicationID
const deleteApplication = async (ctx: RouterContext, next: any) => {
  const { id } = ctx.params;
  const application = await model.getById(id);
  if (application.length) {
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
    ctx.body = { err: "application not found" };
  }
  await next();
};

router.get('/', getAll);
router.get('/:id([0-9]{1,})', getByApplicationId);
router.post('/', bodyParser(), validateApplication, createApplication);
router.del('/:id([0-9]{1,})', deleteApplication);

export { router };