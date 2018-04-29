/*
 * Created by sheng.yu on 2018-04-29 15:39:39. 
 */


const path = require('path');
const fs = require('fs');

console.log(`process.env.NODE_ENV is ${process.env.NODE_ENV}`);

//根据运行环境加载相应的配置文件
const sourceConfigPath = path.join(__dirname, 'server/config', process.env.NODE_ENV, 'index.js');

//读取文件
if (!fs.existsSync(sourceConfigPath)) {
  console.error(`error: 当前环境 ${process.env.NODE_ENV} 没有找到对应的配置文件 ${sourceConfigPath}`);
  process.exit(1);
}

const targetConfigPath = path.join(__dirname, 'server/config/index.js');

//根据configPath生成 server/config/index.js
if (fs.existsSync(targetConfigPath)) {
  fs.unlinkSync(targetConfigPath);  
}

fs.createReadStream(sourceConfigPath).pipe(fs.createWriteStream(targetConfigPath));