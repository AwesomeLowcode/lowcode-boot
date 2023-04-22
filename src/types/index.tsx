import { IPublicModelPluginContext, IPublicTypeEngineOptions, IPublicTypeAssetsJson } from '@alilc/lowcode-types';

export interface Logo {
  logo?: string;
  href?: string;
}

export interface PluginOptions {
  logo: Logo
}


export interface LowcodePresetOptions extends IPublicTypeEngineOptions {
  pluginConfig?: PluginOptions;
}

export interface Assets extends IPublicTypeAssetsJson{
  /**
   * 平台扩展配置
   */
  extConfig?: AssetsExtConfig;
}

export interface AssetsExtConfig {
  [index: string]: any;
  customExt: CustomExt;
}

export interface CustomExt {
  npm: string;
  urls: string[],
  library: string;
}