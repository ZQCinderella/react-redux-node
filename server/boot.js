/*
 * Created by sheng.yu on 2018-04-29 17:13:52. 
 */

 //校验文件

const admin = require('./routes/page/admin.js');
const client = require('./routes/page/client.js');

 module.exports = app => {
   app.use('/admin', admin);  //后台路由
   app.use('/', client);   //前台路由
 }