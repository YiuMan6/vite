import { PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import { configCompressPlugin } from "./compress";
import { configImageminPlugin } from "./imagemin";
import { configSvgIconsPlugin } from "./svgSprite";

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins: PluginOption | PluginOption[] = [
    // have to
    react(),
  ];

  VITE_LEGACY && isBuild && vitePlugins.push(legacy());
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  if (isBuild) {
    // 压缩图片
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // 压缩成gz等任意自定义文件，传送压缩后的文件去浏览器，传送速度会提高
    vitePlugins.push(
      configCompressPlugin(
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      )
    );
  }
  return vitePlugins;
}
