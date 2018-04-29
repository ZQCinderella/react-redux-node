/*
 * Created by sheng.yu on 2018-04-29 18:13:07. 
 */

//后端页面路由
const express = require('express');
const router = express.Router();

router.get('*', (req, res, next) => {
  const data = {
    name: 'sheng.yu',
    age: '20',
    gender: 'male'
  }
  res.render('admin', { data });
})

module.exports = router;