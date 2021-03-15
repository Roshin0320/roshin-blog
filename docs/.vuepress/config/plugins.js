require('dotenv').config();

const dayjs = require('dayjs'); // 类似于 moment.js 的日期处理插件
const config = require('../../../config'); // 项目基本配置

// 插件配置
module.exports = [
  'vuepress-plugin-baidu-autopush', // 百度自动推送
  // 鼠标点击爱心特效
  [
    require('../plugins/love-me'),
    {
      color: '#11a8cd', // 爱心颜色，默认随机色
      excludeClassName: 'theme-vdoing-content' // 要排除元素的class, 默认空''
    }
  ],
  [
    'sitemap',
    {
      hostname: config.hostname, // 网站根 url
      outFile: 'sitemap.xml', // 站点地图文件名
      // urls: [], // 要附加的自定义URL
      exclude: ['/404.html'], // 排除无实际内容的页面
      dateFormatter: (time) => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    }
  ],
  // 可以添加第三方搜索链接的搜索框（原官方搜索框的参数仍可用）
  [
    'thirdparty-search',
    {
      // 可选，默认 []
      thirdparty: [
        {
          title: '在MDN中搜索',
          frontUrl: 'https://developer.mozilla.org/zh-CN/search?q=', // 搜索链接的前面部分
          behindUrl: '' // 搜索链接的后面部分，可选，默认 ''
        },
        {
          title: '在Runoob中搜索',
          frontUrl: 'https://www.runoob.com/?s='
        },
        {
          title: '在Vue API中搜索',
          frontUrl: 'https://cn.vuejs.org/v2/api/#'
        },
        {
          title: '在Bing中搜索',
          frontUrl: 'https://cn.bing.com/search?q='
        },
        {
          title: '通过百度搜索本站的',
          frontUrl: 'https://www.baidu.com/s?wd=site%3Aroshin.cn%20'
        }
      ]
    }
  ],
  // 代码块复制按钮
  [
    'vuepress-plugin-one-click-copy',
    {
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // 字符串或数组
      copyMessage: '复制成功', // 提示文字
      duration: 1000, // 提示信息显示时间
      showInMobile: false // 是否显示在移动端，默认值：false。
    }
  ],
  // demo演示模块 https://daxigua.me/vuepress-plugin-demo-block/zh/
  [
    'demo-block',
    {
      settings: {
        // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
        // cssLib: ['http://xxx'], // 在线示例中的css依赖
        // vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
        jsfiddle: false, // 是否显示 jsfiddle 链接
        codepen: true, // 是否显示 codepen 链接
        horizontal: false // 是否展示为横向样式
      }
    }
  ],
  // 放大图片
  [
    'vuepress-plugin-zooming',
    {
      selector: '.theme-vdoing-content img:not(.no-zoom)',
      options: {
        bgColor: 'rgba(0,0,0,0.6)'
      }
    }
  ],
  // 百度统计
  ['vuepress-plugin-baidu-tongji', { hm: '9b5f581c3a93e89e731b407638db384b' }],
  // 评论
  [
    'vuepress-plugin-comment',
    {
      choosen: 'gitalk',
      options: {
        clientID: '1229a984c761c4c4863d', // GitHub应用程序客户端ID
        clientSecret: 'a74337951df1d42b82233f90f56237a234c94022', // GitHub应用程序客户端秘钥
        repo: config.repo, // GitHub 仓库
        owner: config.username, // GitHub仓库所有者，可以是个人用户或组织
        admin: [config.username], // GitHub仓库的所有者和协作者(对此存储库具有写访问权的用户)
        // number: -1, // GitHub issue ID 标识，若未定义 number 属性则会使用 id 进行定位
        id: '<%- (frontmatter.permalink || frontmatter.to.path).slice(-21) %>', // 页面的唯一标识。长度必须小于50
        title: '「评论」<%- frontmatter.title.split("|")[0] %>', // GitHub issue 的标题
        labels: ['Gitalk', 'Comment'], // GitHub issue 的标签
        body: '页面: <%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>', // GitHub issue 的内容
        language: 'zh-CN', // 设置语言，支持 [en, zh-CN, zh-TW, es-ES, fr, ru, de, pl, ko], 默认 navigator.language || navigator.userLanguage
        perPage: 10, // 每次加载的数据大小，最多 100。
        distractionFreeMode: true, // 类似 Facebook 评论框的全屏遮罩效果.
        pagerDirection: 'last', // 评论排序方式，按创建时间 'first' 正序 | 'last' 倒序
        // 如果当前页面没有相应的 isssue 且登录的用户属于 admin，则会自动创建 issue。
        // 如果设置为 true，则显示一个初始化页面，创建 issue 需要点击 init 按钮。
        createIssueManually: false,
        // proxy: false, // GitHub oauth 请求到反向代理，为了支持 CORS
        // 评论列表的动画，参考 https://github.com/joshwcomeau/react-flip-move/blob/master/documentation/enter_leave_animations.md
        // flipMoveOptions: {
        //   staggerDelayBy: 150,
        //   appearAnimation: 'accordionVertical',
        //   enterAnimation: 'accordionVertical',
        //   leaveAnimation: 'accordionVertical'
        // },
        enableHotKey: true // 启用快捷键(cmd|ctrl + enter) 提交评论
      }
    }
  ],
  // "上次更新"时间格式
  [
    '@vuepress/last-updated',
    {
      transformer: (timestamp) => dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
    }
  ]
];
