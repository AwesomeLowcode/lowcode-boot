import React from 'react';
import { Button, Icon } from '@alifd/next';
import { plugins, project, } from '@alilc/lowcode-engine';
import CodeEditor from "@alilc/lowcode-plugin-code-editor";
import AliLowCodeEngineExt from '@alilc/lowcode-engine-ext';
import { IPublicModelPluginContext } from '@alilc/lowcode-types'
import ComponentsPane from '@alilc/lowcode-plugin-components-pane';

import Logo from './logo';
import { PluginOptions } from 'src/types';
import { preview, resetSchema, saveSchema } from 'src/utils';

const registerDefaultPlugins = async (options: PluginOptions|undefined) => {

  const builtinPluginRegistry = (ctx: IPublicModelPluginContext) => {
    return {
      name: 'builtin-plugin-registry',
      async init() {
        const { skeleton } = ctx;
        const { logo: customLogoConfig } = options || {};

        // 注册 logo 面板
        skeleton.add({
          area: 'topArea',
          type: 'Widget',
          name: 'logo',
          content: Logo,
          contentProps: {
            logo: customLogoConfig?.logo || 'https://img.alicdn.com/imgextra/i4/O1CN013w2bmQ25WAIha4Hx9_!!6000000007533-55-tps-137-26.svg',
            href: customLogoConfig?.href || 'https://lowcode-engine.cn',
          },
          props: {
            align: 'left',
          },
        });
      },
    };
  }
  builtinPluginRegistry.pluginName = 'builtinPluginRegistry';
  await plugins.register(builtinPluginRegistry);

  // 设置内置 setter 和事件绑定、插件绑定面板
  const setterRegistry = (ctx: IPublicModelPluginContext) => {
    const { setterMap, pluginMap } = AliLowCodeEngineExt;
    return {
      name: 'ext-setters-registry',
      async init() {
        const { setters, skeleton } = ctx;
        // 注册setterMap
        setters.registerSetter(setterMap);
        // 注册插件
        // 注册事件绑定面板
        skeleton.add({
          area: 'centerArea',
          type: 'Widget',
          content: pluginMap.EventBindDialog,
          name: 'eventBindDialog',
          props: {},
        });

        // 注册变量绑定面板
        skeleton.add({
          area: 'centerArea',
          type: 'Widget',
          content: pluginMap.VariableBindDialog,
          name: 'variableBindDialog',
          props: {},
        });
      },
    };
  }
  setterRegistry.pluginName = 'setterRegistry';
  await plugins.register(setterRegistry);

  // const previewSample = (ctx: IPublicModelPluginContext) => {
  //   return {
  //     name: 'previewSample',
  //     async init() {
  //       const { skeleton } = ctx;
  //       skeleton.add({
  //         name: 'previewSample',
  //         area: 'topArea',
  //         type: 'Widget',
  //         props: {
  //           align: 'right',
  //         },
  //         content: (
  //           <Button ghost="light" iconSize="large" onClick={preview}>
  //             <Icon type="ic_preview_Select" />
  //           </Button>
  //         ),
  //       });
  //     },
  //   };
  // };
  // previewSample.pluginName = 'previewSample';
  // await plugins.register(previewSample);

  // // 注册保存面板
  // const saveSample = (ctx: IPublicModelPluginContext) => {
  //   return {
  //     name: 'saveSample',
  //     async init() {
  //       const { skeleton, hotkey } = ctx;
  //       skeleton.add({
  //         name: 'resetSchema',
  //         area: 'topArea',
  //         type: 'Widget',
  //         props: {
  //           align: 'right',
  //         },
  //         content: (
  //           <Button type="secondary" onClick={resetSchema}>
  //             重置
  //           </Button>
  //         ),
  //       });
  //       skeleton.add({
  //         name: 'saveSample',
  //         area: 'topArea',
  //         type: 'Widget',
  //         props: {
  //           align: 'right',
  //         },
  //         content: (
  //           <Button type="primary" onClick={saveSchema}>
  //             保存
  //           </Button>
  //         ),
  //       });

  //       hotkey.bind('command+s', (e) => {
  //         e.preventDefault();
  //         // saveSchema();
  //       });
  //     },
  //   };
  // }
  // saveSample.pluginName = 'saveSample';
  // await plugins.register(saveSample);

  // CodeEditor.pluginName = 'CodeEditor';
  // await plugins.register(CodeEditor);

  console.log('完成内置插件注册')
}

export default registerDefaultPlugins;