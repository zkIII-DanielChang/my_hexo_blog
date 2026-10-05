/**
 * 为 hexo-renderer-marked 启用 GFM 脚注（`[^1]` 语法）。
 *
 * 关键：不能直接在脚本里调 marked.use()。
 * hexo-renderer-marked 在每次渲染前都会重置 marked：
 *
 *     marked.defaults.extensions = null;
 *     marked.defaults.tokenizer  = null;
 *     ...
 *     this.execFilterSync('marked:use', marked.use, ...)   // ← 重置之后才触发
 *
 * 所以直接用 marked.use() 注册的扩展会在下一次渲染前被清空，
 * 必须挂在 `marked:use` 钩子上，在每次渲染时重新注册。
 * 参见 node_modules/hexo-renderer-marked/lib/renderer.js:228-235
 *
 * 依赖：marked-footnote（见 package.json）
 */
'use strict'

const markedFootnote = require('marked-footnote')

hexo.extend.filter.register('marked:use', function (use) {
  use(markedFootnote())
})
