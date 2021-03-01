import Koa from 'koa';
import Books from '@/models/Books';
import { Readable } from 'stream';
import { load } from 'cheerio';

export default class BooksController {
  constructor() {}
  async actionIndex(ctx: Koa.Context, next: Koa.Next) {
    ctx.body = await ctx.render('books/pages/list');
  }
  async actionCreate(ctx: Koa.Context, next: Koa.Next) {
    const html = await ctx.render('books/pages/create');
    function createSSRStreamPromise() {
      return new Promise((res, rej) => {
        const htmlStream = new Readable();
        htmlStream.push(html);
        htmlStream.push(null);
        ctx.status = 200;
        ctx.type = 'html';
        htmlStream
          .on('error', (err) => {
            rej(err);
          })
          .pipe(ctx.res);
      });
    }
    if (ctx.request.header['x-pjax']) {
      console.log('站内切换');
      const $ = load(html);
      ctx.status = 200;
      ctx.type = 'html';
      $('.pjaxcontent').each(function (this: object) {
        ctx.res.write($(this).html());
      });
      // $('.lazyload-js').each(function () {
      //   ctx.res.write(`<script src="${$(this).attr('src')}"></script>`);
      // });
      ctx.res.end();
    } else {
      console.log('刷新直出');
      await createSSRStreamPromise();
    }
    // ctx.body = await ctx.render('books/pages/create');
  }
}
