import { defineConfig } from 'astro/config';

export default defineConfig({
  // 用户站点（仓库名 = lllygkj33-creator.github.io），站点在根路径，不需要 base
  site: 'https://lllygkj33-creator.github.io',
  markdown: {
    // 和参考站一样：浅色模式浅色代码块，深色模式深色代码块
    shikiConfig: { themes: { light: 'github-light-default', dark: 'github-dark' } },
  },
});
