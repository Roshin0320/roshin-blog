/**
 * 批量添加和修改front matter ，需要配置 ./config.yml 文件。
 */

const path = require('path');
const fse = require('fs-extra'); // fs 扩展工具包
const matter = require('gray-matter'); // front matter解析器 https://github.com/jonschlinkert/gray-matter
const chalk = require('chalk'); // 命令行打印美化
const { prompt } = require('enquirer'); // 创建交互式 cli 提示
const yaml = require('js-yaml'); // YAML 解析器
const jsonToYaml = require('json2yaml'); // 将 JSON 转换为YAML
const dayjs = require('dayjs'); // 类似于 moment.js 的日期处理插件

const { type, readFileList } = require('./utils');

main();

/**
 * 主体函数
 */
async function main() {
  const { edit } = await prompt({
    type: 'confirm',
    name: 'edit',
    message: '批量操作frontmatter有修改数据的风险，确定要继续吗？',
    initial: 'Y'
  });
  // 退出操作
  if (!edit) return;
  const config = resolveConfig(); // 拿到配置信息
  const files = readFileList(...(config.path || [])); // 拿到所有的 md 文件
  files.forEach((file) => {
    const dataStr = fse.readFileSync(file.filePath, 'utf-8');
    const fileMatterObj = matter(dataStr); // 解析 md 文件的front Matter
    const matterData = fileMatterObj.data; // 得到 md 文件的front Matter

    let mark = false;
    // 删除操作
    if (config.delete.length) {
      config.delete.forEach((item) => {
        if (matterData[item]) {
          delete matterData[item];
          mark = true;
        }
      });
    }

    // 添加、修改操作
    if (type(config.data) === 'object') {
      Object.assign(matterData, config.data); // 将配置数据合并到 front Matter 对象
      mark = true;
    }

    // 有操作时才继续
    if (mark) {
      if (matterData.date && type(matterData.date) === 'date') {
        matterData.date = dayjs(matterData.date).format('YYYY-MM-DD HH:mm:ss'); // 修复时间格式
      }
      const newData =
        jsonToYaml
          .stringify(matterData)
          .replace(/\n\s{2}/g, '\n')
          .replace(/"/g, '') +
        '---\r\n' +
        fileMatterObj.content;
      fse.writeFileSync(file.filePath, newData); // 写入
      console.log(chalk.green(`update frontmatter：${file.filePath} `));
    }
  });
}

/**
 * 解析配置项
 * @param {object} _config 配置信息
 * @returns {boolean} 返回配置信息
 */
function resolveConfig() {
  const configPath = path.join(__dirname, 'config.yml'); // 配置文件的路径
  const config = yaml.load(fse.readFileSync(configPath, 'utf-8')); // 将 yaml 字符串解析成js对象
  config.path = config.path || [];
  config.delete = config.delete || [];
  config.data = config.data || {};
  if (!Array.isArray(config.path)) return console.log(chalk.red('配置有误, path 字段应该是一个数组'));
  if (!Array.isArray(config.delete)) return console.log(chalk.red('配置有误, delete 字段应该是一个数组！'));
  if (type(config.data) !== 'object') return console.log(chalk.red('配置有误, data 字段应该是一个数组！'));
  return config;
}
