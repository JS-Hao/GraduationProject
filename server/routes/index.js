module.exports = function (app) {
  app.get('/', (req, res) => {
    res.render('index');
  });
  // 获取用户当前状态
  app.use('/userinfo', require('./userinfo'));
  // 注册相关
  app.use('/signup', require('./signup'));
  // 登录相关
  app.use('/signin', require('./signin'));
  // 退出
  app.use('/signout', require('./signout'));
  // 发布问题相关
  app.use('/question', require('./question'));
};
