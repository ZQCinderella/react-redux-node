/*
 * Created by sheng.yu on 2018-04-29 17:54:48. 
 */

//前端页面路由
const express = require('express');
const router = express.Router();
const getJS = (key) => {
  const buildScript = src => `<script src=${src}></script>`;
  const script = `${buildScript('/public/dll/vendor.dll.js')}${buildScript(`/public/dist/${key}.bundle.js`)}`;
  return script;
}
router.get('*', (req, res, next) => {
  const data = {
    name: 'sheng.yu',
    age: '20',
    gender: 'male',
  }
  const sc = getJS('client');
  res.render('client', {
    data: JSON.stringify(data),
    scripts: getJS('client'),
  });
})

module.exports = router;