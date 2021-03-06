const path = require('path');
const plugins = require('./config/plugins');
const themeConfig = require('./config/themeConfig');
const config = require('../../config'); // 项目基本配置

const keywords = ['Roshin', '个人博客', '技术文档', '学习笔记', '收藏', 'JavaScript', 'js', 'TypeScript', 'ts'];
const resolve = (dir = '') => path.resolve(__dirname, dir); // 解析绝对路径

module.exports = {
  title: config.title, // 网站的标题
  description: config.desc, // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中
  base: '/', // 部署站点的基础路径，如果你想让你的网站部署到一个子路径下，你将需要设置它。
  dest: 'dist', // 指定 build 的输出目录
  host: '0.0.0.0', // 主机名
  port: 10320, // 指定端口号
  // theme: 'vdoing', // 使用依赖包主题
  theme: require.resolve('./theme-vdoing'), // 使用本地主题
  // 注入到页面 <head> 中的标签，格式 [tagName, { attrName: attrValue }, innerHTML?]
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // favicons，资源放在 public 文件夹
    ['meta', { name: 'keywords', content: keywords.join(',') }], // 属性关键字
    ['meta', { name: 'baidu-site-verification', content: 'code-ZIXMiJyY4n' }], // 百度统计的站长验证
    ['meta', { name: 'theme-color', content: '#11a8cd' }], // 移动浏览器主题颜色
    ['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js' }]
  ],
  // markdown 扩展
  markdown: {
    lineNumbers: true, // 是否在每个代码块的左侧显示行号
    anchor: {
      permalink: true, // 是否在标题旁加入锚链接
      permalinkBefore: false, // 将锚链接放在标题的前面
      permalinkSymbol: '#' // 锚链接的符号
    }
  },
  themeConfig, // 主题配置
  plugins, // 插件
  // 通过链式操作改变 webpack 配置
  chainWebpack: (config) => {
    // 设置别名
    // console.log(resolve('../../src/'), 123123);
    config.resolve.alias.set('@src', resolve('../../src/')).set('@vuepress', resolve('./'));
  },
  // 指定额外的需要被监听的文件。
  extraWatchFiles: ['.vuepress/plugins']
};
