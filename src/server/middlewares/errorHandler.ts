import Koa from 'koa';
import { Logger } from 'log4js';

const errorHandler = {
  error(app: Koa, logger: Logger) {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        logger.error(err);
        ctx.status = ctx.status || 500;
        ctx.body = '500请求啦🍊';
      }
    });
    app.use(async (ctx, next) => {
      await next();
      if (404 !== ctx.status) {
        return;
      }
      ctx.status = 200;
      ctx.body = '404请求🍉';
    });
  },
};

export default errorHandler;
