const path = require('path');

module.exports = (options = {}) => {
  return {
    // 应该是定义一些常量类的东西
    define() {
      const COLOR = options.color || `rgb(${~~(255 * Math.random())},${~~(255 * Math.random())},${~~(255 * Math.random())})`;
      const EXCLUDECLASS = options.excludeClassName || '';
      return {
        COLOR, // 爱心颜色，默认随机色
        EXCLUDECLASS // 要排除元素的 class, 默认空 ''
      };
    },
    // 应用级别的配置
    enhanceAppFiles: [path.resolve(__dirname, 'love-me.js')]
  };
};
