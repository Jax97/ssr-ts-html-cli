import Koa from 'koa';
import config from './config/index';
import moduleAlias from 'module-alias';
const render = require('koa-swig');
const { port, viewDIR } = config;
import co from 'co';

moduleAlias.addAliases({
  '@root': __dirname,
  '@controllers': __dirname + '/controllers',
  '@models': __dirname + '/models',
});
const app: Koa = new Koa();

app.context.render = co.wrap(
  render({
    root: viewDIR,
    autoescape: true,
    cache: process.env.NODE_ENV == 'development' ? false : 'memory', // disable, set to false
    ext: 'html',
    writeBody: false,
  })
);

app.use(async (ctx) => {
  ctx.body = 'hello world111';
});

app.listen(port, () => {
  console.log('服务启动成功: ', `http://localhost:${port}`);
});