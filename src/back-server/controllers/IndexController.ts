import Koa from 'koa';

export default class IndexController {
  constructor() {}
  async actionIndex(ctx: Koa.Context, next: Koa.Next) {
    ctx.body = await ctx.render('index/pages/index');
  }
}
