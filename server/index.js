/*
 * Created by sheng.yu on 2018-04-29 17:10:33. 
 */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const isDev = process.env.NODE_ENV === 'development';
console.log(process.env.NODE_ENV);
console.log(`process.env.NODE_ENV is ${process.env.NODE_ENV}`);

const app = express();

//设置模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json({limit: '20mb'})); //post最大提交内容
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}));
app.use(bodyParser.text());
app.use(cookieParser());

//设置node服务器静态资源的根路径
app.use('/public', express.static(path.join(__dirname, '../public')));


//如果是dev环境，则使用热部署
if (isDev) {
  const webpackConfig = require('../webpack.config.js');
  const webpack = require('webpack');
  const compiler = webpack(webpackConfig);
  //webpack-dev-middleware is a wrapper that will emit files processed by webpack to a server
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  app.use(webpackHotMiddleware(compiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 2000
  }))
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true,
    cache: true, //开启缓存，增量编译
    stats: {
      // colors: true, //打印日志显示颜色
      reasons: true //打印相关被引入的模块
    },
  }))
}

require('./boot.js')(app);   //可以做一些用户登录状态的校验

app.use((req, res, next) => {
  //不处理map 和 json格式的数据
  if (/\.(json|map)$/.test(req.url)) {
    return next();
  }
  const err = new Error(`${req.url} not found`);
  err.status = 404;
  next(err);
});

/*app.use((err, req, res, next) => {
  if (!req.url.startsWith('/query')) {
    return res.status(200).json({
      code: err.code || 'E-50x',
      msg: '访问的api路径有误'
    })
  }
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error',
    message: err.message || 'error',
    error: err
  });
});*/

module.exports = app;