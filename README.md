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
  const assets = await (
    await fetch(
      `https://alifd.alicdn.com/npm/@alilc/lowcode-materials@1.1.0/build/lowcode/assets-prod.json`
    )
  ).json();
  
  const schema = DefaultSchema;


  await start({
    ...assets,
    extConfig: {
      customExt: {
        urls: [
          'https://i.ablula.tech/npm/@ablula/lowcode-ext-1@0.0.6/dist/lowcodeExt1.js',
          'https://i.ablula.tech/npm/@ablula/lowcode-ext-1@0.0.6/dist/lowcodeExt1.css',
        ],
        library: 'AblulaLowcodeExt1'
      }
    }
  }, schema, LCE_CONTAINER, config)

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
