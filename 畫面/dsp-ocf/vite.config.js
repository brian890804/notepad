/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		base: process.env.VITE_APP_CONTEXT_ROOT,
		build: {
			assetsInlineLimit: 4096,
			emptyOutDir: true,
			cssCodeSplit: true,
			minify: 'terser',
			rollupOptions: {
				output: {
					chunkFileNames: 'assets/js/[name].[hash:10].js',
					entryFileNames: 'assets/js/[name].[hash:10].js',
					assetFileNames: ({ name }) => {
						if (/\.(gif|jpe?g|png)$/.test(name ?? '')) {
							return 'assets/images/[name].[hash:10][extname]';
						}

						if (/\.css$/.test(name ?? '')) {
							return 'assets/css/[name].[hash:10][extname]';
						}

						return 'assets/[name].[hash:10][extname]';
					},
				},
			},
		},
		publicDir: path.resolve(__dirname, './src/assets'),
		plugins: [
			react(),
			svgr(),
			eslintPlugin({
				include: ['src/**/*.jsx', 'src/**/*.js'],
			}),
		],
		resolve: {
			alias: {
				'~app': path.resolve(__dirname, './src/app'),
				'~assets': path.resolve(__dirname, './src/assets'),
				'~config': path.resolve(__dirname, './src/config'),
			},
		},
		server: {
			host: '0.0.0.0',
			port: 9999,
			proxy: {
				'^/dsp-.*': {
					target: 'https://twtpepcfwnd2.deltaos.corp',
					changeOrigin: true,
					secure: false,
				},
			},
		},
	});
};
