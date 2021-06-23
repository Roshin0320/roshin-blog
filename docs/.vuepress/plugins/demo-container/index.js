const path = require('path');
const vuepressPluginDemoContainer = require('vuepress-plugin-demo-container');
const demoBlockContainers = require('./containers');

module.exports = function (options = {}, context) {
  return {
    ...vuepressPluginDemoContainer(options, context),
    chainMarkdown(config) {
      config.plugin('containers').use(demoBlockContainers(options)).end();
    },
    // 应用级别的配置
    enhanceAppFiles: [path.resolve(__dirname, 'enhanceApp.js')]
  };
};
