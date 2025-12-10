import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import { visualizer } from 'rollup-plugin-visualizer' // 分析
import vueDevTools from 'vite-plugin-vue-devtools'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { group } from 'console'
// 情景配置
// 1. 拆包
// 2. hash
// 3. 代码拆分
// 4. treeShaking
// 5. gzip
// 6. 资源压缩
// 7.
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    createHtmlPlugin({}),
    // 压缩图片画质
    ViteImageOptimizer({
      png: {
        quality: 40,
      },
    }),
  ],
  // 静态资源处理，vite 会将一些图片、字体和 css 样式自动转化为资源的形式，也可以往下面添加
  assetsInclude: ['**/*.gltf'],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
    // 默认就是 4kb
    assetsInlineLimit: 4096,
    manifest: true,
    minify: 'esbuild',
    // 是否启用 gzip 压缩
    // 从表象上看，gzip 压缩了 html、json、css、js
    // 实际上，在项目中，gzip 还压缩了字体文件、xml
    // 一般 png、二进制文件、pdf、音视频不用于 gzip 压缩（非文本类的不压缩)【因为这些本身已经进行过压缩处理/ tiny、fontmin、 convert等压缩方式】
    // 底层原因是 gzip 本身的算法是基于字典模式和哈夫曼编码去做的，是对于重复的文本进行压缩
    reportCompressedSize: true,
    // 自定义分割 chunk
    rolldownOptions: {
      usedExports: true,
      output: {
        advancedChunks: {
          group: [
            {
              test: /node_modules/,
              name: 'vue',
            },
          ],
        },
      },
    },
  },
  // 去掉 console.log/ debugger等
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
