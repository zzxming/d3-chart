import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			imports: ['vue', 'vue-router', 'pinia'],
			dts: 'src/auto-imports.d.ts',
		}),
		Components({
			// 查找路径
			// dirs: ['src/components/', 'src/pages', 'assets/iconfont'],
			// 以 .vue 结尾的文件
			extensions: ['vue'],
			dts: 'src/components.d.ts',
			// 递归查找子目录
			deep: true,
		}),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	css: {
		preprocessorOptions: {
			// 引入全局变量
			less: {
				javascripteEnable: true,
				additionalData: `@import "${resolve(__dirname, 'src/assets/style/variable.less')}";`,
			},
		},
	},
	build: {
		outDir: 'docs',
	},
});
