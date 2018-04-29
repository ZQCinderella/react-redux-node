/*
 * Created by sheng.yu on 2018-04-29 17:54:48. 
 */

//前端页面路由
const express = require('express');
const router = express.Router();

router.get('*', (req, res, next) => {
  const data = {
    name: 'sheng.yu',
    age: '20',
    gender: 'male'
  }
  res.render('page', { data });
})

module.exports = router;