import Koa from 'koa';
import Books from '@/models/Books';

export default class ApiController {
  constructor() {}
  async actionIndex(ctx: Koa.Context, next: Koa.Next) {
    const books = new Books();
    const res = await books.getData();
    ctx.body = res;
  }
}