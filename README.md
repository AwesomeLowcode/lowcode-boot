## Usage

```
import { start, LowcodePresetOptions } from '@ablula/lowcode-boot';

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

const DefaultSchema = {
  "componentName": "Page",
  "props": {},
  "hidden": false,
  "title": "",
  "isLocked": false,
  "condition": true,
  "conditionGroup": "",
  "dataSource": {
    "list": []
  },
  "state": {},
  "methods": {
    "testFunc": {
      "type": "JSFunction",
      "value": "function testFunc() {\n  console.log('test aliLowcode func');\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"test-aliLowcode-func\"\n  }, this.state.test);\n}",
      "source": "function testFunc() {\n  console.log('test aliLowcode func');\n  return <div className=\"test-aliLowcode-func\">\n        {this.state.test}\n      </div>;\n}"
    }
  },
  "lifeCycles": {},
  "originCode": "class Page extends Component {\n  undefined\n  \n  \n  // 你可以在这里编写函数，并且与组件的事件进行绑定，支持JSX语法\n  testFunc() {\n    console.log('test aliLowcode func');\n    return (\n      <div className=\"test-aliLowcode-func\">\n        {this.state.test}\n      </div>\n    );\n  }\n  \n}",
  "css": "",
  "children": [
  ]
}


(async function main() {

  // assets 中包含 plugins 和 setters (assets.extConfig.customExt)，可动态插入
  const assets = await (await fetch(`https://i.ablula.tech/npm/@ablula/lowcode-assets-jinchan@0.0.3/assets.json`)).json();
  
  const schema = await getPageSchema();

  await start(assets, schema, LCE_CONTAINER, config)

})();

```

## Develop

### npm install

```
npm i -dd --registry=https://registry.npmmirror.com --legacy-peer-deps
```

### dev

```
npm start
```

## Publish

```
npm publish
```
