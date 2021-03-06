/**
 * 自动初始化 gitalk 评论
 * @example
 *  node ./script/baiduPush.js <domain> => 生成百度链接推送文件
 */
require('dotenv').config();

const url = require('url');
const axios = require('axios');
const config = require('../config'); // 项目基本配置
const fse = require('fs-extra'); // fs 扩展工具包
// const yaml = require('js-yaml'); // YAML 解析器
const xmlParser = require('xml-parser'); // XML解析器
const cheerio = require('cheerio'); // 服务器端操控 HTML 的工具库，jQuery语法
// const crypto = require('crypto'); // 通用的加密和哈希算法

// 创建请求器
const instance = axios.create({
  headers: {
    'User-Agent': 'github-user'
  }
});

// 添加响应拦截器
instance.interceptors.response.use((response) => {
  return response.data || response;
});

// issues 路径
const issuesUrl = `https://api.github.com/repos/${config.username}/${config.repo}/issues?access_token=${process.env.GITALK_INIT_TOKEN}`;

// 包含的页面，null 表示所有页面
const includes = ['/about/', '/blog/', '/friends/', /\/pages\/[a-zA-Z\d]+\//];

// 发送请求
const send = {
  // get 请求
  async get(options = {}) {
    const res = await instance.get(options.url || issuesUrl, {
      ...options
    });
    return res;
  },
  // post 请求
  async post(options = {}) {
    console.log(options.url || issuesUrl);
    const res = await instance.post(options.url || issuesUrl, {
      ...options
    });
    return res;
  }
};

console.log('开始初始化评论...');
main();

async function main() {
  try {
    // 检索站点所有连接
    console.log('开始检索链接，请稍等...');
    const urls = sitemapXmlReader();
    console.log(`共检索到${urls.length}个链接`);

    // 获取已经初始化的 issues
    console.log('开始获取已经初始化的 issues');
    const issues = await send.get();
    console.log(`已经存在${issues.length}个issues`);

    // 筛选出没有初始化 issues 的连接
    const notInitIssueLinks = urls.filter((link) => !issues.some((item) => item.body.includes(link)));

    // 筛选出要包含的页面
    if (includes) {
      for (let i = 0; i < notInitIssueLinks.length; i++) {
        // 规范化 url
        const normalizeUrl = url.parse(notInitIssueLinks[i]).path;
        const isInclude = includes.some((v) => {
          if (typeof v === 'string') return v === normalizeUrl;
          return v.test(normalizeUrl);
        });
        if (!isInclude) {
          notInitIssueLinks.splice(i, 1);
          i--;
        }
      }
    }

    if (notInitIssueLinks.length > 0) {
      console.log(`本次有${notInitIssueLinks.length}个链接需要初始化issue：`);
      console.log(notInitIssueLinks);
      console.log('开始提交初始化请求, 大约需要40秒...');

      notInitIssueLinks.map((item) => start(item));
    } else {
      console.log('本次发布无新增页面，无需初始化issue!!');
    }
  } catch (e) {
    console.log(`初始化issue出错，错误如下：`);
    console.log(e);
  }
}

/**
 * sitemap.xml 读取器
 */
function sitemapXmlReader() {
  const data = fse.readFileSync(config.sitemapPath, 'utf-8');
  const sitemap = xmlParser(data);
  return (sitemap.root || {}).children.map(function (url) {
    const loc = url.children.filter(function (item) {
      return item.name === 'loc';
    })[0];
    return loc.content;
  });
}

/**
 * 部署好网站后，直接执行 start，新增文章并不会生成评论
 * 经测试，最少需要等待 40 秒，才可以正确生成，怀疑跟 github 的 api 有关系，没有找到实锤
 */
async function start(_notInitIssueLink) {
  setTimeout(async () => {
    const pathLabel = url.parse(_notInitIssueLink).path;

    // 检测如果已经存在相关评论，跳过
    const issues = await send.get({ params: { labels: pathLabel } });
    if (issues.length) return;

    let html = '';
    try {
      html = await send.get({ url: _notInitIssueLink });
    } catch (error) {}
    const title = cheerio.load(html)('title').text() || '';
    if (!title || title === config.title) {
      console.log('页面暂未生成，40s 后重新检索');
      return start(_notInitIssueLink); // 如果没有拿到 title, 认为没有生成页面，继续等待
    }
    const data = {
      title: `「评论」${title.split('|')[0]}`,
      body: `页面: ${_notInitIssueLink}`,
      labels: ['Gitalk', 'Comment', pathLabel]
    };
    const res = await send.post({ ...data });
    console.log(`已完成 ${_notInitIssueLink} 的初始化！`);
    console.log('可以愉快的发表评论了！');
    return res;
  }, 40000);
}
