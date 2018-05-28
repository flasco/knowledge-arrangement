# 前端性能优化
* 缓存（200, 304）
* 图片懒加载(见js篇中的`async.md`)
* 使用cdn(实现原理见http篇的`optionReq.md`)
* react，vue等框架使用SSR（server side rendering）
* 使用代码压缩（webpack）
* 使用资源压缩（Gzip，小图标的雪碧图）
* 减少网络请求量（雪碧图；base64，svg，用字符串代替图片，减少网络请求）
* css放在页面最上面，script加载js放在页面最下面（因为js加载的时候会阻塞页面加载，css如果不放在最上面可能会导致页面无样式文本闪烁）
* 减少cookie的传输量
* 减少DOM的操作，使用`createDocumentFragment`以及`requestAnimationFrame`