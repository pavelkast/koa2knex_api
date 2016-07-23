import Koa from 'koa';
import logger from 'koa-logger';
import bodyparser from 'koa-bodyparser';

import * as init from './api/init';

import router from './api/router';
import customMiddleware from './api/middlewares/custom';



const app = new Koa();
app.experimental = true;

app.use(logger());
app.use(customMiddleware);

app.use(bodyparser({
  detectJSON: function (ctx) {
    return /\.json$/i.test(ctx.path);
  }
}));

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => console.log('server started 3000'));

export default app

