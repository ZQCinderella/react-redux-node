/*
 * Created by sheng.yu on 2018-04-29 16:03:16. 
 */
const moduleName = 'optimus';   //项目名称， 如果一个node对接多个项目时使用

module.exports = {
  title: '擎天柱',
  pathInMappingJson: './public/dist',
  context: `${optimus}`,
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-immutable',
      'immutable',
      'isomorphic-fetch',
      'fetch-ie8',
      'antd'
    ],
    admin: ['client/end_pages/index.js'],
    client: ['babel-polyfill', './client/front_pages/index.js']
  }
}
