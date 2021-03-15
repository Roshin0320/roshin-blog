/**
 * 项目基本配置
 */

const path = require('path');

module.exports = {
  hostname: 'https://roshin.cn', // 域名
  repo: 'roshin-blog', // GitHub 仓库
  username: 'Roshin0320', // GitHub仓库所有者，可以是个人用户或组织
  sitemapPath: path.resolve(__dirname, '../dist/sitemap.xml'), // sitemap.xml 的路径，无需修改
  docsPath: path.resolve(__dirname, '../docs'), // docs 文件路径
  tempPath: path.resolve(__dirname, '../temp') // temp 文件路径
};
