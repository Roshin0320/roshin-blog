const path = require('path');
const fse = require('fs-extra'); // fs 扩展工具包
const chalk = require('chalk'); // node终端样式库

/**
 * docs文件路径
 * @param { string } p 需要拼接的路径
 * @returns { string } 完整的路径
 */
const docsReslove = (p) => path.resolve(__dirname, '../docs', p || '');

/**
 * temp 文件路径
 * @param { string } p 需要拼接的路径
 * @returns { string } 完整的路径
 */
const tempReslove = (p) => path.resolve(__dirname, '../temp', p || '');

/**
 * 类型判断
 * @param { any } o 要判断的值
 * @returns { string } 数据类型
 */
const type = (o) =>
  Object.prototype.toString
    .call(o)
    .match(/\[object (.*?)\]/)[1]
    .toLowerCase();

/**
 * 检测是否为文件夹
 * @param { string } _dir 路径
 * @returns { boolean } true | false
 */
const isDirectory = (_dir) => {
  return fse.statSync(_dir).isDirectory();
};

/**
 * 拿到所有 md 文件
 * @param { string } _path 路径
 * @returns { string[] } 文件列表
 */
const readFileList = (_path = '') => {
  let arr = [];
  // 整理当前文件路径
  const pathJoin = (v) => path.join(_path || '', v || '');
  // 拿到文件夹下的所有文件
  const readdirFiles = fse.readdirSync(docsReslove(_path));
  readdirFiles.forEach((filepath) => {
    if (filepath === '.vuepress') return;
    const filepath_intact = docsReslove(pathJoin(filepath)); // 完整的路径
    // 如果遇到文件夹，递归
    if (isDirectory(filepath_intact)) {
      arr = arr.concat(readFileList(pathJoin(filepath)));
      return;
    }
    // 过滤 docs 目录级下的文件
    if (!_path) return;
    // 超过两个 ‘.’的
    if (!/^(\d{2}\.)?[^\\.]+\.md$/.test(filepath)) {
      console.log(chalk.yellow(`warning: 该文件 "${filepath_intact}" 没有按照约定命名，将忽略生成相应数据。`));
      return;
    }
    if (filepath.endsWith('md')) {
      // const fileNameArr = filepath.split('.');
      // arr.push({
      //   name: fileNameArr[fileNameArr.length - 2],
      //   intact_path: filepath_intact,
      //   path: pathJoin(filepath)
      // });
      arr.push(filepath_intact);
    }
  });
  return arr;
};

exports.type = type;
exports.tempReslove = tempReslove;
exports.docsReslove = docsReslove;
exports.isDirectory = isDirectory;
exports.readFileList = readFileList;
