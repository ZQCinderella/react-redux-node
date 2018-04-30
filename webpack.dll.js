const path = require('path');
const webpack = require('webpack');
const options = require('./Config.js');

console.log(options.entry.vendor);
module.exports = {
  entry: {
    vendor: options.entry.vendor
  },
  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, 'public', 'dll'),
    library: '[name]Library',
    libraryTarget: 'window'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]Library',
      path: path.join(__dirname, 'public/dll', '[name]-manifest.json')
    })
  ]
}