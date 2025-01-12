import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const VitePlugins = [
    react({
      babel: {
        plugins: ['@babel/plugin-proposal-optional-chaining'],
      },
    }),
    // arco-design 按需引入
    vitePluginImp({
      libList: [
        {
          libName: '@arco-design/web-react',
          style: () => '@arco-design/web-react/dist/css/index.less', // 开发模式下全量引入css，减少因按需加载导致的 vite 进行多次编译进而影响正常开发流程
          camel2DashComponentName: false,
        },
      ],
    }),
  ];

  return {
    base: '/aweiThree',
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
    },
    preview: {
      port: 3100,
    },
    plugins: VitePlugins,
    build: {
      minify: false,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: mode === 'prod', // 正式环境打包删除 console
        },
      },
    },
  };
});
