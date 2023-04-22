
import { AssetLoader } from '@alilc/lowcode-utils';
import { init, plugins } from '@alilc/lowcode-engine';
import { IPublicTypeRootSchema, IPublicModelPluginContext, IPublicTypePlugin } from '@alilc/lowcode-types';

import { LowcodePresetOptions, Assets, CustomExt, AssetsExtConfig } from './types';

import registerDefaultPlugins from './plugins';
import registerDefaultSetters from './setters';

import './index.scss';

export * from '@alilc/lowcode-engine';
export * from './types';

const initConfig = {
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
};

const setupWithInitCallback = async (customInit: IPublicTypePlugin, customExt: CustomExt, container: HTMLElement | null, options: LowcodePresetOptions) => {
  const realConfig = { ...initConfig, ...(options || {})};
  const { pluginConfig, ...otherConfig } = realConfig;
  
    const { urls, library } = customExt || {};
  
    if (urls?.length && library) {
      const assetLoader = new AssetLoader();
      await assetLoader.load(urls);
    
      await window[library]?.registerCustomExt?.();
    }

  await registerDefaultPlugins(pluginConfig);
  await registerDefaultSetters();
  
  // 处理外部传入初始化回调
  if (typeof customInit === 'function') {
    customInit.pluginName = 'editorInit';
    await plugins.register(customInit);
  }

  init(container as HTMLElement, otherConfig);
}

const setupWithAssets = async (assets: Assets, defaultSchema: IPublicTypeRootSchema, container: HTMLElement | null, options: LowcodePresetOptions) => {

  const { extConfig } = assets;

  const { customExt } = extConfig as AssetsExtConfig;
  
  const customInit = (ctx: IPublicModelPluginContext) => {
    return {
      name: 'editor-init',
      async init() {
        // 设置物料描述
        const { material, project } = ctx;
  
        await material.setAssets(assets);
  
        // 加载 schema
        project.openDocument(defaultSchema);
      },
    };
  };
  customInit.pluginName = 'customInit';

  await setupWithInitCallback(customInit, customExt, container, options);

}

export { setupWithAssets, setupWithInitCallback };

export default setupWithInitCallback;