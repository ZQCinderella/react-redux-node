/*
 * Created by sheng.yu on 2018-05-01 13:03:46. 
 * 提取mapping中的资源
 */
const mapAsset = key => {
  const mapObj = global.staticAssetsMapping;
  const value = mapObj[key];
  const jsReg = /\.js$/;
  const cssReg = /\.css$/;
  let srcString = '';

  if (jsReg.test(key)) {
    srcString = `<script src=${value}></script>`;
  } else if (cssReg.test(key)) {
    srcString = `<link rel="stylesheet" link=${value}></link>`;
  }
  return srcString;
}

module.exports = mapAsset;

