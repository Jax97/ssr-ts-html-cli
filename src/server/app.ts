import Koa from 'koa';
import config from './config/index';
// import moduleAlias from 'module-alias';
import routes from './controllers/index';
const render = require('koa-swig');
const { port, viewDIR, staticDir } = config;
import co from 'co';
import serve from 'koa-static';
import errorHandler from './middlewares/errorHandler';
import { configure, getLogger } from 'log4js';
configure({
  appenders: { cheese: { type: 'file', filename: './logs/ssr.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } },
});
const logger = getLogger('cheese');
// moduleAlias.addAliases({
//   '@root': __dirname,
//   '@controllers': __dirname + '/controllers',
//   '@models': __dirname + '/models',
// });
const app = new Koa();
app.use(serve(staticDir));
app.context.render = co.wrap(
  render({
    root: viewDIR,
    autoescape: true,
    cache: process.env.NODE_ENV == 'development' ? false : 'memory', // disable, set to false
    ext: 'html',
    writeBody: false,
  })
);

routes(app);
errorHandler.error(app, logger);
// app.use(async (ctx) => {
//   ctx.body = 'hello world111';
// });

app.listen(port, () => {
  console.log('服务启动成功: ', `http://localhost:${port}`);
});
