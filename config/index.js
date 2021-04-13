/**
 * 项目基本配置
 */

const path = require('path');

module.exports = {
  title: "Roshin's blog", // 网站的标题
  desc: '如果你只做自己能力范围之内的事情，就永远没法进步。', // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中
  hostname: 'https://roshin.cn', // 域名
  repo: 'roshin-blog', // GitHub 仓库
  username: 'Roshin0320', // GitHub仓库所有者，可以是个人用户或组织
  sitemapPath: path.resolve(__dirname, '../dist/sitemap.xml'), // sitemap.xml 的路径，无需修改
  docsPath: path.resolve(__dirname, '../docs'), // docs 文件路径
  tempPath: path.resolve(__dirname, '../temp') // temp 文件路径
};
