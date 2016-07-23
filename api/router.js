import koaRouter from 'koa-router';
import Promise from 'bluebird';
import requireAll from 'require-all';

import DefaultController from './defaults/DefaultController';
import customRoutes from './config/routes.json';

let controllers = requireAll({
  dirname     :  __dirname + '/controllers',
  filter      :  /(.+Controller)\.js$/,
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true
});

controllers = _.mapValues(controllers, controller => controller.default);

const router = koaRouter();

router
  .get('/', async (ctx) => {
    await Promise.delay(1000);
    console.log('Index done');
    ctx.body = 'Hello!';
  });

// Init routes from routes.json
_.forEach(customRoutes, (routes, type) => {
  _.forEach(routes, (route, path) => {
    const func = _.get(controllers, route);
    router[type](path, func);
  })
});

// Init default routes for models

_.forEach(models, (item, modelName) => {
  const pathName = modelName.toLowerCase();
  const controller = new DefaultController(item.tableName);

  router
    .get(`/${pathName}/`, controller.list)
    .get(`/${pathName}/:id`, controller.getById)
    .post(`/${pathName}/add`, controller.insert)
    .post(`/${pathName}/update/:id`, controller.update)
    .post(`/${pathName}/delete/:id`, controller.del)
});

export default router;
