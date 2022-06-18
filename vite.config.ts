import { UserConfig, ConfigEnv, loadEnv } from "vite";
import { resolve } from "path";
import { wrapperEnv } from './build/vite/utils'
import { createVitePlugins } from "./build/vite/plugin";

export default ({ command, mode }: ConfigEnv): UserConfig => {

  const root = process.cwd()
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  console.log("当前环境变量:",viteEnv)

  // 所有env文件里面的变量
  const {VITE_PUBLIC_PATH,VITE_DROP_CONSOLE} = viteEnv
  const isBuild = command === 'build'

  return {
    plugins: createVitePlugins(viteEnv,isBuild),
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        components: resolve(__dirname, "src/components"),
        icons: resolve(__dirname, "src/assets/icons"),
        images: resolve(__dirname, "src/assets/images"),
        svgs: resolve(__dirname, "src/assets/svgs"),
      },
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      outDir: "dist",
      assetsDir: "src/assets",
      target: "es2015",
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          entryFileNames: "entry/[name]-[hash].js",
          assetFileNames: "assets/[name].[ext]",
        },
      },
      chunkSizeWarningLimit: 2000,
    },
  };
};
