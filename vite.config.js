import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer' // 代码分析
import compression from 'vite-plugin-compression' // gzip 压缩插件
import { dateFormat } from './src/common.js'
// import progress from 'vite-plugin-progress'
export default defineConfig(({mode}) =>{
  // const isDev = mode === 'development'
  return {
    base: '/real_source_dataset/', // 打包资源路径，'./' 适用于相对路径部署；若部署到子路径，改为 '/子路径/'
    plugins: [
      vue(),
      AutoImport({ resolvers: [ElementPlusResolver()] }), // 自动导入 Element Plus
      Components({ resolvers: [ElementPlusResolver()] }), // 自动导入 Element Plus
      // progress(), // ✅ 构建时显示进度条
      compression({ // 代码压缩
        algorithm: 'gzip', // 支持 'gzip'、'brotliCompress'
        ext: '.gz', // 输出后缀名
        threshold: 10240, // 超过 10kb 才压缩
        deleteOriginFile: false, // 是否删除源文件
        filter: /\.(js|css|html)$/i, // 可以手动指定哪些类型的文件需要压缩
      }),
      visualizer({ // 代码分析
        filename: 'report/report.html',  // 输出报告文件路径
        open: true,                   // 构建后自动打开浏览器查看
        gzipSize: true,               // 显示 gzip 大小
        brotliSize: true              // 显示 brotli 大小
      })
    ],
    resolve: {
      alias: {  
        '@': path.resolve(__dirname, 'src'),
      },
    }, 
    server:{
      host: "0.0.0.0", // 192.168.30.185
      port: 5173,
      https: false, // 是否开启 https
      // 服务器代理配置
      // proxy: {
      //   // 如果请求的路径符合该正则表达式，则会被代理到 target 中
      //   // 例如请求 /api/user 会被代理到 http://localhost:8888/api/user
      //   '^/api': {
      //     target: 'http://localhost:5555',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
      hmr: true, // 是否开启自动刷新
      open: true, // 是否开启自动打开浏览器
    },
    build: {
      outDir: 'dist', // 输出目录
      assetsDir: 'assets', // 静态资源目录
      sourcemap: false, // 默认不开启 source map，避免泄露源码
      minify: 'esbuild', // 或使用 'terser'，但 esbuild 更快
      // terserOptions: {
      //   compress: {
      //     drop_console: true, // 打包时移除 console
      //     drop_debugger: true,
      //   },
      // },
      brotliSize: false, // 禁止计算 brotli 大小，加快构建
      cssCodeSplit: true, // 分离 CSS
      emptyOutDir: true, // 每次构建前清空输出目录
      rollupOptions: {
        // 1.SPA:不加任何配置
        // 不写任何代码，走默认的src/index.html
        // 2.MPA：增加入口页面
        input: {
          index: path.resolve(__dirname, 'index.html'), // 多页应用。这才是真正的类似于分包的效果 http://localhost:5173   ----自动跳转--->   http://localhost:5173/#/home/index
          // page1: path.resolve(__dirname, 'page1.html'), // 多页应用。这才是真正的类似于分包的效果 http://localhost:5173/page1   ----自动跳转--->   http://localhost:5173/page1#/home/abc
          // page2: path.resolve(__dirname, 'page2.html'), // 多页应用。这才是真正的类似于分包的效果 http://localhost:5173/page2   ----自动跳转--->   http://localhost:5173/page2#/home/index
        },
        output: {
          manualChunks(id) {
            // 拆包策略：将 node_modules 单独打成一个包
            if(id.includes('node_modules')) {
              if(id.includes('echarts')) return 'echarts'
              if(id.includes('three')) return 'three'
              if(id.includes('element')) return 'element'
              return 'vendor'
            }
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
              return 'assets/images/[name]-[hash][extname]'
            }
            if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          },
        },
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify('V1.0.0'), // 可以直接在代码中使用 console.log(__APP_VERSION__)
      __BUILD_TIME__: JSON.stringify(dateFormat('YYYY-MM-DD hh:mm:ss', new Date())) // 可以直接在代码中使用 console.log(__BUILD_TIME__)
    },
  }
})