/**
 * 自动初始化 gitalk 评论
 * @example
 *  node ./script/baiduPush.js <domain> => 生成百度链接推送文件
 */
require('dotenv').config();

const url = require('url');
const request = require('request');
const config = require('../config'); // 项目基本配置
const fse = require('fs-extra'); // fs 扩展工具包
// const yaml = require('js-yaml'); // YAML 解析器
const xmlParser = require('xml-parser'); // XML解析器
const cheerio = require('cheerio'); // 服务器端操控 HTML 的工具库，jQuery语法
const crypto = require('crypto'); // 通用的加密和哈希算法

// issues 路径
const issuesUrl = `https://api.github.com/repos/${config.username}/${config.repo}/issues?access_token=${process.env.GITALK_INIT_TOKEN}`;

// 忽略的页面
const ignore = ['/', '/tags/', '/archives/', '/categories/', '/about/'];

// 发送请求
const send = {
  // get 请求
  async get(options) {
    const res = await sendRequest({
      url: `${issuesUrl}&page=1&per_page=1000`,
      json: true,
      headers: { 'User-Agent': 'github-user' },
      ...options
    });
    return res;
  },
  // post 请求
  async post(options) {
    const res = await sendRequest({
      url: issuesUrl,
      json: true,
      headers: { 'User-Agent': 'github-user' },
      method: 'POST',
      form: '',
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

    // 筛选出要忽略的页面
    for (let i = 0; i < notInitIssueLinks.length; i++) {
      if (ignore.includes(normalizeUrl(notInitIssueLinks[i]))) {
        notInitIssueLinks.splice(i, 1);
        i--;
      }
    }

    if (notInitIssueLinks.length > 0) {
      console.log(`本次有${notInitIssueLinks.length}个链接需要初始化issue：`);
      console.log(notInitIssueLinks);
      console.log('开始提交初始化请求, 大约需要40秒...');
      /**
       * 部署好网站后，直接执行 start，新增文章并不会生成评论
       * 经测试，最少需要等待 40 秒，才可以正确生成，怀疑跟 github 的 api 有关系，没有找到实锤
       */
      setTimeout(async () => {
        const initRet = await notInitIssueLinks.map(async (item) => {
          const html = await send.get({ url: item });
          const title = cheerio.load(html)('title').text();
          const desc = cheerio.load(html)("meta[name='description']").attr('content');
          const pathLabel = url.parse(item).path;
          const label = crypto.createHash('md5').update(pathLabel, 'utf-8').digest('hex');
          const form = JSON.stringify({
            title: `「评论」${title.split('|')[0]}`,
            body: item + '\n\n' + desc,
            labels: ['Gitalk', 'Comment', label]
          });
          const res = await send.post({ form });
          return res;
        });
        console.log(`已完成${initRet.length}个！`);
        console.log('可以愉快的发表评论了！');
      }, 40000);
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
 * 规范化 url
 * @param {string} url 连接地址
 * @return {string} 去除协议头后的连接
 */
function normalizeUrl(url) {
  const reg = new RegExp(`^${config.hostname}`, 'g');
  return url.replace(reg, '');
}

/**
 * 发送请求
 * @param {object} options 请求配置
 * @return {Promise} 返回请求结果
 */
function sendRequest(options) {
  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if (!error) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}