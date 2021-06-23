/**
 * 顶部导航栏配置信息
 * @param {string} text 文字
 * @param {string} link 目录页链接，此处link是vdoing主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
 * @param {array} items items 以下所有 link 的值只是在相应 md 文件定义的永久链接（不是什么特殊生成的编码）。另外，注意结尾是有斜杠的
 */
module.exports = [
  { text: '首页', link: '/' },
  {
    text: '学习笔记',
    link: '/notes/',
    items: [{ text: '《数据结构与算法》笔记', link: '/note/structure/' }]
  },
  {
    text: 'JavaScript',
    link: '/js/',
    items: [
      { text: '手写代码', link: '/pages/87640caeb46e9/' },
      { text: '实用方法', link: '/pages/0ed58b3f0ce5b/' }
    ]
  },
  // {
  //   text: '文档教程',
  //   link: '/docs/',
  //   items: [{ text: '技术文档', link: '/pages/fc6c359ec7a8c/' }]
  // },
  // {
  //   text: '面试集锦',
  //   link: '/audition/',
  //   items: [{ text: 'JavaScript', link: '/pages/22250d7a02f68/' }]
  // },
  {
    text: '更多',
    link: '/more/',
    items: [
      { text: '文档教程', link: '/docs/' },
      { text: '面试集锦', link: '/audition/' }
    ]
  },
  {
    text: '索引',
    link: '/archives/',
    items: [
      { text: '分类', link: '/categories/' },
      { text: '标签', link: '/tags/' },
      { text: '归档', link: '/archives/' }
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
