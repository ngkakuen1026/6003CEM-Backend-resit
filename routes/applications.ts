import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from '../models/applications';
import { validateApplication } from '../controllers/validation';
import { basicAuth } from '../controllers/auth';

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

//search fields
const getApplicationByApplicationId = async (ctx: RouterContext, next: any) => {
  let id = ctx.params.application_id;
  let applications = await model.getByApplicationId(id);
  if (applications.length) {
    ctx.body = applications[0];
  } else {
    ctx.status = 404;
    ctx.body = { err: "application ID not found" };
  }
  await next();
};

const getApplicationByUserId = async (ctx: RouterContext, next: any) => {
  let id = ctx.params.user_id;
  let applications = await model.getByUserId(id);
  if (applications.length) {
    ctx.body = applications;
  } else {
    ctx.status = 404;
    ctx.body = { err: "user ID not found" };
  }
  await next();
};

const getApplicationByBookId = async (ctx: RouterContext, next: any) => {
  let bookId = ctx.params.book_id;
  let applications = await model.getByBookId(bookId);
  if (applications.length) {
    ctx.body = applications;
  } else {
    ctx.status = 404;
    ctx.body = { err: "book ID not found" };
  }
  await next();
};

const getApplicationByStatus = async (ctx: RouterContext, next: any) => {
  let status = ctx.params.status;
  let applications = await model.getByStatus(status);
  if (applications.length) {
    ctx.body = applications;
  } else {
    ctx.status = 404;
    ctx.body = { err: "status not found" };
  }
  await next();
};

// update application by applicationID
const updateApplicationPut = async (ctx: RouterContext, next: any) => {
  const { id } = ctx.params;
  const newApplicationData = ctx.request.body;
  const application = await model.getById(id);
  if (application.length) {
    const updatedApplication = await model.update(id, newApplicationData);
    if (updatedApplication.status == 200) {
      ctx.status = 200;
      ctx.body = updatedApplication;
    } else {
      ctx.status = 500;
      ctx.body = { err: "update data failed" };
    }
  } else {
    ctx.status = 404;
    ctx.body = { err: "application not found" };
  }
  await next();
};

router.get('/', getAll);
router.get('/:id([0-9]{1,})', getByApplicationId);
router.get('/application_id/:application_id([0-9]{1,})', getApplicationByApplicationId);
router.get('/user_id/:user_id([0-9]{1,})', getApplicationByUserId);
router.get('/book_id/:book_id([0-9]{1,})', getApplicationByBookId);
router.get('/status/:status', getApplicationByStatus);
router.post('/', bodyParser(), validateApplication, createApplication);
router.put('/:id([0-9]{1,})', bodyParser(), updateApplicationPut);
router.del('/:id([0-9]{1,})', basicAuth, deleteApplication);

export { router };