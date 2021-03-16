const nav = require('./nav.js');
const htmlModules = require('./htmlModules');
const config = require('../../../../config'); // 项目基本配置

// 主题配置
module.exports = {
  sidebarDepth: 2, // 侧边栏显示深度，默认 1，最大 2（显示到 h3 标题）
  logo: '/logo.png', // 导航栏 logo
  repo: 'Roshin0320/roshin.github.io', // 导航栏右侧生成 Github 链接
  searchMaxSuggestions: 10, // 搜索结果显示最大数
  docsDir: 'docs', // 编辑的文件夹
  editLinks: true, // 启用编辑
  lastUpdated: '上次更新', // 开启更新时间，并配置前缀文字 string | boolean (取值为 git 提交时间)
  editLinkText: '编辑',
  nav,

  /* Vdoing 主题改动和新增的配置 */
  category: true, // 是否打开分类功能，默认 true
  tag: true, // 是否打开标签功能，默认 true
  archive: true, // 是否打开归档功能，默认 true
  categoryText: '随笔', // 碎片化文章（_posts文件夹的文章）预设生成的分类值，默认'随笔'
  // bodyBgImg: [], // body背景大图，默认无。 单张图片 String || 多张图片 Array, 多张图片时每隔15秒换一张。
  // bodyBgImgOpacity: 0.5, // body背景图透明度，选值 0 ~ 1.0, 默认0.5
  // titleBadgeIcons: [], // 文章标题前图标的地址，默认主题内置图标
  titleBadge: false, // 文章标题前的图标是否显示，默认 true
  contentBgStyle: 6, // 文章内容块的背景风格，默认无. 1 => 方格 | 2 => 横线 | 3 => 竖线 | 4 => 左斜线 | 5 => 右斜线 | 6 => 点状
  pageButton: true, // 是否显示快捷翻页按钮，默认 true
  rightMenuBar: true, // 是否显示右侧文章大纲栏，默认 true (屏宽小于1300px下无论如何都不显示)
  sidebarOpen: false, // 初始状态是否打开侧边栏，默认 true
  // 自动生成结构化侧边栏
  sidebar: {
    mode: 'structuring', // 温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页
    collapsable: true // 是否可折叠
  },
  // 最近更新栏
  updateBar: {
    showToArticle: true, // 显示到文章页底部，默认 true
    moreArticle: '/archives' // “更多文章” 跳转的页面，默认 '/archives'
  },
  // 文章默认的作者信息，可在 md 文件中单独配置此信息 String | {name: String, link: String}
  author: {
    name: 'roshin', // 必需
    link: 'https://github.com/Roshin0320' // 可选的
  },
  // 博主信息，显示在首页侧边栏
  blogger: {
    avatar: 'https://cdn.jsdelivr.net/gh/Roshin0320/images/blog/avatar.jpg',
    name: 'Roshin',
    slogan: config.desc
  },
  // 社交图标，显示于博主信息栏和页脚栏
  social: {
    // iconfontCssFile: '//at.alicdn.com/t/font_1678482_u4nrnp8xp6g.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自由添加
    icons: [
      {
        iconClass: 'icon-youjian',
        title: '发邮件',
        link: 'mailto:1425258785@qq.com'
      },
      {
        iconClass: 'icon-github',
        title: 'GitHub',
        link: 'https://github.com/Roshin0320'
      },
      {
        iconClass: 'icon-npm',
        title: 'NPM',
        link: 'https://www.npmjs.com/~roshin2'
      },
      {
        iconClass: 'icon-erji',
        title: '听音乐',
        link: 'https://music.163.com/#/playlist?id=755597173'
      }
    ]
  },
  // 页脚信息
  footer: {
    createYear: 2021, // 博客创建年份
    // 博客版权信息，支持 a 标签
    copyrightInfo:
      'Roshin | <a href="https://github.com/Roshin0320/roshin.github.io/blob/master/LICENSE" target="_blank">MIT License</a> | <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备18116277号-1</a>'
  },
  htmlModules // 插入hmtl(广告)模块
};
