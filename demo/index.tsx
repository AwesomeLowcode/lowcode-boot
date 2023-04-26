import { getPageSchema } from '../src/utils';
import { start, LowcodePresetOptions } from '../src/index';

const LCE_CONTAINER = document.getElementById('lce-container');

const config: LowcodePresetOptions = {
  // locale: 'zh-CN',
  enableCondition: true,
  enableCanvasLock: true,
  // 默认绑定变量
  supportVariableGlobally: true,
  // simulatorUrl 在当 engine-core.js 同一个父路径下时是不需要配置的！！！
  // 这里因为用的是 alifd cdn，在不同 npm 包，engine-core.js 和 react-simulator-renderer.js 是不同路径
  simulatorUrl: [
    'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@1.0.18/dist/css/react-simulator-renderer.css',
    'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@1.0.18/dist/js/react-simulator-renderer.js'
  ],
  pluginConfig: {
    logo: {
      logo: 'https://i.ablula.tech/awesome-lowcode/logo.png',
      href: 'https://space.bilibili.com/6962628'
    }
  }
};


(async function main() {
  const assets = await (await fetch(`https://i.ablula.tech/npm/@ablula/lowcode-assets-jinchan@0.0.3/assets.json`)).json();
  
  const schema = await getPageSchema();

  await start(assets, schema, LCE_CONTAINER, config)

})();
