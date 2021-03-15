/**
 * 插入自定义html模块 (可用于插入广告模块等)
 * @param {htmlString} homeSidebarB 首页侧边栏底部
 * @param {htmlString} sidebarT 全局左侧边栏顶部
 * @param {htmlString} sidebarB 全局左侧边栏底部
 * @param {htmlString} pageT 全局页面顶部
 * @param {htmlString} pageB 全局页面底部
 * @param {string} pageTshowMode 页面顶部-显示方式：未配置默认全局；'article' => 仅文章页①； 'custom' => 仅自定义页①
 * @param {string} pageBshowMode 页面底部-显示方式：未配置默认全局；'article' => 仅文章页①； 'custom' => 仅自定义页①
 * @param {htmlString} windowLB 全局窗口左下角②
 * @param {htmlString} windowRB 全局窗口右下角②
 * ①注：在.md文件front matter配置`article: false`的页面是自定义页，未配置的默认是文章页（首页除外）。
 * ②注：windowLB 和 windowRB：1.展示区块宽高最大是200*200px。2.请给自定义元素定一个不超过200px的固定宽高。3.在屏宽小于960px时无论如何都不会显示。
 */

module.exports = {
  // homeSidebarB: `<div style="width:100%;height:100px;color:#fff;background: #eee;">自定义模块测试</div>`,
  // sidebarT: `<div style="width:100%;height:100px;color:#fff;background: #eee;">自定义模块测试</div>`,
  // sidebarB: `<div style="width:100%;height:100px;color:#fff;background: #eee;">自定义模块测试</div>`,
  // pageT: `<div style="width:100%;height:100px;color:#fff;background: #eee;">自定义模块测试</div>`,
  // pageB: `<div style="width:100%;height:100px;color:#fff;background: #eee;">自定义模块测试</div>`,
  // windowLB: `<div style="width:100%;height:100px;color:#fff;background: #eee;">自定义模块测试</div>`,
  // windowRB: `<div style="width:100%;height:100px;color:#fff;background: #eee;">自定义模块测试</div>`
};
