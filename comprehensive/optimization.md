# 前端性能优化

首先利用 chrome 的 performance、lighthouse 进行分析，查看瓶颈点，主要分为 2 种情况，比如网络请求缓慢，js 代码执行缓慢。如果网络请求缓慢就考虑缓存，压缩，cdn 来解决问题，如果是 js 执行缓慢，就考虑优化代码写法，比较常见的就是两个 for 循环导致加载时间长，可以考虑用 Map, Set，对查找进行优化，或者是 debounce，throttle 之类的。

- 缓存（200, 304）
- 图片懒加载(见 js 篇中的`async.md`)
- 使用 cdn(实现原理见 http 篇的`optionReq.md`)
- react，vue 等框架使用 SSR（server side rendering）
- 使用代码压缩（webpack）
- 使用资源压缩（Gzip，小图标的雪碧图）
- 减少网络请求量（雪碧图；base64，svg，用字符串代替图片，减少网络请求）
- css 放在页面最上面，script 加载 js 放在页面最下面（因为 js 加载的时候会阻塞页面加载，css 如果不放在最上面可能会导致页面无样式文本闪烁）
- 减少 cookie 的传输量
- 减少 DOM 的操作，使用`createDocumentFragment`以及`requestAnimationFrame`
