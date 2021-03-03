import Router from '@koa/router';
import Koa from 'koa';
import IndexController from '@/controllers/IndexController';
import BooksController from '@/controllers/BooksController';
import ApiController from '@/controllers/ApiController';

const router = new Router();
const indexController = new IndexController();
const booksController = new BooksController();
const apiController = new ApiController();

router.get('/', indexController.actionIndex);
router.get('/index.html', indexController.actionIndex);
router.get('/books/list', booksController.actionIndex);
router.get('/books/create', booksController.actionCreate);
router.get('/api/list', apiController.actionIndex);

export default (app: Koa) => {
  app.use(router.routes());
};
