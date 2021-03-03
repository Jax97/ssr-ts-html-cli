// import Koa from 'koa';

/**
 * @fileoverview 实现Books数据模型
 * @author huangjiaxian
 */

export default class Books {
  //   app: Koa<Koa.DefaultState, Koa.DefaultContext>;
  /**
   * Books的类 获取后台有关于图书的相关数据类
   * @class
   */
  /**
   * @constructor
   * @param {object} app koa2的执行上下文
   */
  constructor() {
    // this.app = app;
  }
  /**
   * 获取后台全部图书列表的接口
   * @param {*} options 配置项
   * @example
   * return new Promise
   * getData()
   */
  getData() {
    return Promise.resolve('Books数据请求成功');
  }
}
