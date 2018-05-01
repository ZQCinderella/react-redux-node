/*
 * Created by sheng.yu on 2018-04-29 17:13:52. 
 */
const path = require('path');
const fs = require('fs');
const extractMapping = require('./middleware/extractMapping');

const isDev = process.env.NODE_ENV === 'development';
//此时mapping.json可能还没有生成
//global.fileMapping = require('../public/dist/mapping.json');


/**
 * 监听api路由 (以文件夹目录为api的地址)
 */

const addApiRoute = (app) => {
  const apiDir = '/routes/api/';
  const apiPath = path.join(__dirname, apiDir);

  //拼接
  const _joinApiPath = url => {
    const len = apiPath.length;
    return url.length === len ? apiDir : `${apiDir}${url.substring(len)}/`
  }

  const _isFile = (file) => /\.js/.test(file);

  const _watchApi = (rootPath) => {
    fs.readdirSync(rootPath).forEach((fileName, index) => {
      if (!_isFile(fileName)) {
        _watchApi(path.join(rootPath, fileName));
      } else {
        const relativePath = _joinApiPath(rootPath);
        const _url = (`${relativePath}${fileName.replace(/\.js/, '')}`).replace(/\\/, '/');
        //获取模块
        const _router = require(`./${_url}`);
        // 现在 _url是 routes/api/xxx， 通常前端访问不需要携带api，所以统一去掉api
        const replacedUrl = _url.replace(/\/routes/, '');
        console.log(replacedUrl, `.${_url}`);
        app.use(replacedUrl, _router);
        //_router(app);
      }
    })
  }
  _watchApi(apiPath);
}

const admin = require('./routes/page/admin.js');
const client = require('./routes/page/client.js');

module.exports = app => {
  addApiRoute(app);
  app.use('/admin', admin);  //后台路由
  app.use('/', extractMapping, client);   //前台路由
}