/*
 * Created by sheng.yu on 2018-04-30 23:01:51. 
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('reqqq');
  res.json({
    name: 'fet',
    age: 10
  });
  next();
});
module.exports = router;

// module.exports = function(app) {
//   app.get('/test', (req, res, next) => {
//     console.log('reqqq');
//     res.json({
//       name: 'fet',
//       age: 20
//     });
//     next();
//   })
// };