const fs = require('fs');
const vuepressPluginDemoBlock = require('vuepress-plugin-demo-block');

const END_TYPE = 'container_demo_close';
const CLASS_WRAPPER = 'vuepress-plugin-demo-block__wrapper';
const CLASS_DISPLAY = 'vuepress-plugin-demo-block__display';
const CLASS_CODE = 'vuepress-plugin-demo-block__code';
const CLASS_FOOTER = 'vuepress-plugin-demo-block__footer';
const CLASS_APP = 'vuepress-plugin-demo-block__app';

module.exports = function (options = {}, context) {
  return {
    ...vuepressPluginDemoBlock(options, context),
    extendMarkdown(md) {
      md.use(require('markdown-it-container'), 'demo', {
        render: function render(tokens, idx) {
          const _tokens$idx = tokens[idx],
            nesting = _tokens$idx.nesting,
            info = _tokens$idx.info;

          if (nesting === -1) {
            return '\n            </div>\n            <div class="'.concat(
              CLASS_FOOTER,
              '"></div>\n            </div>\n          '
            );
          }

          let codeStr = '';
          let configStr = '';
          const typeStr = ~info.indexOf('react') ? 'react' : ~info.indexOf('vanilla') ? 'vanilla' : 'vue';

          for (let i = idx; i < tokens.length; i++) {
            const _tokens$i = tokens[i],
              type = _tokens$i.type,
              content = _tokens$i.content,
              _info = _tokens$i.info,
              _src = _tokens$i.src;
            if (type === END_TYPE) break;
            // if (!content) continue;
            if (!content) {
              if (type === 'fence') {
                if (_info === 'json') {
                  configStr = encodeURIComponent(content);
                } else if (_src) {
                  const source = fs.readFileSync(_src).toString();
                  codeStr = encodeURIComponent(source);
                }
              }
              continue;
            }
            if (type === 'fence') {
              if (_info === 'json') {
                configStr = encodeURIComponent(content);
              } else {
                codeStr = encodeURIComponent(content);
              }
            }
          }

          return '\n          <div\n            class="'
            .concat(CLASS_WRAPPER, '"\n            style="display: none;"\n            data-config="')
            .concat(configStr, '"\n            data-type="')
            .concat(typeStr, '"\n            data-code="')
            .concat(codeStr, '">\n              <div class="')
            .concat(CLASS_DISPLAY, '">\n                <div class="')
            .concat(CLASS_APP, '"></div>\n              </div>\n              <div class="')
            .concat(CLASS_CODE, '">\n        ');
        }
      });
    }
  };
};
