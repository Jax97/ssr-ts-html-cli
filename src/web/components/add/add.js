import $ from 'jquery';

const add = {
  init() {
    console.log('add初始化 ...');
    $('.h3-btn').on('click', function () {
      alert('spa+mpa真假路由混用');
    });
  },
};

export default add;
