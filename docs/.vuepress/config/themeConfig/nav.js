/**
 * 顶部导航栏配置信息
 * @param {string} text 文字
 * @param {string} link 目录页链接，此处link是vdoing主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
 * @param {array} items items 以下所有 link 的值只是在相应 md 文件定义的永久链接（不是什么特殊生成的编码）。另外，注意结尾是有斜杠的
 */
module.exports = [
  { text: '首页', link: '/' },
  { text: '分类', link: '/categories/' },
  { text: '标签', link: '/tags/' },
  { text: '关于', link: '/about/' },
  { text: '归档', link: '/archives/' }
];
