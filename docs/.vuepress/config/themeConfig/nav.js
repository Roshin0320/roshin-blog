/**
 * 顶部导航栏配置信息
 * @param {string} text 文字
 * @param {string} link 目录页链接，此处link是vdoing主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
 * @param {array} items items 以下所有 link 的值只是在相应 md 文件定义的永久链接（不是什么特殊生成的编码）。另外，注意结尾是有斜杠的
 */
module.exports = [
  { text: '首页', link: '/' },
  // { text: '分类', link: '/categories/' },
  // { text: '标签', link: '/tags/' },
  // { text: '关于', link: '/about/' },
  // { text: '归档', link: '/archives/' },
  {
    text: '学习笔记',
    link: '/notes',
    items: [
      { text: '《JavaScript 教程》笔记', link: '/note/javascript/' },
      { text: '《ES6 教程》笔记', link: '/note/es6/' }
    ]
  },
  {
    text: '技术文档',
    link: '/technology',
    items: [
      { text: '《JavaScript教程》笔记', link: '/note/javascript/' },
      { text: '《ES6 教程》笔记', link: '/note/es6/' }
    ]
  },
  {
    text: '实用技巧',
    link: '/other',
    items: [
      { text: '《JavaScript教程》笔记', link: '/note/javascript/' },
      { text: '《ES6 教程》笔记', link: '/note/es6/' }
    ]
  },
  {
    text: '更多',
    link: '/more/',
    items: [
      { text: '分类', link: '/categories/' },
      { text: '标签', link: '/tags/' },
      { text: '归档', link: '/archives/' },
      {
        text: '',
        items: [
          { text: '面试', link: '/pages/602107615ad25/' },
          { text: '心情杂货', link: '/pages/3bbfa3740eb55/' },
          { text: '网站收藏', link: '/pages/b53ad9826d6c8/' },
          { text: '资源收藏', link: '/pages/da33a7a7bcadb/' },
          { text: '在线工具', link: '/pages/4806cc5c8acbd/' }
        ]
      }
    ]
  },
  {
    text: '关于',
    link: '/about/',
    items: [
      { text: '个人介绍', link: '/about/' },
      { text: '关于博客', link: '/blog/' },
      { text: '友情链接', link: '/friends/' }
    ]
  }
];
